import { Hero, HeroClass } from "@/lib/heroes";

export interface FormationWithRatio {
    heroes: Hero[];
    troopRatio: number[];
    /** Optional absolute troop counts (Inf/Lan/Mark) derived from a per-march troop budget. */
    troopCounts?: number[];
}

export type TroopPresetMode = "auto" | "low" | "mid" | "high" | "extreme";

export interface TroopPresetSettings {
    /**
     * - auto: pick a preset based on troopsPerMarch
     * - low/mid/high/extreme: force a preset
     */
    mode: TroopPresetMode;
    /** Rough troop budget available per march (used to compute counts + auto thresholds). */
    troopsPerMarch: number;
    /** Enforce minimum counts for Infantry/Lancer and give the rest to Marksman. */
    enforceMinimums?: boolean;
    /** Minimum Infantry per march when enforceMinimums=true. */
    minInfantry?: number;
    /** Minimum Lancer per march when enforceMinimums=true. */
    minLancer?: number;
}

/**
 * Bear Hunt/Bear Trap basics used by the generator.
 * - Joiner buff: only the lead hero's 1st expedition skill matters for the rally buff.
 * - The game can "overwrite" an earlier joiner's buff if a later joiner has a higher
 *   level for that specific skill (typically tied to stars).
 */
const getJoinerSkillLevelFromStars = (stars?: number) => {
    // Based on community reverse-engineering: 0★ => lvl1, 1★ => lvl2, 2★ => lvl3, 3★ => lvl4, 4★/5★ => lvl5
    const s = stars ?? 0;
    return Math.min(5, Math.max(1, s + 1));
};

/**
 * Community-accepted Bear joiner lead heroes (top-right expedition skill) priority.
 * Source alignment: Out of Games guide + community discussions.
 */
const BEAR_JOINER_LEAD_PRIORITY: Record<string, number> = {
    // S tier (highest impact)
    "Jessie": 100,
    "Jasser": 100,
    "Seo-yoon": 95,
    "Jeronimo": 95,
    "Reina": 90,
    // Gwen is contentious (doesn't stack with leader / multiple Gwens). Keep but slightly lower.
    "Gwen": 80,
    "Bradley": 90,
    "Magnus": 90,
    "Blanchette": 90,
    "Rufus": 90,
    "Hervor": 90,

    // A tier (good but lower %)
    "Sonya": 70,
    "Dominic": 70
};

const compareByGenStarsWeaponAndRank = (heroA: Hero, heroB: Hero) => {
    // Higher generation first
    if (heroA.gen !== heroB.gen) return heroB.gen - heroA.gen;

    const aStars = heroA.stars ?? 0;
    const bStars = heroB.stars ?? 0;
    if (aStars !== bStars) return bStars - aStars;

    const aEW = heroA.exclusiveWeaponLevel ?? 0;
    const bEW = heroB.exclusiveWeaponLevel ?? 0;
    if (aEW !== bEW) return bEW - aEW;

    return heroA.rank - heroB.rank;
};

const compareByGenAndStarsAndRank = compareByGenStarsWeaponAndRank;

const clampNonNegInt = (n: number) => Math.max(0, Math.floor(Number.isFinite(n) ? n : 0));

const resolvePresetMode = (settings?: TroopPresetSettings): Exclude<TroopPresetMode, "auto"> => {
    const mode = settings?.mode ?? "auto";
    if (mode !== "auto") return mode;

    const troops = clampNonNegInt(settings?.troopsPerMarch ?? 0);
    // Auto thresholds (per-march troop budget). These are intentionally broad.
    // - low: early/small marches -> more balanced so you don't end up with tiny Inf/Lan groups
    // - mid: default stable (10/10/80)
    // - high: stronger marksman tilt (5/5/90 for top joiners)
    // - extreme: marksman-heavy default (5/5/90) for very large marches
    if (troops > 0 && troops < 60000) return "low";
    if (troops > 0 && troops < 150000) return "mid";
    if (troops > 0 && troops < 300000) return "high";
    return "extreme";
};

const getBaseRatioForMode = (
    kind: "rally" | "joiner",
    joinerIndex: number,
    mode: Exclude<TroopPresetMode, "auto">
): number[] => {
    if (kind === "rally") {
        switch (mode) {
            case "low": return [20, 20, 60];
            case "mid": return [10, 10, 80];
            case "high": return [10, 10, 80];
            // "extreme" is intentionally conservative: marksman-heavy but avoids ultra-low infantry,
            // which can be inconsistent for some march sizes.
            case "extreme": return [5, 5, 90];
        }
    }

    // joiners
    switch (mode) {
        case "low":
            return [20, 20, 60];
        case "mid":
            return [10, 10, 80];
        case "high":
            return joinerIndex < 3 ? [5, 5, 90] : [10, 10, 80];
        case "extreme":
            // Keep joiners marksman-heavy but avoid ultra-low infantry.
            return [5, 5, 90];
    }
};

