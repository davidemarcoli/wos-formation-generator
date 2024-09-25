"use client"

import { generateFormations, Hero } from "@/lib/heroes"
import { useEffect, useState } from "react"
import HeroCard from "./hero-card"
import { Button } from "@/components/ui/button"

interface HeroSelectionProps {
    heroes: Hero[],
    selectedHeroes: Set<Hero>,
    mainRallyHeroes: Hero[],
    onPageChange: (indexChange: number) => void
}

export default function FormationGenerator({
    heroes,
    selectedHeroes,
    mainRallyHeroes,
    onPageChange
}: HeroSelectionProps) {

    const [formations, setFormations] = useState<Hero[][]>()

    useEffect(() => {
        console.log(mainRallyHeroes)
        setFormations(generateFormations(Array.from(selectedHeroes.values()), mainRallyHeroes))
    }, [heroes, selectedHeroes, mainRallyHeroes])

    return (
        <div className="flex flex-col w-full p-4 md:p-16">
            <h1 className="text-4xl text-center">
                Formations
            </h1>

            <div className="mt-6">
                <Button className="float-left" onClick={() => onPageChange(-1)}>Previous</Button>
            </div>

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