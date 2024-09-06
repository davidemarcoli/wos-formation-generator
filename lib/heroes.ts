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
    name: string,
    class: HeroClass,
    isLeader?: boolean
    leaderRank?: number
    rank: number
    gen: number
    rarity: HeroRarity
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
        rank: 10,
        gen: 1,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Jeronimo",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 1,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Molly",
        class: HeroClass.LANCER,
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
        rank: 10,
        gen: 2,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Philly",
        class: HeroClass.LANCER,
        rank: 10,
        gen: 2,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Alonso",
        class: HeroClass.MARKSMEN,
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
        rank: 10,
        gen: 3,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Greg",
        class: HeroClass.MARKSMEN,
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
        rank: 10,
        gen: 4,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Lynn",
        class: HeroClass.MARKSMEN,
        rank: 10,
        gen: 4,
        rarity: HeroRarity.LEGENDARY
    },

    {
        name: "Hector",
        class: HeroClass.INFANTRY,
        rank: 10,
        gen: 5,
        rarity: HeroRarity.LEGENDARY
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
        rank: 10,
        gen: 6,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Wayne",
        class: HeroClass.MARKSMEN,
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
        rank: 10,
        gen: 8,
        rarity: HeroRarity.LEGENDARY
    },
    {
        name: "Hendrik",
        class: HeroClass.MARKSMEN,
        rank: 10,
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

/*export function getClassImage(class: HeroClass): string {
    return "fjdks"
}*/