const ratioToCounts = (ratio: number[], troopsPerMarch: number): number[] => {
    const t = clampNonNegInt(troopsPerMarch);
    if (t <= 0) return [0, 0, 0];

    const inf = Math.round((ratio[0] / 100) * t);
    const lan = Math.round((ratio[1] / 100) * t);
    let mark = t - inf - lan;
    if (mark < 0) mark = 0;
    return [inf, lan, mark];
};

const applyMinimumFloors = (counts: number[], troopsPerMarch: number, settings?: TroopPresetSettings): number[] => {
    const t = clampNonNegInt(troopsPerMarch);
    if (t <= 0) return [0, 0, 0];
    if (!settings?.enforceMinimums) return counts;

    let minInf = clampNonNegInt(settings?.minInfantry ?? 0);
    let minLan = clampNonNegInt(settings?.minLancer ?? 0);

    if (minInf + minLan > t) {
        // Scale down proportionally if the minimums exceed the troop budget.
        const factor = t / (minInf + minLan);
        minInf = Math.floor(minInf * factor);
        minLan = Math.floor(minLan * factor);
    }

    let inf = Math.max(counts[0], minInf);
    let lan = Math.max(counts[1], minLan);
    let mark = t - inf - lan;

    if (mark < 0) {
        // Reduce inf/lan proportionally to fit.
        const overflow = -mark;
        const total = inf + lan;
        if (total > 0) {
            const reduceInf = Math.round((inf / total) * overflow);
            const reduceLan = overflow - reduceInf;
            inf = Math.max(0, inf - reduceInf);
            lan = Math.max(0, lan - reduceLan);
        } else {
            inf = 0;
            lan = 0;
        }
        mark = t - inf - lan;
    }

    return [inf, lan, mark];
};

const countsToRatio = (counts: number[], troopsPerMarch: number): number[] => {
    const t = clampNonNegInt(troopsPerMarch);
    if (t <= 0) return [0, 0, 0];
    const inf = Math.floor((counts[0] / t) * 100);
    const lan = Math.floor((counts[1] / t) * 100);
    const mark = Math.max(0, 100 - inf - lan);
    return [inf, lan, mark];
};

const getTroopPlan = (
    kind: "rally" | "joiner",
    joinerIndex: number,
    settings?: TroopPresetSettings
): { ratio: number[]; counts?: number[]; resolvedMode: Exclude<TroopPresetMode, "auto"> } => {
    const resolvedMode = resolvePresetMode(settings);
    const baseRatio = getBaseRatioForMode(kind, joinerIndex, resolvedMode);

    const troops = clampNonNegInt(settings?.troopsPerMarch ?? 0);
    if (troops <= 0) {
        return { ratio: baseRatio, resolvedMode };
    }

    const baseCounts = ratioToCounts(baseRatio, troops);
    const counts = applyMinimumFloors(baseCounts, troops, settings);
    const ratio = countsToRatio(counts, troops);
    return { ratio, counts, resolvedMode };
};

const isBearJoinerLeadHero = (hero: Hero, rallyFormation?: FormationWithRatio) => {
    if (!BEAR_JOINER_LEAD_PRIORITY[hero.name]) return false;
    // Avoid assigning Gwen as joiner lead if rally leader already has Gwen (stacking is debated).
    if (hero.name === "Gwen" && rallyFormation?.heroes?.some(h => h.name === "Gwen")) return false;
    return true;
};

const getBearJoinerLeadScore = (hero: Hero) => {
    const base = BEAR_JOINER_LEAD_PRIORITY[hero.name] ?? 0;
    const skillLvl = getJoinerSkillLevelFromStars(hero.stars);
    const ew = hero.exclusiveWeaponLevel ?? 0;
    // Prioritize correct hero type, then skill level (stars), then EW as tie-breaker.
    return base * 100 + skillLvl * 10 + ew;
};

