export enum HeroRarity {
    RARE,
    EPIC,
    LEGENDARY
}

export enum HeroClass {
    INFANTRY,
    LANCER,
    MARKSMEN
}

export type Hero = {
    name: string
    class: HeroClass
    isRallyHero?: boolean
    rallyHeroRank?: number,
    rallyHeroRequiredStars?: number
    isLeader?: boolean
    leaderRank?: number
    rank: number
    gen: number
    rarity: HeroRarity,
    stars?: number,
    isBestRallyHero?: (remainingHeroes: Hero[]) => boolean
}

export const HEROES: Hero[] = [
    {
        name: "Smith",
        class: HeroClass.INFANTRY,
        rank: 100,
        gen: 0,
        rarity: HeroRarity.RARE
    },
    {
        name: "Eugene",
        class: HeroClass.INFANTRY,
        rank: 100,
        gen: 0,
        rarity: HeroRarity.RARE
    },
    {
        name: "Charlie",
        class: HeroClass.LANCER,
        rank: 100,
        gen: 0,
        rarity: HeroRarity.RARE
    },
    {
        name: "Cloris",
        class: HeroClass.MARKSMEN,
        rank: 100,
        gen: 0,
        rarity: HeroRarity.RARE
    },





    {
        name: "Sergey",
        class: HeroClass.INFANTRY,
        isRallyHero: true,
        rallyHeroRank: 4,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Jessie",
        class: HeroClass.LANCER,
        isLeader: true,
        leaderRank: 1,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Patrick",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Walis Bokan",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Ling Shuang",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Gina",
        class: HeroClass.MARKSMEN,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Bahiti",
        class: HeroClass.MARKSMEN,
        isRallyHero: true,
        rallyHeroRank: 6,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Jasser",
        class: HeroClass.MARKSMEN,
        isLeader: true,
        leaderRank: 1,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },
    {
        name: "Seo-yoon",
        class: HeroClass.MARKSMEN,
        isLeader: true,
        leaderRank: 1,
        rank: 10,
        gen: 0,
        rarity: HeroRarity.EPIC
    },





    {
        name: "Natalia",
        class: HeroClass.INFANTRY,
        isRallyHero: true,
        rallyHeroRank: 3,
        rank: 10,
        gen: 1,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Jeronimo",
        class: HeroClass.INFANTRY,
        isRallyHero: true,
        rallyHeroRank: 1,
        rallyHeroRequiredStars: 4,
        isLeader: true,
        leaderRank: 1,
        rank: 10,
        gen: 1,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Molly",
        class: HeroClass.LANCER,
        isRallyHero: true,
        rallyHeroRank: 4,
        rank: 10,
        gen: 1,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Zinman",
        class: HeroClass.MARKSMEN,
        rank: 10,
        gen: 1,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Flint",
        class: HeroClass.INFANTRY,
        isRallyHero: true,
        rallyHeroRank: 5,
        rank: 10,
        gen: 2,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Philly",
        class: HeroClass.LANCER,
        isRallyHero: true,
        rallyHeroRank: 3,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 2,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Alonso",
        class: HeroClass.MARKSMEN,
        isRallyHero: true,
        rallyHeroRank: 5,
        rank: 10,
        gen: 2,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Logan",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 3,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Mia",
        class: HeroClass.LANCER,
        isRallyHero: true,
        rallyHeroRank: 1,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 3,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Greg",
        class: HeroClass.MARKSMEN,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 3,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Ahmose",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 4,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Reina",
        class: HeroClass.LANCER,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 4,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Lynn",
        class: HeroClass.MARKSMEN,
        isRallyHero: true,
        rallyHeroRank: 4,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 4,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Hector",
        class: HeroClass.INFANTRY,
        isRallyHero: true,
        rallyHeroRank: 2,
        rank: 10,
        gen: 5,
        rarity: HeroRarity.LEGENDARY,
        isBestRallyHero(remainingHeroes) {
            const jeronimo = remainingHeroes.find((hero) => hero.name === "Jeronimo")
            if (!jeronimo || !jeronimo.stars) return true
            if (jeronimo.stars > 3) {
                return false
            }
            if (this.stars && this.stars === 5) {
                return true
            }
            if (jeronimo.stars + 2 < (this.stars || 0)) {
                return true
            }
            return false
        },
    },
    {
        name: "Norah",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 5,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Gwen",
        class: HeroClass.MARKSMEN,
        isRallyHero: true,
        rallyHeroRank: 3,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 5,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Wu Ming",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 6,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Renee",
        class: HeroClass.LANCER,
        isRallyHero: true,
        rallyHeroRank: 3,
        rank: 10,
        gen: 6,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Wayne",
        class: HeroClass.MARKSMEN,
        isLeader: true,
        leaderRank: 2,
        rank: 10,
        gen: 6,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Edith",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 7,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Gordon",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 7,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Bradley",
        class: HeroClass.MARKSMEN,
        isRallyHero: true,
        rallyHeroRank: 1,
        isLeader: true,
        leaderRank: 1,
        rank: 10,
        gen: 7,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Gatot",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 8,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Sonya",
        class: HeroClass.LANCER,
        isRallyHero: true,
        rallyHeroRank: 2,
        rank: 10,
        gen: 8,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Hendrik",
        class: HeroClass.MARKSMEN,
        rank: 20,
        gen: 8,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Magnus",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 9,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Fred",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 9,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Xura",
        class: HeroClass.MARKSMEN,
        rank: 10,
        gen: 9,
        rarity: HeroRarity.LEGENDARY
    },
]

