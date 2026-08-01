import React, { useEffect, useState } from "react";
import { Hero, HeroClass, getClassImage } from "@/lib/heroes";
import { FormationWithRatio, TroopPresetSettings, TroopPresetMode, generateFormations } from "@/lib/formation-generator";
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
  const troopSettingsStorageKey = "bearTroopPresetSettings";
  const [troopSettings, setTroopSettings] = useState<TroopPresetSettings>({
    mode: "auto" as TroopPresetMode,
    troopsPerMarch: 200000,
    enforceMinimums: false,
    minInfantry: 10000,
    minLancer: 10000,
  });
  const [formations, setFormations] = useState<FormationWithRatio[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(troopSettingsStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as TroopPresetSettings;
        setTroopSettings((curr) => ({
          ...curr,
          ...parsed,
        }));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(troopSettingsStorageKey, JSON.stringify(troopSettings));
    } catch {
      // ignore
    }
  }, [troopSettings]);

  useEffect(() => {
    setFormations(generateFormations(Array.from(selectedHeroes), mainRallyFormation, troopSettings));
  }, [selectedHeroes, mainRallyFormation, troopSettings]);

  return (
    <div className="flex flex-col w-full p-4 md:p-16">
      <h1 className="text-4xl text-center">Formations</h1>

      <div className="mt-6 rounded-md border p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Troop preset</label>
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={troopSettings.mode}
              onChange={(e) =>
                setTroopSettings((s) => ({ ...s, mode: e.target.value as TroopPresetMode }))
              }
            >
              <option value="auto">Auto (based on troops)</option>
              <option value="low">Low troops (early)</option>
              <option value="mid">Mid troops (stable)</option>
              <option value="high">High troops (marksman heavy)</option>
              <option value="extreme">Extreme (very marksman heavy)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Troops per march</label>
            <input
              className="h-10 rounded-md border bg-background px-3 text-sm"
              type="number"
              min={0}
              value={troopSettings.troopsPerMarch}
              onChange={(e) =>
                setTroopSettings((s) => ({ ...s, troopsPerMarch: Number(e.target.value) }))
              }
            />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!troopSettings.enforceMinimums}
              onChange={(e) =>
                setTroopSettings((s) => ({ ...s, enforceMinimums: e.target.checked }))
              }
            />
            Enforce minimum Inf/Lan
          </label>
        </div>

        {troopSettings.enforceMinimums && (
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Min Infantry</label>
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm"
                type="number"
                min={0}
                value={troopSettings.minInfantry ?? 0}
                onChange={(e) =>
                  setTroopSettings((s) => ({ ...s, minInfantry: Number(e.target.value) }))
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Min Lancer</label>
              <input
                className="h-10 rounded-md border bg-background px-3 text-sm"
                type="number"
                min={0}
                value={troopSettings.minLancer ?? 0}
                onChange={(e) =>
                  setTroopSettings((s) => ({ ...s, minLancer: Number(e.target.value) }))
                }
              />
            </div>
          </div>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Tip: set this to your typical march size. Auto will switch presets as your troop count grows.
          If you enable minimums, the generator will guarantee at least those Infantry/Lancer counts and give the rest to Marksmen.
        </p>
      </div>

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
              {formation.troopCounts && troopSettings.troopsPerMarch > 0 ? (
                <span className="ml-2 text-xs text-muted-foreground">
                  [{formation.troopCounts[0].toLocaleString()}/
                  {formation.troopCounts[1].toLocaleString()}/
                  {formation.troopCounts[2].toLocaleString()}]
                </span>
              ) : null}
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