export function generateFormations(
    heroes: Hero[],
    mainRallyFormation?: FormationWithRatio,
    troopSettings?: TroopPresetSettings
): FormationWithRatio[] {

    const remainingHeroes: Hero[] = heroes

    const rally = mainRallyFormation ?? getBestRallyHeroes(remainingHeroes, troopSettings)

    // If caller provided a rally formation, we still want to attach troop info
    // according to the current troop settings.
    if (mainRallyFormation) {
        const plan = getTroopPlan("rally", 0, troopSettings);
        rally.troopRatio = plan.ratio;
        rally.troopCounts = plan.counts;
    }

    rally.heroes.forEach(hero => remainingHeroes.splice(remainingHeroes.indexOf(hero), 1))

    const normalFormations: FormationWithRatio[] = []

    // --- Bear joiner formations ---
    // Pick lead heroes from the known "good" joiner list first (Jessie/Jasser/...
    // from community guides). If we don't have enough, fill the remaining leads with
    // "safe" low-skill heroes so they are easier to overwrite.

    const preferredJoinerLeads = remainingHeroes
        .filter(hero => isBearJoinerLeadHero(hero, rally))
        .sort((a, b) => getBearJoinerLeadScore(b) - getBearJoinerLeadScore(a));

    const joinerLeads: Hero[] = preferredJoinerLeads.slice(0, 6);

    if (joinerLeads.length < 6) {
        const needed = 6 - joinerLeads.length;
        const safeFillers = remainingHeroes
            .filter(h => !joinerLeads.some(x => x.name === h.name) && !BEAR_JOINER_LEAD_PRIORITY[h.name])
            .sort((a, b) => {
                // Prefer low joiner-skill heroes first (easier to overwrite), then by overall power.
                const aLvl = getJoinerSkillLevelFromStars(a.stars);
                const bLvl = getJoinerSkillLevelFromStars(b.stars);
                if (aLvl !== bLvl) return aLvl - bLvl;
                return compareByGenStarsWeaponAndRank(a, b);
            })
            .slice(0, needed);
        joinerLeads.push(...safeFillers);
    }

    joinerLeads.slice(0, 6).forEach((hero, idx) => {
        const plan = getTroopPlan("joiner", idx, troopSettings);
        normalFormations.push({
            heroes: [hero],
            troopRatio: plan.ratio,
            troopCounts: plan.counts
        });
    });

    normalFormations.forEach(formation => remainingHeroes.splice(remainingHeroes.indexOf(formation.heroes[0]), 1))

    remainingHeroes.sort(compareByGenAndStarsAndRank)

    normalFormations.forEach((heroes, i) => {
        remainingHeroes.forEach(hero => {
            if (normalFormations[i].heroes.length < 3 && !normalFormations[i].heroes.some(formationHero => formationHero.class === hero.class)) {
                normalFormations[i].heroes.push(hero)
            }
        });
        normalFormations[i].heroes.slice(1).forEach(hero => remainingHeroes.splice(remainingHeroes.indexOf(hero), 1))
    })

    return [rally, ...normalFormations]
}

