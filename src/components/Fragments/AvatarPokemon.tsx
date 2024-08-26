import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { pokemon, setPokemon } from "../../redux/slices/pokemonSlice";
import { setPokemon, pokemon } from '../../redux/reducers/pokemonReducer';

interface Stat {
    base_stat: number;
    stat: {
        name: string;
    };
}

interface OtherSprites {
    dream_world: {
        front_default: string;
    };
    showdown: {
        front_default: string;
    };
}

interface Sprites {
    front_default: string;
    other: OtherSprites;
}

export interface Pokemon {
    sprite: string;
    name: string;
    other: Sprites;
    stats: Stat[];
}

interface AvatarPokemonProps {
    addToTeam: (pokemon: Pokemon) => void;
    team: Pokemon[];
}

const AvatarPokemon = ({ addToTeam, team }: AvatarPokemonProps) => {
    const dispatch = useDispatch();
    const pokemonList: Pokemon[] = useSelector(pokemon);

    // const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const limit = 20;
                const offset = (currentPage - 1) * limit;
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
                const data = await response.json();

                setTotalPages(Math.ceil(data.count / limit));

                const pokemonData = await Promise.all(
                    data.results.map(async (poke: { url: string }) => {
                        const pokemonResponse = await fetch(poke.url);
                        const pokemonDetail = await pokemonResponse.json();
                        return {
                            sprite: pokemonDetail.sprites.front_default,
                            name: pokemonDetail.name,
                            other: pokemonDetail.sprites,
                            stats: pokemonDetail.stats,
                        } as Pokemon;
                    })
                );
                // setPokemon(pokemonData);
                dispatch(setPokemon(pokemonData));
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };
        fetchPokemonData();
    }, [currentPage, dispatch]);

    const handleOpenModal = (poke: Pokemon) => {
        setSelectedPokemon(poke);
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    return (
        <>
            <div className="flex flex-wrap justify-center">
                {pokemonList.map((poke, index) => {
                    const isSelected = team.some(p => p.name === poke.name);
                    return (
                        <div key={index} className="relative w-24 h-24 m-1">
                            <div
                                className={`w-24 h-24 p-3 overflow-hidden border border-gray-300 shadow-lg ${isSelected ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                                onClick={() => !isSelected && addToTeam(poke)}
                            >
                                <img
                                    src={poke.sprite}
                                    alt={poke.name}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p
                                className="absolute bottom-0 left-0 w-full text-xs font-semibold text-center p-1 cursor-pointer hover:text-blue-500"
                                onClick={() => handleOpenModal(poke)}
                            >
                                {poke.name}
                            </p>

                            {isSelected && (
                                <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center bg-black bg-opacity-50 text-white text-sm">
                                    Selected
                                </span>
                            )}
                        </div>
                    );
                })}

                <div className="join mt-4 flex justify-center lg:justify-start">
                    <button
                        className="join-item btn"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    <button className="join-item btn">Page {currentPage}</button>
                    <button
                        className="join-item btn"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        »
                    </button>
                </div>

                {/* Modal */}
                {selectedPokemon && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="modal-box">
                            <div className="relative flex justify-center">
                                <img
                                    src={selectedPokemon.other.other.dream_world.front_default}
                                    alt={selectedPokemon.name}
                                    className="opacity-60"
                                />
                                <div className="absolute bottom-0 left-0">
                                    <img
                                        className="w-15 h-30"
                                        src={selectedPokemon.other.other.showdown.front_default}
                                        alt={selectedPokemon.name}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-center">
                                    <div className="rating flex justify-center items-center mt-3 w-24">
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                        <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                    </div>
                                </div>

                                <p className="font-bold mb-4 text-center text-sm">{selectedPokemon.name}</p>
                                {/* <p className="font-bold mt-4 mb-2 text-sm">
                                    Stats
                                </p> */}
                            </div>
                            <div className="flex flex-wrap gap-4 mb-2">
                                {selectedPokemon.stats.map((stat, index) => (
                                    <div key={index} className="flex-1 min-w-[200px]">
                                        <div className="flex justify-between mb-2 shadow-md py-1 px-2">
                                            <span className="font-bold text-sm text-left">
                                                {stat.stat.name}
                                            </span>
                                            <span className="font-bold text-sm text-right">
                                                {stat.base_stat}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                >
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.5 8.046H11V6.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49c.624.556 1.524.027 1.524-.893v-1.928h2a3.023 3.023 0 0 1 3 3.046V19a5.593 5.593 0 0 0-1.5-10.954Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default AvatarPokemon;
