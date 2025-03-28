"use client"

import { Button } from "@/components/ui/button"
import { Hero, HeroClass } from "@/lib/heroes"
import { FormationWithRatio, getBestRallyHeroes } from "@/lib/formation-generator"
import HeroCard from "./hero-card"
import { useEffect, useState } from "react"

interface HeroSelectionProps {
    selectedHeroes: Set<Hero>,
    onMainRallySelection: (formation: FormationWithRatio) => void,
    onPageChange: (indexChange: number) => void
}

export default function MainRallySelection({
    selectedHeroes,
    onMainRallySelection,
    onPageChange
}: HeroSelectionProps) {

    const [recommendedMainRallyFormation, setRecommendedMainRallyFormation] = useState<FormationWithRatio>()
    const [mainRallyFormation, setMainRallyFormation] = useState<FormationWithRatio>({heroes: [], troopRatio: []})

    useEffect(() => {
        const recommendedMainRally = getBestRallyHeroes(Array.from(selectedHeroes))
        console.log(recommendedMainRally)
        setRecommendedMainRallyFormation(recommendedMainRally)
        setMainRallyFormation(recommendedMainRally)
    }, [selectedHeroes])

    function changeSelection(selectedHero: Hero) {
        const filteredArray = mainRallyFormation?.heroes?.filter(hero => hero.class !== selectedHero.class) || []
        setMainRallyFormation({...mainRallyFormation, heroes: [...filteredArray, selectedHero]})
        window.umami.track("Select different Main Hero")
    }

    useEffect(() => {
        onMainRallySelection(mainRallyFormation)
    }, [mainRallyFormation, onMainRallySelection])

    function filterHeroesByClassAndSortByRecommended(heroClass: HeroClass) {
        // if (heroClass == HeroClass.INFANTRY) {
        //     console.log(Array.from(selectedHeroes).find(hero => hero.name == "Hector"))
        //     console.log(Array.from(selectedHeroes).filter(hero => hero.isRallyHero).find(hero => hero.name == "Hector"))
        //     console.log(Array.from(selectedHeroes).filter(hero => hero.isRallyHero).sort((hero) => recommendedRallyHeroes?.includes(hero) ? -1 : 1).find(hero => hero.name == "Hector"))
        // }
        return Array.from(selectedHeroes)
            .filter(hero => hero.class === heroClass && hero.isRallyHero)
            .sort((heroA, heroB) => {
                // First sort by whether the hero is in recommendedMainRallyFormation
                const isHeroAInRecommended = recommendedMainRallyFormation?.heroes.includes(heroA);
                const isHeroBInRecommended = recommendedMainRallyFormation?.heroes.includes(heroB);

                if (isHeroAInRecommended && !isHeroBInRecommended) return -1;
                if (!isHeroAInRecommended && isHeroBInRecommended) return 1;

                // Then sort by rallyHeroRank
                return heroA.rallyHeroRank! - heroB.rallyHeroRank!;
            });
    }

    return (
        <div className="flex flex-col w-full p-4 md:p-16">
            <h1 className="text-4xl text-center">
                Pick your main rally
            </h1>

            {/* <p className="mt-6">
                Infantry: Jeronimo 4 Stars is better than Hector 5 Stars<br/>
                Lancer: Sonya 4 Stars is better than Mia, Sonya = Mia = Renee<br/>
                Marksmen: <br/><br/>
                You can pick your main rally here!
            </p> */}

            <div className="mt-6">
                <Button className="float-left" onClick={() => onPageChange(-1)} data-umami-event="Navigate back">Previous</Button>
                <Button className="float-right" onClick={() => onPageChange(1)} data-umami-event="Navigate forward">Next</Button>
            </div>

            {mainRallyFormation.heroes && <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
                <div className="flex flex-col gap-4 mb-4">
                    <h2 className="text-2xl">Infantry</h2>
                    {filterHeroesByClassAndSortByRecommended(HeroClass.INFANTRY).map(hero => (
                        <HeroCard key={hero.name} hero={hero} isSelected={mainRallyFormation.heroes.includes(hero)} onHeroSelection={changeSelection} isRecommended={recommendedMainRallyFormation?.heroes?.includes(hero)} />
                    ))}
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    <h2 className="text-2xl">Lancer</h2>
                    {filterHeroesByClassAndSortByRecommended(HeroClass.LANCER).map(hero => (
                        <HeroCard key={hero.name} hero={hero} isSelected={mainRallyFormation.heroes.includes(hero)} onHeroSelection={changeSelection} isRecommended={recommendedMainRallyFormation?.heroes?.includes(hero)} />
                    ))}
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    <h2 className="text-2xl">Marksmen</h2>
                    {filterHeroesByClassAndSortByRecommended(HeroClass.MARKSMEN).map(hero => (
                        <HeroCard key={hero.name} hero={hero} isSelected={mainRallyFormation.heroes.includes(hero)} onHeroSelection={changeSelection} isRecommended={recommendedMainRallyFormation?.heroes?.includes(hero)} />
                    ))}
                </div>

            </div>}
        </div>
    )
}