"use client"

import { Button } from "@/components/ui/button"
import { customGroupBy, Hero } from "@/lib/heroes"
import HeroCard from "./hero-card"

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
                                <HeroCard key={hero.name} hero={hero} isSelected={selectedHeroes.has(hero.name)} onHeroSelection={onHeroSelection} />
                            )
                        }
                    </div>
                </div>
            )}
        </div>
    )
}