export function getBestRallyHeroes(remainingHeroes: Hero[], troopSettings?: TroopPresetSettings): FormationWithRatio {
    const rallyFormation: Hero[] = []

    const pickBestForClass = (cls: HeroClass): Hero | undefined => {
        const candidates = remainingHeroes.filter(h => h.class === cls);
        if (candidates.length === 0) return undefined;
        return candidates.sort((a, b) => {
            // Prefer explicitly tagged rally heroes
            const aIs = a.isRallyHero ? 1 : 0;
            const bIs = b.isRallyHero ? 1 : 0;
            if (aIs !== bIs) return bIs - aIs;

            // Prefer those who meet required stars (if provided)
            const aMeets = !a.rallyHeroRequiredStars || (a.stars ?? 0) >= a.rallyHeroRequiredStars ? 1 : 0;
            const bMeets = !b.rallyHeroRequiredStars || (b.stars ?? 0) >= b.rallyHeroRequiredStars ? 1 : 0;
            if (aMeets !== bMeets) return bMeets - aMeets;

            // Prefer lower (better) rank numbers if present
            const aRank = a.rallyHeroRank ?? a.rank;
            const bRank = b.rallyHeroRank ?? b.rank;
            if (aRank !== bRank) return aRank - bRank;

            // Then by overall power indicators
            return compareByGenStarsWeaponAndRank(a, b);
        })[0];
    };

    // const bestInfantryHero = getBestInfantryRallyHero(remainingHeroes)
    // if (bestInfantryHero) {
    //     rallyFormation.push(bestInfantryHero)
    //     remainingHeroes.splice(remainingHeroes.indexOf(bestInfantryHero), 1)
    // }
    // if (!bestInfantryHero) {
        const infantryLeaderHero = pickBestForClass(HeroClass.INFANTRY)
        if (infantryLeaderHero) {
            rallyFormation.push(infantryLeaderHero)
            remainingHeroes.splice(remainingHeroes.indexOf(infantryLeaderHero), 1)
        }
    // }

    // const bestLancerHero = getBestLancerRallyHero(remainingHeroes)
    // if (bestLancerHero) {
    //     rallyFormation.push(bestLancerHero)
    //     remainingHeroes.splice(remainingHeroes.indexOf(bestLancerHero), 1)
    // }
    // if (!bestLancerHero) {
        const lancerLeaderHero = pickBestForClass(HeroClass.LANCER)
        if (lancerLeaderHero) {
            rallyFormation.push(lancerLeaderHero)
            remainingHeroes.splice(remainingHeroes.indexOf(lancerLeaderHero), 1)
        }
    // }

    // const bestMarksmenHero = getBestMarksmenRallyHero(remainingHeroes)
    // if (bestMarksmenHero) {
    //     rallyFormation.push(bestMarksmenHero)
    //     remainingHeroes.splice(remainingHeroes.indexOf(bestMarksmenHero), 1)
    // }
    // if (!bestMarksmenHero) {
        const marksmenLeaderHero = pickBestForClass(HeroClass.MARKSMEN)
        if (marksmenLeaderHero) {
            rallyFormation.push(marksmenLeaderHero)
            remainingHeroes.splice(remainingHeroes.indexOf(marksmenLeaderHero), 1)
        }
    // }


    // fill up with leader heroes
    remainingHeroes.filter(hero => hero.isRallyHero).sort((heroA, heroB) => {
        // First sort by whether stars requirement is met
        const heroAMeetsStars = !heroA.stars || !heroA.rallyHeroRequiredStars || heroA.stars >= heroA.rallyHeroRequiredStars;
        const heroBMeetsStars = !heroB.stars || !heroB.rallyHeroRequiredStars || heroB.stars >= heroB.rallyHeroRequiredStars;

        if (heroAMeetsStars && !heroBMeetsStars) return -1;
        if (!heroAMeetsStars && heroBMeetsStars) return 1;

        // Then sort by rallyHeroRank
        return heroA.rallyHeroRank! - heroB.rallyHeroRank!;
    }).forEach(hero => {
        if (rallyFormation.length < 3 && !rallyFormation.some(rallyHero => rallyHero.class === hero.class)) {
            rallyFormation.push(hero)
        }
    });

    // fill up with normal heroes
    if (rallyFormation.length != 3) {
        remainingHeroes.filter(hero => !hero.isLeader).sort((heroA, heroB) => heroA.rank - heroB.rank).forEach(hero => {
            if (rallyFormation.length < 3 && !rallyFormation.some(rallyHero => rallyHero.class === hero.class)) {
                rallyFormation.push(hero)
            }
        })
    }

    const plan = getTroopPlan("rally", 0, troopSettings);
    return { heroes: rallyFormation, troopRatio: plan.ratio, troopCounts: plan.counts }
}

// const getBestInfantryRallyHero = (heroes: Hero[]) => {
//     const jeronimo = findByName("Jeronimo", heroes)
//     const hector = findByName("Hector", heroes)
//     if (!jeronimo && hector) return hector
//     if (jeronimo && !hector) return jeronimo
//     if (!(jeronimo && hector)) {
//         return undefined // TODO: best other hero
//     }
//     if (!jeronimo.stars && hector.stars) return hector
//     if (jeronimo.stars && !hector.stars) return jeronimo
//     if (!(jeronimo.stars && hector.stars)) {
//         return undefined // TODO: best other hero
//     }
//     if (jeronimo.stars > 3) {
//         return jeronimo
//     }
//     if (hector.stars && hector.stars === 5) {
//         return hector
//     }
//     if (jeronimo.stars + 2 < (hector.stars || 0)) {
//         return hector
//     }
//     return jeronimo
// }
//
// const getBestLancerRallyHero = (heroes: Hero[]) => {
//     const sonya = findByName("Sonya", heroes)
//     const mia = findByName("Mia", heroes)
//     if (!sonya && mia) return mia
//     if (sonya && !mia) return sonya
//     if (!(sonya && mia)) {
//         return undefined // TODO: best other hero
//     }
//     if (!sonya.stars && mia.stars) return mia
//     if (sonya.stars && !mia.stars) return sonya
//     if (!(sonya.stars && mia.stars)) {
//         return undefined // TODO: best other hero
//     }
//     if (sonya.stars > 3) {
//         return sonya
//     }
//     if (mia.stars && mia.stars === 5) {
//         return mia
//     }
//     if (sonya.stars + 2 < (mia.stars || 0)) {
//         return mia
//     }
//     return sonya
// }
//
// const getBestMarksmenRallyHero = (heroes: Hero[]) => {
//     heroes
//     return undefined
// }