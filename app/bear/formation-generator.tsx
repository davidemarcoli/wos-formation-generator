import React, { useEffect, useState } from "react";
import { Hero, HeroClass, getClassImage } from "@/lib/heroes";
import { FormationWithRatio, generateFormations } from "@/lib/formation-generator";
import HeroCard from "./hero-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FormationGeneratorProps {
  selectedHeroes: Set<Hero>;
  mainRallyFormation: FormationWithRatio;
  onPageChange: (indexChange: number) => void;
}

export default function FormationGenerator({
  selectedHeroes,
  mainRallyFormation,
  onPageChange,
}: FormationGeneratorProps) {
  const [formations, setFormations] = useState<
    { heroes: Hero[]; troopRatio: number[] }[]
  >([]);

  useEffect(() => {
    setFormations(generateFormations(Array.from(selectedHeroes), mainRallyFormation));
  }, [selectedHeroes, mainRallyFormation]);

  return (
    <div className="flex flex-col w-full p-4 md:p-16">
      <h1 className="text-4xl text-center">Formations</h1>

      <div className="mt-6">
        <Button
          className="float-left"
          onClick={() => onPageChange(-1)}
          data-umami-event="Navigate back"
        >
          Previous
        </Button>
      </div>

      {formations.map((formation, index) => (
        <div key={`formation-${index}`}>
          <h2 className="text-2xl mt-12">
            {index === 0 ? (
              <span>Main Rally Formation</span>
            ) : (
              <span>Joiner Formation {index}</span>
            )}
            {" "}
            <span className="text-sm whitespace-nowrap">
              ({formation.troopRatio[0]}%
              <Image
                alt="infantry"
                src={getClassImage(HeroClass.INFANTRY)}
                width={25}
                height={25}
                className="w-5 h-5 object-contain inline"
              />
              /{formation.troopRatio[1]}%
              <Image
                alt="lancer"
                src={getClassImage(HeroClass.LANCER)}
                width={25}
                height={25}
                className="w-5 h-5 object-contain inline"
              />
              /{formation.troopRatio[2]}%
              <Image
                alt="marksman"
                src={getClassImage(HeroClass.MARKSMEN)}
                width={25}
                height={25}
                className="w-5 h-5 object-contain inline"
              />
              )
            </span>
          </h2>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
            {formation.heroes.map((hero) => (
              <HeroCard key={hero.name} hero={hero} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}