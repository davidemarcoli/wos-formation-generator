import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getClassImage, getHeroImage, HEROES } from "@/lib/heroes"
import Image from "next/image"

export default function BearFormation() {

    return (
        <div className="flex flex-col h-screen w-full p-16">
            <h1 className="text-4xl text-center">
                Heroes
            </h1>

            {Object.entries(Object.groupBy(HEROES, ({ gen }) => gen)).map(([gen, heroes]) =>
                <div key={'gen' + gen}>
                    <h2 className="text-2xl mt-12">Gen {gen}</h2>

                    <div className="grid grid-cols-3 gap-4 mt-4">
                        {
                            heroes?.map(hero =>
                                <Card key={hero.name}>
                                    <Image className="float-right" style={{borderTopRightRadius: "var(--radius)", borderBottomRightRadius: "var(--radius)"}} alt={hero.name} src={getHeroImage(hero.name)} height={200} width={200}></Image>
                                    <CardHeader>
                                        <CardTitle className="flex gap-2">{hero.name} <Image alt="hero-class" src={getClassImage(hero.class)} width={25} height={25}></Image></CardTitle>
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
                    </div>
                </div>
            )}



        </div>
    )
}