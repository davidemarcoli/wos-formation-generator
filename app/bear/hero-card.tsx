import { getClassImage, getHeroImage, Hero } from "@/lib/heroes";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Star } from "lucide-react";


interface HeroCardProps {
    hero: Hero
    isSelected?: boolean
    onHeroSelection?: (hero: Hero) => void
    onHeroStarSelection?: (stars: number) => void
}

export default function HeroCard({
    hero,
    isSelected = false,
    onHeroSelection = () => {},
    onHeroStarSelection = () => {}
}: HeroCardProps) {
    return (
<Card 
      className={`flex flex-col sm:flex-row overflow-hidden transition-all duration-300 ${
        isSelected ? 'ring-2 ring-white' : 'ring-1 ring-border'
      }`}
      key={hero.name}
    >
      <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <CardTitle 
            className="text-lg sm:text-xl cursor-pointer hover:underline"
            onClick={() => onHeroSelection(hero)}
          >
            {hero.name}
          </CardTitle>
          <Image
            alt="hero-class"
            src={getClassImage(hero.class)}
            width={25}
            height={25}
            className="w-6 h-6 object-contain"
          />
        </div>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((starIndex) => (
            <Star
              key={starIndex}
              className="w-5 h-5 cursor-pointer transition-opacity duration-200"
              fill="white"
              fillOpacity={hero.stars || 0 >= starIndex ? 1 : 0}
              onClick={() => onHeroStarSelection(starIndex)}
            />
          ))}
        </div>
      </div>
      <div className="relative w-full sm:w-40 h-40">
        <Image
          className="object-cover rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none"
          alt={hero.name}
          src={getHeroImage(hero.name)}
          layout="fill"
        />
      </div>
    </Card>
    )
}