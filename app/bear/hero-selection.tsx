"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { customGroupBy, getClassImage, getHeroImage, Hero } from "@/lib/heroes"
import Image from "next/image"
import { useState } from "react"
import { useLocalStorage } from "usehooks-ts"

interface HeroSelectionProps {
    heroes: Hero[],
    selectedHeroes: Set<string>,
    onHeroSelection: (hero: Hero) => void,
    resetAll: () => void,
    onNextPage: () => void
}

export default function HeroSelection({
    heroes,
    selectedHeroes,
    onHeroSelection,
    resetAll,
    onNextPage
}: HeroSelectionProps) {

    function toggleAll() {
        if (areAllHeroesSelected()) {
            resetAll()
        } else {
            heroes.filter(hero => !selectedHeroes.has(hero.name)).forEach(hero => {
                onHeroSelection(hero)
            })
        }
    }

    function areAllHeroesSelected(): boolean {
        return heroes.every(hero => selectedHeroes.has(hero.name))
    }

    return (
        <div className="flex flex-col h-screen w-full p-16">
            <h1 className="text-4xl text-center">
                Heroes
            </h1>
            
            <div>
                <Button onClick={toggleAll}>{areAllHeroesSelected() ? 'Deselect' : 'Select'} All</Button>
                <Button className="float-right" onClick={onNextPage}>Next</Button>
            </div>

            {Object.entries(customGroupBy(heroes, ({ gen }) => gen)).map(([gen, heroes]) =>
                <div key={'gen' + gen}>
                    <h2 className="text-2xl mt-12">Gen {gen}</h2>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {
                            heroes?.map(hero =>
                                <Card key={hero.name} onClick={() => onHeroSelection(hero)} style={{ borderWidth: selectedHeroes.has(hero.name) ? 2 : 1, borderColor: selectedHeroes.has(hero.name) ? "white" : "hsl(var(--border))" }}>
                                    <Image className="float-right" style={{ borderTopRightRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)" }} alt={hero.name} src={getHeroImage(hero.name)} height={200} width={200}></Image>
                                    <CardHeader>
                                        <div className="flex gap-2">
                                            <CardTitle>{hero.name}</CardTitle>
                                            <Image alt="hero-class" src={getClassImage(hero.class)} width={25} height={25} style={{ maxHeight: "25px" }}></Image>
                                        </div>
                                        {/* <CardDescription>Gen {hero.gen}</CardDescription> */}
                                    </CardHeader>
                                    <CardContent>
                                        <p>bla content</p>
                                    </CardContent>
                                    <CardFooter>
                                        <p>bla footer</p>
                                    </CardFooter>
                                </Card>

                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}