"use client"

import { Button } from "@/components/ui/button"
import { customGroupBy, Hero } from "@/lib/heroes"
import HeroCard from "./hero-card"

interface HeroSelectionProps {
    heroes: Hero[],
    selectedHeroes: Set<Hero>,
    onHeroSelection: (hero: Hero) => void,
    onHeroStarSelection: (hero: Hero, stars: number) => void,
    resetAll: () => void,
    onPageChange: (indexChange: number) => void
}

export default function HeroSelection({
    heroes,
    selectedHeroes,
    onHeroSelection,
    onHeroStarSelection,
    resetAll,
    onPageChange
}: HeroSelectionProps) {

    function toggleAll() {
        if (areAllHeroesSelected()) {
            resetAll()
        } else {
            heroes.filter(hero => !selectedHeroes.has(hero)).forEach(hero => {
                onHeroSelection(hero)
            })
        }
    }

    function areAllHeroesSelected(): boolean {
        const selectedHeroesArray = Array.from(selectedHeroes.values())
        return heroes.every(hero => selectedHeroesArray.find(selectedHero => selectedHero.name === hero.name))
    }

    return (
        <div className="flex flex-col w-full p-4 md:p-16">
            <h1 className="text-4xl text-center">
                Heroes
            </h1>
            
            <div className="flex justify-between items-center w-full mt-6">
            <Button onClick={() => onPageChange(-1)} data-umami-event="Navigate back">Back</Button>
            <Button onClick={toggleAll} data-umami-event="Select all Heroes">{areAllHeroesSelected() ? 'Deselect' : 'Select'} All</Button>
            <Button onClick={() => onPageChange(1)} data-umami-event="Navigate forward">Next</Button>
            </div>

            {Object.entries(customGroupBy(heroes, ({ gen }) => gen)).map(([gen, heroes]) =>
                <div key={'gen' + gen}>
                    <h2 className="text-2xl mt-12">Gen {gen}</h2>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                        {
                            heroes?.map(hero => {
                                const selectedHero = Array.from(selectedHeroes.values()).find(selectedHero => selectedHero.name == hero.name)
                                return (
                                    <HeroCard key={hero.name} hero={selectedHero || hero} isSelected={!!selectedHero} onHeroSelection={onHeroSelection} onHeroStarSelection={(stars: number) => onHeroStarSelection(hero, stars)} />
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    )
}