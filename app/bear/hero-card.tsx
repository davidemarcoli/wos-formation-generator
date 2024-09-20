import React from 'react';
import { getClassImage, getHeroImage, Hero } from "@/lib/heroes";
import {
    Card,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star, X } from "lucide-react";

interface HeroCardProps {
    hero: Hero;
    isSelected?: boolean;
    onHeroSelection?: (hero: Hero) => void;
    onHeroStarSelection?: (stars: number) => void;
}

export default function HeroCard({
    hero,
    isSelected = false,
    onHeroSelection,
    onHeroStarSelection
}: HeroCardProps) {
    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (onHeroSelection && !event.target.closest('.star-rating')) {
            onHeroSelection(hero);
        }
    };

    const handleStarClick = (starIndex: number) => {
        if (onHeroStarSelection) {
            if (hero.stars === starIndex) {
                onHeroStarSelection(0);
            } else {
                onHeroStarSelection(starIndex);
            }
        }
    };

    return (
        <Card
            className={`flex flex-col sm:flex-row overflow-hidden transition-all duration-300 ${
                isSelected ? 'ring-2 ring-white' : 'ring-1 ring-border'
            }`}
            key={hero.name}
            onClick={handleCardClick}
        >
            <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg sm:text-xl">
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
                <div className="flex items-center star-rating" onClick={(e) => e.stopPropagation()}>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                            key={starIndex}
                            className={`w-5 h-5 transition-opacity duration-200 ${onHeroStarSelection ? 'cursor-pointer' : ''}`}
                            fill="white"
                            fillOpacity={(hero.stars || 0) >= starIndex ? 1 : 0}
                            onClick={() => handleStarClick(starIndex)}
                        />
                    ))}
                    <div className="relative w-5 h-5 ml-2">
                        <X
                            className={`absolute inset-0 cursor-pointer text-gray-400 hover:text-white transition-all duration-300 ease-in-out
                                ${hero.stars || 0 > 0 && onHeroStarSelection 
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-1 pointer-events-none'
                                }`}
                            onClick={() => onHeroStarSelection && onHeroStarSelection(0)}
                        />
                    </div>
                </div>
            </div>
            <div className="relative w-full sm:w-40 h-40">
                <Image
                    className="object-cover object-[center_25%] rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none"
                    alt={hero.name}
                    src={getHeroImage(hero.name)}
                    layout="fill"
                />
            </div>
        </Card>
    );
}