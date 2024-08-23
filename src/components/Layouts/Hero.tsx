import { useState } from "react";
import PokemonManager from "../Fragments/PokemonManager";
import Tab from "./Tab";
import { Routes, Route, useLocation } from 'react-router-dom';
import BagManager from "../Fragments/BagManager";
import { Pokemon } from "../Fragments/AvatarPokemon";
import { Berry } from "../Fragments/AvatarBag";
import Navbar from "../Fragments/Navbar";

const Hero = () => {
    const [pokemonTeam, setPokemonTeam] = useState<Pokemon[]>([]);
    const [berryTeam, setBerryTeam] = useState<Berry[]>([]);
    const location = useLocation();
    

    const addToPokemonTeam = (pokemon: Pokemon) => {
        if (pokemonTeam.length < 5 && !pokemonTeam.some(p => p.name === pokemon.name)) {
            setPokemonTeam([...pokemonTeam, pokemon]);
        }
    };

    const addToBerryTeam = (berry: Berry) => {
        setBerryTeam([...berryTeam, berry]);
    };

    const removeFromPokemonTeam = (index: number) => {
        setPokemonTeam(pokemonTeam.filter((_, i) => i !== index));
    };

    const removeFromBerryTeam = (name: string) => {
        setBerryTeam(berryTeam.filter(berry => berry.name !== name));
    };

    // Tentukan jumlah yang unik
    const uniquePokemonTeam = Array.from(new Set(pokemonTeam.map(p => p.name)));
    const uniqueBerryTeam = Array.from(new Set(berryTeam.map(b => b.name)));

    const uniquePokemonCount = uniquePokemonTeam.length;
    const uniqueBerryCount = uniqueBerryTeam.length;

    // Tentukan tim mana yang akan ditampilkan langkah-langkahnya berdasarkan rute saat ini
    const currentTeam = location.pathname === "/bag" ? berryTeam : pokemonTeam;

    return (
        <>
            <Navbar
                pokemonCount={uniquePokemonCount}
                berryCount={uniqueBerryCount}
            />
            <div className="hero bg-base-200 px-4 lg:px-10 pb-2">
                <div className="hero-content flex-col lg:flex-row-reverse lg:px-10">
                    <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start">
                        <div className="flex justify-center items-center w-full">
                            <h1 className="text-3xl font-bold mb-4">
                                {location.pathname === "/bag" ? "Berry" : "Pokemon"}
                            </h1>
                        </div>
                        <Routes>
                            <Route path="/pokemon" element={<PokemonManager addToTeam={addToPokemonTeam} team={pokemonTeam} />} />
                            <Route path="/bag" element={<BagManager addToTeamBag={addToBerryTeam} teamBag={berryTeam} />} />
                            <Route path="*" element={<PokemonManager addToTeam={addToPokemonTeam} team={pokemonTeam} />} />
                        </Routes>
                    </div>
                    <div className="w-full lg:w-3/5 text-center lg:text-center">
                        {location.pathname !== "/bag" && (
                            <div className="my-4">
                                <ul className="steps">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <li
                                            key={index}
                                            className={`step ${index < currentTeam.length ? 'step-primary' : ''}`}
                                        ></li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <Tab
                            pokemonTeam={pokemonTeam}
                            berryTeam={berryTeam}
                            removeFromPokemonTeam={removeFromPokemonTeam}
                            removeFromBerryTeam={removeFromBerryTeam}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;
