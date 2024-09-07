"use client"

import { Hero, HEROES } from "@/lib/heroes"
import { useEffect, useState } from "react"
import HeroSelection from "./hero-selection"
import FormationGenerator from "./formation-generator"

const storageKey = "selectedHeroes"

export default function BearFormation() {

    const [selectedHeroes, setSelectedHeroes] = useState<Set<string>>(new Set<string>())
    const [pageIndex, setPageIndex] = useState<number>(0)

    useEffect(() => {
        const storedData = localStorage.getItem(storageKey)
        if (storedData) {
            setSelectedHeroes(new Set(JSON.parse(storedData)))
        }
    }, [])

    function onHeroClick(hero: Hero) {
        if (selectedHeroes.has(hero.name)) {

            const newHeroes = new Set(selectedHeroes)
            newHeroes.delete(hero.name)
            setSelectedHeroes(newHeroes)
            //console.log(newHeroes)
            localStorage.setItem(storageKey, JSON.stringify(Array.from(newHeroes)))
        } else {
            setSelectedHeroes(current => {
                const newHeroes = new Set(current).add(hero.name)
                //console.log(newHeroes)
                localStorage.setItem(storageKey, JSON.stringify(Array.from(newHeroes)))
                return newHeroes
            })
        }
    }

    function resetAll() {
        setSelectedHeroes(new Set())
        localStorage.setItem(storageKey, JSON.stringify([]))
    }

    return (
        <div>
            {pageIndex == 0 &&
                <HeroSelection heroes={HEROES} onHeroSelection={onHeroClick} selectedHeroes={selectedHeroes} resetAll={resetAll} onNextPage={() => setPageIndex(pageIndex + 1)}></HeroSelection>
            }
            {pageIndex == 1 &&
                <FormationGenerator heroes={HEROES} selectedHeroes={selectedHeroes}></FormationGenerator>
            }
        </div>
    )
}