export const getClassImage = (heroClass: HeroClass): string => {
    switch (heroClass) {
        case HeroClass.INFANTRY:
            return "/images/heroes/classes/infantry.png"
        case HeroClass.LANCER:
            return "/images/heroes/classes/lancer.png"
        case HeroClass.MARKSMEN:
            return "/images/heroes/classes/marksman.png"
    }
}

export const getHeroImage = (heroName: string): string => {
    const cleanedName = heroName.toLowerCase().replaceAll(" ", "-")
    return `/images/heroes/${cleanedName}.png`
}

const findByName = (name: string, heroes: Hero[]): Hero | undefined => {
    return heroes.find(hero => hero.name === name)
}

type GroupKey = string | number | symbol;

export function customGroupBy<T, K extends GroupKey>(array: T[], keyFn: (item: T) => K): Record<K, T[]> {
    return array.reduce((result: Record<K, T[]>, item: T) => {
        const key = keyFn(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {} as Record<K, T[]>);
}

export function generateFormations(heroes: Hero[], mainRallyHeroes?: Hero[]): Hero[][] {

    const remainingHeroes: Hero[] = heroes

    const rally = mainRallyHeroes ?? getBestRallyHeroes(remainingHeroes)

    rally.forEach(hero => remainingHeroes.splice(remainingHeroes.indexOf(hero), 1))

    const normalFormations: Hero[][] = []

    const leaderHeroes = remainingHeroes.filter(hero => hero.isLeader).sort((heroA, heroB) => heroA.leaderRank! - heroB.leaderRank!)

    // create n formations (6)
    leaderHeroes.slice(0, 6).forEach((hero, i) => {
        normalFormations.push([])
        normalFormations[i].push(hero)
    });

    if (leaderHeroes.length < 5) {
        remainingHeroes.filter(hero => !hero.isLeader).sort((heroA, heroB) => heroA.rank - heroB.rank).forEach((hero, i) => {
            if (leaderHeroes.length + i < 5) {
                normalFormations.push([])
                normalFormations[leaderHeroes.length + i].push(hero)
            }
        })
    }

    normalFormations.forEach(heroes => remainingHeroes.splice(remainingHeroes.indexOf(heroes[0]), 1))

    normalFormations.forEach((heroes, i) => {
        remainingHeroes.sort((heroA, heroB) => heroA.rank - heroB.rank).forEach(hero => {
            if (normalFormations[i].length < 3 && !normalFormations[i].some(formationHero => formationHero.class === hero.class)) {
                normalFormations[i].push(hero)
            }
        });
        normalFormations[i].slice(1).forEach(hero => remainingHeroes.splice(remainingHeroes.indexOf(hero), 1))
    })


    // Optional: Sort by class
    // const classOrder: HeroClass[] = [HeroClass.INFANTRY, HeroClass.LANCER, HeroClass.MARKSMEN];
    return [rally, ...normalFormations]/*.map(formation =>
        formation.sort((a, b) => {
            const indexA = classOrder.indexOf(a.class);
            const indexB = classOrder.indexOf(b.class);
            return indexA - indexB;
        })
    )*/
}

export function getBestRallyHeroes(remainingHeroes: Hero[]) {
    const rallyFormation: Hero[] = []

    const bestInfantryHero = getBestInfantryRallyHero(remainingHeroes)
    if (bestInfantryHero) {
        rallyFormation.push(bestInfantryHero)
        remainingHeroes.splice(remainingHeroes.indexOf(bestInfantryHero), 1)
    }
    if (!bestInfantryHero) {
        const infantryLeaderHero = remainingHeroes.sort((heroA, heroB) => heroA.leaderRank! - heroB.leaderRank!).find(hero => hero.isLeader && hero.class == HeroClass.INFANTRY)
        if (infantryLeaderHero) {
            rallyFormation.push(infantryLeaderHero)
            remainingHeroes.splice(remainingHeroes.indexOf(infantryLeaderHero), 1)
        }
    }



    // fill up with leader heroes
    remainingHeroes.filter(hero => hero.isRallyHero).sort((heroA, heroB) => heroA.rallyHeroRank! - heroB.rallyHeroRank!).forEach(hero => {
        if (rallyFormation.length < 3 && !rallyFormation.some(rallyHero => rallyHero.class === hero.class)) {
            if (hero.stars && hero.rallyHeroRequiredStars && hero.stars >= hero.rallyHeroRequiredStars) {
                return
            }
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

    return rallyFormation
}

const getBestInfantryRallyHero = (heroes: Hero[]) => {
    const jeronimo = findByName("Jeronimo", heroes)
    const hector = findByName("Hector", heroes)
    if (!jeronimo && hector) return hector
    if (jeronimo && !hector) return jeronimo
    if (!(jeronimo && hector)) {
        return undefined // TODO: best other hero
    }
    if (!jeronimo.stars && hector.stars) return hector
    if (jeronimo.stars && !hector.stars) return jeronimo
    if (!(jeronimo.stars && hector.stars)) {
        return undefined // TODO: best other hero
    }
    if (jeronimo.stars > 3) {
        return jeronimo
    }
    if (hector.stars && hector.stars === 5) {
        return hector
    }
    if (jeronimo.stars + 2 < (hector.stars || 0)) {
        return hector
    }
    return jeronimo
}

/*export function getClassImage(class: HeroClass): string {
    return "fjdks"
}*/