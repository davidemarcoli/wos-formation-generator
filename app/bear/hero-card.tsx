import { getClassImage, getHeroImage, Hero } from "@/lib/heroes";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"


interface HeroCardProps {
    hero: Hero
    isSelected?: boolean
    onHeroSelection?: (hero: Hero) => void
}

export default function HeroCard({
    hero,
    isSelected = false,
    onHeroSelection = () => {}
}: HeroCardProps) {
    return (
        <Card key={hero.name} onClick={() => onHeroSelection(hero)} style={{ borderWidth: isSelected ? 2 : 1, borderColor: isSelected ? "white" : "hsl(var(--border))" }}>
            <Image className="float-right" style={{ borderTopRightRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)" }} alt={hero.name} src={getHeroImage(hero.name)} height={200} width={200}></Image>
            <CardHeader>
                <div className="flex gap-2">
                    <CardTitle>{hero.name}</CardTitle>
                    <Image alt="hero-class" src={getClassImage(hero.class)} width={25} height={25} style={{ maxHeight: "25px" }}></Image>
                </div>
                {/* <CardDescription>Gen {hero.gen}</CardDescription> */}
            </CardHeader>
            <CardContent>
                <p>bla content</p>
            </CardContent>
            <CardFooter>
                <p>bla footer</p>
            </CardFooter>
        </Card>
    )
}