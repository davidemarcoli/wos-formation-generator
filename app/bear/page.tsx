"use client"

import { Hero, HEROES } from "@/lib/heroes"
import { useEffect, useState } from "react"
import HeroSelection from "./hero-selection"
import FormationGenerator from "./formation-generator"
import MainRallySelection from "./main-rally-selection"
import { useRouter } from "next/navigation"

const storageKey = "selectedHeroes"

export default function BearFormation() {

    const [selectedHeroes, setSelectedHeroes] = useState<Set<Hero>>(new Set<Hero>())
    const [mainRallyHeroes, setMainRallyHeroes] = useState<Hero[]>([])
    const [pageIndex, setPageIndex] = useState<number>(0)

    const router = useRouter()

    useEffect(() => {
        const storedData = localStorage.getItem(storageKey)
        if (storedData) {
            const parsedHeroes = JSON.parse(storedData) as Hero[]
            const selectedHeroes = parsedHeroes.map(storedHero => {
                const hero = HEROES.find(hero => storedHero.name === hero.name )
                if (!hero) {
                    console.warn("Couldn't map hero with name \"" + storedHero.name + "\"")
                    return undefined
                }
                hero.stars = storedHero.stars
                return hero
            }).filter(hero => !!hero)
            setSelectedHeroes(new Set(selectedHeroes))
            //setSelectedHeroes(new Set(JSON.parse(storedData)))
        }
    }, [])

    function onHeroClick(hero: Hero) {
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
                const newHeroes = new Set(current).add(hero)
                localStorage.setItem(storageKey, JSON.stringify(Array.from(newHeroes)))
                return newHeroes
            })
        }
    }

    function onHeroStarSelection(hero: Hero, stars: number) {
        setSelectedHeroes(current => {
            const newHeroes = new Set(selectedHeroes)
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

    function onPageChange(indexChange: number) {
        if (pageIndex + indexChange < 0) {
            router.push("/")
        } else {
            setPageIndex(pageIndex + indexChange)
        }
    }

    return (
        <div>
            {pageIndex == 0 &&
                <HeroSelection heroes={HEROES} onHeroSelection={onHeroClick} selectedHeroes={selectedHeroes} resetAll={resetAll} onPageChange={onPageChange} onHeroStarSelection={onHeroStarSelection}></HeroSelection>
            }
            {pageIndex == 1 &&
                <MainRallySelection selectedHeroes={selectedHeroes} onMainRallySelection={(heroes) => setMainRallyHeroes(heroes)} onPageChange={onPageChange}></MainRallySelection>
            }
            {pageIndex == 2 &&
                <FormationGenerator heroes={HEROES} selectedHeroes={selectedHeroes} mainRallyHeroes={mainRallyHeroes} onPageChange={onPageChange}></FormationGenerator>
            }
        </div>
    )
}