"use client"

import { generateFormations, Hero } from "@/lib/heroes"
import { useEffect, useState } from "react"

interface HeroSelectionProps {
    heroes: Hero[],
    selectedHeroes: Set<string>,
}

export default function FormationGenerator({
    heroes,
    selectedHeroes,

}: HeroSelectionProps) {

    const [formations, setFormations] = useState<Hero[][]>()

    useEffect(() => {
        setFormations(generateFormations(heroes.filter(hero => selectedHeroes.has(hero.name))))
    }, [heroes, selectedHeroes])

    return (
        <div className="flex flex-col h-screen w-full p-16">
            <h1 className="text-4xl text-center">
                Formations
            </h1>

            {formations?.map((formation, index) =>
                <div key={index}>
                    {formation.map(hero =>
                        <div key={hero.name}>{hero.name}</div>
                    )}
                </div>
            )}
        </div>
    )
}