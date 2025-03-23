"use client"

import React, {useState, useEffect} from 'react';
import { ChevronDown, ChevronUp, Edit, Save, Trash, Plus } from 'lucide-react';
import {Hero, HeroClass, HEROES, HeroRarity} from "@/lib/heroes";

const initialHeroes = HEROES

const HeroEditor = () => {
    const [heroes, setHeroes] = useState<Hero[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    // @ts-expect-error - Edit form is dynamic
    const [editForm, setEditForm] = useState<Hero>({});
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [classFilter, setClassFilter] = useState<number>(-1);
    const [blankValuesAtBottom, setBlankValuesAtBottom] = useState(true);
    const [newHero, setNewHero] = useState<Hero>({
        name: '',
        class: HeroClass.INFANTRY,
        imagePath: '',
        rank: 10,
        gen: 0,
        rarity: HeroRarity.RARE,
        isRallyHero: false,
        rallyHeroRank: 0,
        isLeader: false,
        leaderRank: 0
    });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        // Initialize with the data
        setHeroes(initialHeroes);
    }, []);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getSortedHeroes = () => {
        if (!sortField) return heroes;

        return [...heroes].sort((a, b) => {
            // @ts-expect-error - Sort field is dynamic
            let aValue = a[sortField];
            // @ts-expect-error - Sort field is dynamic
            let bValue = b[sortField];

            if (a.name == "Greg") {
                console.log(aValue)
            }

            const isRankField = ['rank', 'rallyHeroRank', 'leaderRank'].includes(sortField);
            const aIsBlank = aValue === undefined || aValue === null || aValue === '' || (isRankField && aValue === 0);
            const bIsBlank = bValue === undefined || bValue === null || bValue === '' || (isRankField && bValue === 0);

            // If placing blank values at bottom is enabled
            if (blankValuesAtBottom) {
                if (aIsBlank && !bIsBlank) return 1; // a goes to bottom
                if (!aIsBlank && bIsBlank) return -1; // b goes to bottom
                if (aIsBlank && bIsBlank) return 0; // both blank, keep original order
            }

            // For non-blank values, perform normal comparison
            if (!aIsBlank && !bIsBlank) {
                // For string values, convert to lowercase for comparison
                if (typeof aValue === 'string') {
                    aValue = aValue.toLowerCase();
                    bValue = bValue.toLowerCase();
                }

                // Return comparison based on sort direction
                if (sortDirection === 'asc') {
                    return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                } else {
                    return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                }
            }

            // Default case
            return 0;
        });
    };


    const getFilteredHeroes = () => {
        return getSortedHeroes().filter(hero => {
            // Text search filter
            const matchesSearch = hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hero.class.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
                hero.rarity.toString().toLowerCase().includes(searchTerm.toLowerCase());

            // Class filter
            const matchesClass = classFilter === -1 || +hero.class.toString() === classFilter;

            return matchesSearch && matchesClass;
        });
    };

    const handleEdit = (hero: Hero) => {
        setEditingId(hero.name);
        setEditForm({...hero});
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setEditForm(prev => ({
                ...prev,
                [name]: checked
            }));
        } else if (type === 'number') {
            setEditForm(prev => ({
                ...prev,
                [name]: parseInt(value) || 0
            }));
        } else {
            setEditForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleNewHeroChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setNewHero(prev => ({
                ...prev,
                [name]: checked
            }));
        } else if (type === 'number') {
            setNewHero(prev => ({
                ...prev,
                [name]: parseInt(value) || 0
            }));
        } else {
            setNewHero(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = () => {
        setHeroes(heroes.map(hero =>
            hero.name === editingId ? (editForm as Hero) : hero
        ));
        setEditingId(null);
    };

    const handleDelete = (heroName: string) => {
        if (confirm(`Are you sure you want to delete ${heroName}?`)) {
            setHeroes(heroes.filter(hero => hero.name !== heroName));
        }
    };

    const handleAddHero = () => {
        if (!newHero.name) {
            alert('Hero name is required!');
            return;
        }

        if (heroes.some(hero => hero.name === newHero.name)) {
            alert('A hero with this name already exists!');
            return;
        }

        const heroToAdd = {...newHero};

        // Add conditional fields
        if (heroToAdd.isRallyHero) {
            heroToAdd.rallyHeroRank = heroToAdd.rallyHeroRank || 1;
        }

        if (heroToAdd.isLeader) {
            heroToAdd.leaderRank = heroToAdd.leaderRank || 1;
        }

        setHeroes([...heroes, heroToAdd]);
        setNewHero({
            name: '',
            class: HeroClass.INFANTRY,
            imagePath: '',
            rank: 10,
            gen: 0,
            rarity: HeroRarity.RARE,
            isRallyHero: false,
            isLeader: false
        });
        setShowAddForm(false);
    };

    // Enhanced export function that uses enum references instead of raw values
    const copyToClipboard = () => {
        // Format each hero with proper enum references
        const formattedHeroes = heroes.map(hero => {
            let heroStr = `    {\n`;
            heroStr += `        name: "${hero.name}",\n`;
            heroStr += `        class: ${hero.class},\n`;
            if (hero.imagePath) {
                heroStr += `        imagePath: "${hero.imagePath}",\n`;
            }
            heroStr += `        rank: ${hero.rank},\n`;
            heroStr += `        gen: ${hero.gen},\n`;
            heroStr += `        rarity: ${hero.rarity}`;

            if (hero.isRallyHero) {
                heroStr += `,\n        isRallyHero: true`;
                if (hero.rallyHeroRank) {
                    heroStr += `,\n        rallyHeroRank: ${hero.rallyHeroRank}`;
                }
                if (hero.rallyHeroRequiredStars) {
                    heroStr += `,\n        rallyHeroRequiredStars: ${hero.rallyHeroRequiredStars}`;
                }
            }

            if (hero.isLeader) {
                heroStr += `,\n        isLeader: true`;
                if (hero.leaderRank) {
                    heroStr += `,\n        leaderRank: ${hero.leaderRank}`;
                }
            }

            // Add any custom functions if they exist (like isBestRallyHero)
            if (hero.isBestRallyHero) {
                heroStr += `,\n        ${hero.isBestRallyHero.toString()}`;
            }

            heroStr += `\n    }`;
            return heroStr;
        }).join(',\n');

        const heroData = `export const HEROES: Hero[] = [\n${formattedHeroes}\n]`;

        navigator.clipboard.writeText(heroData)
            .then(() => alert('Hero data copied to clipboard!'))
            .catch(err => console.error('Failed to copy data: ', err));
    };

    const renderClassOptions = () => (
        <>
            <option value={HeroClass.INFANTRY}>Infantry</option>
            <option value={HeroClass.LANCER}>Lancer</option>
            <option value={HeroClass.MARKSMEN}>Marksmen</option>
        </>
    );

    const renderRarityOptions = () => (
        <>
            <option value={HeroRarity.RARE}>Rare</option>
            <option value={HeroRarity.EPIC}>Epic</option>
            <option value={HeroRarity.LEGENDARY}>Legendary</option>
        </>
    );

    // Get count of heroes by class for the filter dropdown badges
    const getHeroCountByClass = (heroClass: number) => {
        if (heroClass === -1) {
            return heroes.length;
        }

        return heroes.filter(hero => +hero.class.toString() === heroClass).length;
    };

    return (
        <div className="max-w-full">
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Hero Editor</h1>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        <Plus size={16} className="mr-1"/> Add Hero
                    </button>
                    <button
                        onClick={copyToClipboard}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Export Data
                    </button>
                </div>
            </div>

            {showAddForm && (
                <div className="mb-6 p-4 border rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Add New Hero</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-1">Name*</label>
                            <input
                                type="text"
                                name="name"
                                value={newHero.name}
                                onChange={handleNewHeroChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Class</label>
                            <select
                                name="class"
                                value={newHero.class}
                                onChange={handleNewHeroChange}
                                className="w-full p-2 border rounded"
                            >
                                {renderClassOptions()}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1">Image Path</label>
                            <input
                                type="text"
                                name="imagePath"
                                value={newHero.imagePath}
                                onChange={handleNewHeroChange}
                                className="w-full p-2 border rounded"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Rarity</label>
                            <select
                                name="rarity"
                                value={newHero.rarity}
                                onChange={handleNewHeroChange}
                                className="w-full p-2 border rounded"
                            >
                                {renderRarityOptions()}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1">Rank</label>
                            <input
                                type="number"
                                name="rank"
                                value={newHero.rank}
                                onChange={handleNewHeroChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Generation</label>
                            <input
                                type="number"
                                name="gen"
                                value={newHero.gen}
                                onChange={handleNewHeroChange}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isRallyHero"
                                        checked={newHero.isRallyHero}
                                        onChange={handleNewHeroChange}
                                        className="mr-2"
                                    />
                                    Rally Hero
                                </label>
                            </div>

                            {newHero.isRallyHero && (
                                <div>
                                    <label className="block mb-1">Rally Hero Rank</label>
                                    <input
                                        type="number"
                                        name="rallyHeroRank"
                                        value={newHero.rallyHeroRank || 1}
                                        onChange={handleNewHeroChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <div className="mb-2">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isLeader"
                                        checked={newHero.isLeader}
                                        onChange={handleNewHeroChange}
                                        className="mr-2"
                                    />
                                    Leader
                                </label>
                            </div>

                            {newHero.isLeader && (
                                <div>
                                    <label className="block mb-1">Leader Rank</label>
                                    <input
                                        type="number"
                                        name="leaderRank"
                                        value={newHero.leaderRank || 1}
                                        onChange={handleNewHeroChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end space-x-2">
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="px-4 py-2 border rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleAddHero}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Add Hero
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-6">
                <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
                    {/* Search bar */}
                    <div className="w-full md:w-1/3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search heroes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-2 pl-8 border rounded"
                            />
                            <span className="absolute left-2 top-2.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </span>
                        </div>
                    </div>

                    {/* Class filter */}
                    <div className="w-full md:w-auto">
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setClassFilter(-1)}
                                className={`px-3 py-1.5 rounded-full border flex items-center ${
                                    classFilter === -1
                                        ? 'bg-blue-500 text-white border-blue-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                All <span
                                className="ml-1.5 bg-white text-blue-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">{getHeroCountByClass(-1)}</span>
                            </button>
                            <button
                                onClick={() => setClassFilter(HeroClass.INFANTRY)}
                                className={`px-3 py-1.5 rounded-full border flex items-center ${
                                    classFilter === HeroClass.INFANTRY
                                        ? 'bg-red-500 text-white border-red-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Infantry <span
                                className="ml-1.5 bg-white text-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">{getHeroCountByClass(HeroClass.INFANTRY)}</span>
                            </button>
                            <button
                                onClick={() => setClassFilter(HeroClass.LANCER)}
                                className={`px-3 py-1.5 rounded-full border flex items-center ${
                                    classFilter === HeroClass.LANCER
                                        ? 'bg-green-500 text-white border-green-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Lancer <span
                                className="ml-1.5 bg-white text-green-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">{getHeroCountByClass(HeroClass.LANCER)}</span>
                            </button>
                            <button
                                onClick={() => setClassFilter(HeroClass.MARKSMEN)}
                                className={`px-3 py-1.5 rounded-full border flex items-center ${
                                    classFilter === HeroClass.MARKSMEN
                                        ? 'bg-indigo-500 text-white border-indigo-600'
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }`}
                            >
                                Marksmen <span
                                className="ml-1.5 bg-white text-indigo-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">{getHeroCountByClass(HeroClass.MARKSMEN)}</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center">
                    <label className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={blankValuesAtBottom}
                                onChange={() => setBlankValuesAtBottom(!blankValuesAtBottom)}
                            />
                            <div
                                className={`w-10 h-5 ${blankValuesAtBottom ? 'bg-blue-500' : 'bg-gray-300'} rounded-full transition-colors`}></div>
                            <div
                                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${blankValuesAtBottom ? 'transform translate-x-5' : ''}`}></div>
                        </div>
                        <span className="ml-2 text-sm">Place blank values at bottom when sorting</span>
                    </label>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="p-2 border font-semibold text-left">Actions</th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('name')}
                        >
                            Name
                            {sortField === 'name' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('class')}
                        >
                            Class
                            {sortField === 'class' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('rank')}
                        >
                            Rank
                            {sortField === 'rank' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('gen')}
                        >
                            Gen
                            {sortField === 'gen' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('rarity')}
                        >
                            Rarity
                            {sortField === 'rarity' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('isRallyHero')}
                        >
                            Rally Hero
                            {sortField === 'isRallyHero' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('rallyHeroRank')}
                        >
                            Rally Rank
                            {sortField === 'rallyHeroRank' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('isLeader')}
                        >
                            Leader
                            {sortField === 'isLeader' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                        <th
                            className="p-2 border font-semibold text-left cursor-pointer"
                            onClick={() => handleSort('leaderRank')}
                        >
                            Leader Rank
                            {sortField === 'leaderRank' && (
                                sortDirection === 'asc' ? <ChevronUp size={14} className="inline ml-1"/> :
                                    <ChevronDown size={14} className="inline ml-1"/>
                            )}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {getFilteredHeroes().map(hero => (
                        <tr key={hero.name} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            {editingId === hero.name ? (
                                // Edit mode
                                <>
                                    <td className="p-2 border">
                                        <button
                                            onClick={handleSave}
                                            className="p-1 bg-green-500 rounded mr-1 hover:bg-green-600"
                                        >
                                            <Save size={16}/>
                                        </button>
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleChange}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <select
                                            name="class"
                                            value={editForm.class}
                                            onChange={handleChange}
                                            className="w-full p-1 border rounded"
                                        >
                                            {renderClassOptions()}
                                        </select>
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="number"
                                            name="rank"
                                            value={editForm.rank}
                                            onChange={handleChange}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="number"
                                            name="gen"
                                            value={editForm.gen}
                                            onChange={handleChange}
                                            className="w-full p-1 border rounded"
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        <select
                                            name="rarity"
                                            value={editForm.rarity}
                                            onChange={handleChange}
                                            className="w-full p-1 border rounded"
                                        >
                                            {renderRarityOptions()}
                                        </select>
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="checkbox"
                                            name="isRallyHero"
                                            checked={editForm.isRallyHero || false}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        {editForm.isRallyHero && (
                                            <input
                                                type="number"
                                                name="rallyHeroRank"
                                                value={editForm.rallyHeroRank || ''}
                                                onChange={handleChange}
                                                className="w-full p-1 border rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="p-2 border">
                                        <input
                                            type="checkbox"
                                            name="isLeader"
                                            checked={editForm.isLeader || false}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td className="p-2 border">
                                        {editForm.isLeader && (
                                            <input
                                                type="number"
                                                name="leaderRank"
                                                value={editForm.leaderRank || ''}
                                                onChange={handleChange}
                                                className="w-full p-1 border rounded"
                                            />
                                        )}
                                    </td>
                                </>
                            ) : (
                                // View mode
                                <>
                                    <td className="p-2 border">
                                        <button
                                            onClick={() => handleEdit(hero)}
                                            className="p-1 bg-blue-500 text-white rounded mr-1 hover:bg-blue-600"
                                        >
                                            <Edit size={16}/>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hero.name)}
                                            className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            <Trash size={16}/>
                                        </button>
                                    </td>
                                    <td className="p-2 border">{hero.name}</td>
                                    <td className="p-2 border">{hero.class}</td>
                                    <td className="p-2 border">{hero.rank}</td>
                                    <td className="p-2 border">{hero.gen}</td>
                                    <td className="p-2 border">{hero.rarity}</td>
                                    <td className="p-2 border">{hero.isRallyHero ? '✓' : ''}</td>
                                    <td className="p-2 border">{hero.rallyHeroRank || ''}</td>
                                    <td className="p-2 border">{hero.isLeader ? '✓' : ''}</td>
                                    <td className="p-2 border">{hero.leaderRank || ''}</td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 text-sm text-gray-600">
                Total Heroes: {heroes.length} | Filtered Heroes: {getFilteredHeroes().length}
            </div>
        </div>
    );
};

export default HeroEditor;