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
        <Card key={hero.name} style={{ borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? "white" : "hsl(var(--border))" }}>
            <Image className="float-right" style={{ borderTopRightRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)" }} alt={hero.name} src={getHeroImage(hero.name)} height={200} width={200}></Image>
            <CardHeader onClick={() => onHeroSelection(hero)}>
                <div className="flex gap-2">
                    <CardTitle>{hero.name}</CardTitle>
                    <Image alt="hero-class" src={getClassImage(hero.class)} width={25} height={25} style={{ maxHeight: "25px" }}></Image>
                </div>
                {/* <CardDescription>Gen {hero.gen}</CardDescription> */}
            </CardHeader>
            <CardContent>
                <div className="flex z-1">
                    <Star fill="white" fillOpacity={hero.stars && hero.stars >= 1 ? 1 : 0} onClick={() => onHeroStarSelection(1)}></Star>
                    <Star fill="white" fillOpacity={hero.stars && hero.stars >= 2 ? 1 : 0} onClick={() => onHeroStarSelection(2)}></Star>
                    <Star fill="white" fillOpacity={hero.stars && hero.stars >= 3 ? 1 : 0} onClick={() => onHeroStarSelection(3)}></Star>
                    <Star fill="white" fillOpacity={hero.stars && hero.stars >= 4 ? 1 : 0} onClick={() => onHeroStarSelection(4)}></Star>
                    <Star fill="white" fillOpacity={hero.stars && hero.stars >= 5 ? 1 : 0} onClick={() => onHeroStarSelection(5)}></Star>
                </div>
            </CardContent>
            {/* <CardContent>
                <p>bla content</p>
            </CardContent>
            <CardFooter>
                <p>bla footer</p>
            </CardFooter> */}
        </Card>
    )
}