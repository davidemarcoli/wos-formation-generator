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
    imagePath?: string
    isRallyHero?: boolean
    rallyHeroRank?: number,
    rallyHeroRequiredStars?: number
    isLeader?: boolean
    leaderRank?: number
    leaderRequiredStars?: number
    rank: number
    gen: number
    rarity: HeroRarity,
    stars?: number,
    isBestRallyHero?: (remainingHeroes: Hero[]) => boolean
}

export const HEROES: Hero[] = [
    {
        name: "Smith",
        class: 0,
        imagePath: "/2023/05/smith.png",
        rank: 100,
        gen: 0,
        rarity: 0
    },
    {
        name: "Eugene",
        class: 0,
        imagePath: "/2023/05/eugene.png",
        rank: 100,
        gen: 0,
        rarity: 0
    },
    {
        name: "Charlie",
        class: 1,
        imagePath: "/2023/05/charlie.png",
        rank: 100,
        gen: 0,
        rarity: 0
    },
    {
        name: "Cloris",
        class: 2,
        imagePath: "/2023/05/cloris.png",
        rank: 100,
        gen: 0,
        rarity: 0
    },
    {
        name: "Sergey",
        class: 0,
        imagePath: "/2023/05/sergey.png",
        rank: 10,
        gen: 0,
        rarity: 1
    },
    {
        name: "Jessie",
        class: 1,
        imagePath: "/2023/05/jessie.png",
        rank: 10,
        gen: 0,
        rarity: 1,
        isLeader: true,
        leaderRank: 1,
        leaderRequiredStars: 4
    },
    {
        name: "Patrick",
        class: 1,
        imagePath: "/2023/05/patrick.png",
        rank: 10,
        gen: 0,
        rarity: 1
    },
    {
        name: "Walis Bokan",
        class: 1,
        imagePath: "/2023/10/3.jpg",
        rank: 10,
        gen: 0,
        rarity: 1
    },
    {
        name: "Ling Shuang",
        class: 1,
        imagePath: "/2024/12/凌雪350.jpg",
        rank: 10,
        gen: 0,
        rarity: 1
    },
    {
        name: "Gina",
        class: 2,
        imagePath: "/2023/05/Gina.png",
        rank: 10,
        gen: 0,
        rarity: 1
    },
    {
        name: "Bahiti",
        class: 2,
        imagePath: "/2023/05/bahiti.png",
        rank: 10,
        gen: 0,
        rarity: 1,
        isRallyHero: true,
        rallyHeroRank: 9,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Jasser",
        class: 2,
        imagePath: "/2023/10/1.jpg",
        rank: 10,
        gen: 0,
        rarity: 1,
        isLeader: true,
        leaderRank: 1,
        leaderRequiredStars: 4
    },
    {
        name: "Seo-yoon",
        class: 2,
        imagePath: "/2023/10/2.jpg",
        rank: 10,
        gen: 0,
        rarity: 1,
        isLeader: true,
        leaderRank: 1,
        leaderRequiredStars: 4
    },
    {
        name: "Natalia",
        class: 0,
        imagePath: "/2023/05/natalia.png",
        rank: 10,
        gen: 1,
        rarity: 2
    },
    {
        name: "Jeronimo",
        class: 0,
        imagePath: "/2023/05/jeronimo.png",
        rank: 10,
        gen: 1,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 1,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Molly",
        class: 1,
        imagePath: "/2023/05/molly.png",
        rank: 10,
        gen: 1,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 7,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Zinman",
        class: 2,
        imagePath: "/2023/05/zinman.png",
        rank: 10,
        gen: 1,
        rarity: 2
    },
    {
        name: "Flint",
        class: 0,
        imagePath: "/2023/05/flint.png",
        rank: 10,
        gen: 2,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 3,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Philly",
        class: 1,
        imagePath: "/2023/05/philly.png",
        rank: 10,
        gen: 2,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 6,
        rallyHeroRequiredStars: 4,
        isLeader: true,
        leaderRank: 3,
        leaderRequiredStars: 4
    },
    {
        name: "Alonso",
        class: 2,
        imagePath: "/2023/05/alonso.png",
        rank: 10,
        gen: 2,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 8,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Logan",
        class: 0,
        imagePath: "/2023/05/logan.png",
        rank: 10,
        gen: 3,
        rarity: 2
    },
    {
        name: "Mia",
        class: 1,
        imagePath: "/2023/05/mia.png",
        rank: 10,
        gen: 3,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 1,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Greg",
        class: 2,
        imagePath: "/2023/05/greg.png",
        rank: 10,
        gen: 3,
        rarity: 2
    },
    {
        name: "Ahmose",
        class: 0,
        imagePath: "/2023/09/ahmos.png",
        rank: 10,
        gen: 4,
        rarity: 2
    },
    {
        name: "Reina",
        class: 1,
        imagePath: "/2023/09/1690429616516_7.jpg",
        rank: 10,
        gen: 4,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 5,
        rallyHeroRequiredStars: 4,
        isLeader: true,
        leaderRank: 3,
        leaderRequiredStars: 4
    },
    {
        name: "Lynn",
        class: 2,
        imagePath: "/2023/09/1690429616507_5.jpg",
        rank: 10,
        gen: 4,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 7,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Hector",
        class: 0,
        imagePath: "/2023/09/1690429616489_3.jpg",
        rank: 10,
        gen: 5,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 2,
        rallyHeroRequiredStars: 4,
        isBestRallyHero (remainingHeroes) {
            const jeronimo = remainingHeroes.find((hero)=>hero.name === "Jeronimo");
            if (!jeronimo || !jeronimo.stars) return true;
            if (jeronimo.stars > 3) {
                return false;
            }
            if (this.stars && this.stars === 5) {
                return true;
            }
            if (jeronimo.stars + 2 < (this.stars || 0)) {
                return true;
            }
            return false;
        }
    },
    {
        name: "Norah",
        class: 1,
        imagePath: "/2023/09/1690429616480_2.jpg",
        rank: 10,
        gen: 5,
        rarity: 2,
        isLeader: true,
        leaderRank: 3,
        leaderRequiredStars: 4
    },
    {
        name: "Gwen",
        class: 2,
        imagePath: "/2023/09/1690429616472_1.jpg",
        rank: 10,
        gen: 5,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 6,
        rallyHeroRequiredStars: 4,
        isLeader: true,
        leaderRank: 2,
        leaderRequiredStars: 4
    },
    {
        name: "Wu Ming",
        class: 0,
        imagePath: "/2023/11/wuming.jpg",
        rank: 10,
        gen: 6,
        rarity: 2
    },
    {
        name: "Renee",
        class: 1,
        imagePath: "/2023/11/rene.jpg",
        rank: 10,
        gen: 6,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 4,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Wayne",
        class: 2,
        imagePath: "/2023/11/wayne.jpg",
        rank: 10,
        gen: 6,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 5,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Edith",
        class: 0,
        imagePath: "/2024/03/20240222_2.jpg",
        rank: 10,
        gen: 7,
        rarity: 2
    },
    {
        name: "Gordon",
        class: 1,
        imagePath: "/2024/03/20240222_1.jpg",
        rank: 10,
        gen: 7,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 3,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Bradley",
        class: 2,
        imagePath: "/2024/03/20240222_3.jpg",
        rank: 10,
        gen: 7,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 4,
        rallyHeroRequiredStars: 4,
        isLeader: true,
        leaderRank: 2,
        leaderRequiredStars: 4
    },
    {
        name: "Gatot",
        class: 0,
        imagePath: "/2024/07/5.jpg",
        rank: 10,
        gen: 8,
        rarity: 2
    },
    {
        name: "Sonya",
        class: 1,
        imagePath: "/2024/07/6.jpg",
        rank: 10,
        gen: 8,
        rarity: 2,
        isLeader: true,
        leaderRank: 2,
        leaderRequiredStars: 4
    },
    {
        name: "Hendrik",
        class: 2,
        imagePath: "/2024/07/7.jpg",
        rank: 20,
        gen: 8,
        rarity: 2
    },
    {
        name: "Magnus",
        class: 0,
        imagePath: "/2024/08/magnus.jpg",
        rank: 10,
        gen: 9,
        rarity: 2,
        isLeader: true,
        leaderRank: 2,
        leaderRequiredStars: 4
    },
    {
        name: "Fred",
        class: 1,
        imagePath: "/2024/08/fred.jpg",
        rank: 10,
        gen: 9,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 2,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Xura",
        class: 2,
        imagePath: "/2024/08/xura.jpg",
        rank: 10,
        gen: 9,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 3,
        rallyHeroRequiredStars: 4
    },
    {
        name: "Gregory",
        class: 0,
        imagePath: "/2024/12/gregory350.jpg",
        rank: 10,
        gen: 10,
        rarity: 2,
        isLeader: true,
        leaderRank: 3,
        leaderRequiredStars: 4
    },
    {
        name: "Freya",
        class: 1,
        imagePath: "/2024/12/freya350.jpg",
        rank: 10,
        gen: 10,
        rarity: 2
    },
    {
        name: "Blanchette",
        class: 2,
        imagePath: "/2024/12/blanchette350.jpg",
        rank: 10,
        gen: 10,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 2,
        rallyHeroRequiredStars: 4,
        isLeader: true,
        leaderRank: 2,
        leaderRequiredStars: 4
    },
    {
        name: "Eleonora",
        class: 0,
        imagePath: "/2025/03/eleonora.jpg",
        rank: 10,
        gen: 11,
        rarity: 2
    },
    {
        name: "Lloyd",
        class: 1,
        imagePath: "/2025/03/Lloyd.jpg",
        rank: 10,
        gen: 11,
        rarity: 2
    },
    {
        name: "Rufus",
        class: 2,
        imagePath: "/2025/03/rufus.jpg",
        rank: 10,
        gen: 11,
        rarity: 2,
        isRallyHero: true,
        rallyHeroRank: 1,
        isLeader: true,
        leaderRank: 1
    }
]

export const getClassImage = (heroClass: HeroClass): string => {
    switch (heroClass) {
        case HeroClass.INFANTRY:
            return "https://www-cf.whiteoutsurvival.wiki/wp-content/uploads/2023/05/infantry.png"
            // return "/images/heroes/classes/infantry.png"
        case HeroClass.LANCER:
            return "https://www-cf.whiteoutsurvival.wiki/wp-content/uploads/2023/05/lancer.png"
        // return "/images/heroes/classes/lancer.png"
        case HeroClass.MARKSMEN:
            return "https://www-cf.whiteoutsurvival.wiki/wp-content/uploads/2023/05/marksman.png"
            // return "/images/heroes/classes/marksman.png"
    }
}

export const getHeroImage = (heroName: string): string => {
    const cleanedName = heroName.toLowerCase().replaceAll(" ", "-")
    return `/images/heroes/${cleanedName}.png`
}

export const findByName = (name: string, heroes: Hero[]): Hero | undefined => {
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