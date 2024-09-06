"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { customGroupBy, generateFormations, getClassImage, getHeroImage, Hero } from "@/lib/heroes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useLocalStorage } from "usehooks-ts"

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
    }, [])

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