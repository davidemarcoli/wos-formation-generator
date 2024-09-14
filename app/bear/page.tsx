"use client"

import { Hero, HEROES } from "@/lib/heroes"
import { useEffect, useState } from "react"
import HeroSelection from "./hero-selection"
import FormationGenerator from "./formation-generator"

const storageKey = "selectedHeroes"

export default function BearFormation() {

    const [selectedHeroes, setSelectedHeroes] = useState<Set<Hero>>(new Set<Hero>())
    const [pageIndex, setPageIndex] = useState<number>(0)

    useEffect(() => {
        const storedData = localStorage.getItem(storageKey)
        if (storedData) {
            setSelectedHeroes(new Set(JSON.parse(storedData)))
        }
    }, [])

    function onHeroClick(hero: Hero) {
        console.log(hero)
        if (Array.from(selectedHeroes).find(currentHero => currentHero.name == hero.name)) {
            const newHeroes = new Set(selectedHeroes)
            const selectedHero = Array.from(selectedHeroes.values()).find(value => value.name == hero.name)
            if (!selectedHero) {
                return selectedHeroes
            }
            newHeroes.delete(selectedHero)
            setSelectedHeroes(newHeroes)
            localStorage.setItem(storageKey, JSON.stringify(Array.from(newHeroes)))
        } else {
            setSelectedHeroes(current => {
                console.log(current)
                console.log(hero)
                const newHeroes = new Set(current).add(hero)
                console.log(newHeroes)
                localStorage.setItem(storageKey, JSON.stringify(Array.from(newHeroes)))
                return newHeroes
            })
        }
    }

    function onHeroStarSelection(hero: Hero, stars: number) {
        setSelectedHeroes(current => {
            const newHeroes = new Set(selectedHeroes)
            console.log(hero.name)
            console.log(Array.from(current.values()))
            let newHero = Array.from(current.values()).find(value => value.name == hero.name)
            if (newHero) {
                newHeroes.delete(newHero)
            } else {
                newHero = hero
            }
            newHero.stars = stars
            newHeroes.add(newHero)
            localStorage.setItem(storageKey, JSON.stringify(Array.from(newHeroes)))
            return newHeroes
        })
    }

    function resetAll() {
        setSelectedHeroes(new Set())
        localStorage.setItem(storageKey, JSON.stringify([]))
    }

    return (
        <div>
            {pageIndex == 0 &&
                <HeroSelection heroes={HEROES} onHeroSelection={onHeroClick} selectedHeroes={selectedHeroes} resetAll={resetAll} onNextPage={() => setPageIndex(pageIndex + 1)} onHeroStarSelection={onHeroStarSelection}></HeroSelection>
            }
            {pageIndex == 1 &&
                <FormationGenerator heroes={HEROES} selectedHeroes={selectedHeroes}></FormationGenerator>
            }
        </div>
    )
}