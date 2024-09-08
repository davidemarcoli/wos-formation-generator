"use client"

import { generateFormations, Hero } from "@/lib/heroes"
import { useEffect, useState } from "react"
import HeroCard from "./hero-card"

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

                <div key={'formation' + index}>
                    <h2 className="text-2xl mt-12">Formation {index + 1}</h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {formation.map(hero =>
                            <HeroCard key={hero.name} hero={hero} />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}