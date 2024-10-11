"use client"

import { generateFormations, getClassImage, Hero, HeroClass } from "@/lib/heroes"
import { useEffect, useState } from "react"
import HeroCard from "./hero-card"
import { Button } from "@/components/ui/button"
import Image from "next/image";

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
        setFormations(generateFormations(Array.from(selectedHeroes.values()), mainRallyHeroes))
    }, [heroes, selectedHeroes, mainRallyHeroes])

    return (
        <div className="flex flex-col w-full p-4 md:p-16">
            <h1 className="text-4xl text-center">
                Formations
            </h1>

            <div className="mt-6">
                <Button className="float-left" onClick={() => onPageChange(-1)} data-umami-event="Navigate back">Previous</Button>
            </div>

            {formations?.map((formation, index) =>
                <div key={'formation' + index}>
                    <h2 className="text-2xl mt-12">Formation {index + 1} <span className="text-sm">(5%<Image
                        alt="hero-class"
                        src={getClassImage(HeroClass.INFANTRY)}
                        width={25}
                        height={25}
                        className="w-5 h-5 object-contain inline"
                    />/5%<Image
                            alt="hero-class"
                            src={getClassImage(HeroClass.LANCER)}
                            width={25}
                            height={25}
                            className="w-5 h-5 object-contain inline"
                        />/90%<Image
                            alt="hero-class"
                            src={getClassImage(HeroClass.MARKSMEN)}
                            width={25}
                            height={25}
                            className="w-5 h-5 object-contain inline"
                        />)</span></h2>

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