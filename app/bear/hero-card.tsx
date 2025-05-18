import React from 'react';
import { getClassImage, Hero, IMAGES_BASE_PATH } from "@/lib/heroes";
import {
    Card,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star, X, ThumbsUp } from "lucide-react";

interface HeroCardProps {
    hero: Hero;
    isSelected?: boolean;
    isRecommended?: boolean;
    onHeroSelection?: (hero: Hero) => void;
    onHeroStarSelection?: (stars: number) => void;
}

export default function HeroCard({
    hero,
    isSelected = false,
    isRecommended = false,
    onHeroSelection,
    onHeroStarSelection
}: HeroCardProps) {
    const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target as Element;
        if (onHeroSelection && !target.closest('.star-rating')) {
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
            className={`flex flex-col sm:flex-row overflow-hidden ease-linear transition-all duration-300 ${isSelected ? 'ring-2 ring-black dark:ring-white' : 'ring-1 ring-border'
                }`}
            key={hero.name}
            onClick={handleCardClick}
        >
            <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <div className="flex items-center gap-2">
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

                </div>
                {isRecommended && (
                    <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit mb-3 sm:mb-0">
                        <ThumbsUp size={12} />
                        Recommended
                    </div>
                )}
                <div className="flex items-center star-rating" onClick={(e) => e.stopPropagation()}>
                    {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                            key={starIndex}
                            className={`w-5 h-5 transition-all duration-300 ease-in-out ${onHeroStarSelection ? 'cursor-pointer hover:scale-110 hover:rotate-12' : ''
                                } ${(hero.stars || 0) >= starIndex
                                    ? 'text-cyan-400 scale-110 rotate-12'
                                    : 'text-gray-600 scale-100 rotate-0'
                                }`}
                            fill={(hero.stars || 0) >= starIndex ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth={2}
                            onClick={() => handleStarClick(starIndex)}
                        />
                    ))}
                    <div className="relative w-5 h-5 ml-2 flex items-center justify-center">
                        <X
                            className={`absolute cursor-pointer text-gray-400 hover:text-white transition-all duration-300 ease-in-out
                                ${(hero.stars || 0) > 0 && onHeroStarSelection
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-75 pointer-events-none'
                                }`}
                            onClick={() => onHeroStarSelection && onHeroStarSelection(0)}
                            size={20}
                        />
                    </div>
                </div>
            </div>
            <div className="relative w-full sm:w-40 h-40">
                {hero.imagePath && (
                    <Image
                        className="object-cover object-[center_25%] rounded-b-lg sm:rounded-r-lg sm:rounded-bl-none"
                        alt={hero.name}
                        src={IMAGES_BASE_PATH + hero.imagePath}
                        fill
                        sizes="(max-width: 640px) 100vw, 160px"
                        priority
                    />
                )}
            </div>
        </Card>
    );
}