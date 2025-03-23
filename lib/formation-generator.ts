import { Hero, HeroClass } from "@/lib/heroes";

export interface FormationWithRatio {
    heroes: Hero[];
    troopRatio: number[];
}

export function generateFormations(heroes: Hero[], mainRallyFormation?: FormationWithRatio): FormationWithRatio[] {

    const remainingHeroes: Hero[] = heroes

    const rally = mainRallyFormation ?? getBestRallyHeroes(remainingHeroes)

    rally.heroes.forEach(hero => remainingHeroes.splice(remainingHeroes.indexOf(hero), 1))

    const normalFormations: FormationWithRatio[] = []

    const leaderHeroes = remainingHeroes.filter(hero => hero.isLeader)
        .sort((heroA, heroB) => {
            // First sort by whether stars requirement is met
            const heroAMeetsStars = !heroA.stars || !heroA.leaderRequiredStars || heroA.stars >= heroA.leaderRequiredStars;
            const heroBMeetsStars = !heroB.stars || !heroB.leaderRequiredStars || heroB.stars >= heroB.leaderRequiredStars;

            if (heroAMeetsStars && !heroBMeetsStars) return -1;
            if (!heroAMeetsStars && heroBMeetsStars) return 1;

            // Then sort by rallyHeroRank
            return heroA.leaderRank! - heroB.leaderRank!;
        })

    // create n formations (6)
    leaderHeroes.slice(0, 6).forEach((hero, i) => {
        normalFormations.push({ heroes: [], troopRatio: [5, 5, 90] })
        normalFormations[i].heroes.push(hero)
    });

    if (leaderHeroes.length < 5) {
        remainingHeroes.filter(hero => !hero.isLeader).sort((heroA, heroB) => {
            // First compare by generation
            if (heroA.gen !== heroB.gen) {
                return heroA.gen - heroB.gen; // Sort by generation (ascending)
            }

            // If generations are equal, compare by stars
            // Handle undefined stars cases
            if (heroA.stars !== undefined && heroB.stars !== undefined) {
                // Both have stars defined, compare normally
                return heroB.stars - heroA.stars; // Sort by stars (descending)
            } else if (heroA.stars !== undefined) {
                // Only heroA has stars defined, it should come first
                return -1;
            } else if (heroB.stars !== undefined) {
                // Only heroB has stars defined, it should come first
                return 1;
            }
            // If neither has stars defined or stars are equal, compare by rank
            return heroA.rank - heroB.rank; // Sort by rank (ascending)
        }).forEach((hero, i) => {
            if (leaderHeroes.length + i < 5) {
                normalFormations.push({ heroes: [], troopRatio: [5, 5, 90] })
                normalFormations[leaderHeroes.length + i].heroes.push(hero)
            }
        })
    }

    normalFormations.forEach(formation => remainingHeroes.splice(remainingHeroes.indexOf(formation.heroes[0]), 1))

    normalFormations.forEach((heroes, i) => {
        remainingHeroes.sort((heroA, heroB) => heroA.rank - heroB.rank).forEach(hero => {
            if (normalFormations[i].heroes.length < 3 && !normalFormations[i].heroes.some(formationHero => formationHero.class === hero.class)) {
                normalFormations[i].heroes.push(hero)
            }
        });
        normalFormations[i].heroes.slice(1).forEach(hero => remainingHeroes.splice(remainingHeroes.indexOf(hero), 1))
    })

    return [rally, ...normalFormations]
}

export function getBestRallyHeroes(remainingHeroes: Hero[]): FormationWithRatio {
    const rallyFormation: Hero[] = []

    // const bestInfantryHero = getBestInfantryRallyHero(remainingHeroes)
    // if (bestInfantryHero) {
    //     rallyFormation.push(bestInfantryHero)
    //     remainingHeroes.splice(remainingHeroes.indexOf(bestInfantryHero), 1)
    // }
    // if (!bestInfantryHero) {
        const infantryLeaderHero = remainingHeroes.sort((heroA, heroB) => (heroA.rallyHeroRank || 0) - (heroB.rallyHeroRank || 0)).find(hero => hero.isRallyHero && hero.class == HeroClass.INFANTRY)
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
        const lancerLeaderHero = remainingHeroes.sort((heroA, heroB) => (heroA.rallyHeroRank || 0) - (heroB.rallyHeroRank || 0)).find(hero => hero.isRallyHero && hero.class == HeroClass.LANCER)
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
        const marksmenLeaderHero = remainingHeroes.sort((heroA, heroB) => (heroA.rallyHeroRank || 0) - (heroB.rallyHeroRank || 0)).find(hero => hero.isRallyHero && hero.class == HeroClass.MARKSMEN)
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

    return { heroes: rallyFormation, troopRatio: [5, 5, 90] }
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