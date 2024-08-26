import { useState } from 'react';
import { Pokemon } from './AvatarPokemon';

interface TeamPokemonProps {
    team: Pokemon[];
    removeFromTeam: (index: number) => void;
}

const TeamPokemon = ({ team, removeFromTeam }: TeamPokemonProps) => {
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const handleOpenModal = (poke: Pokemon) => {
        setSelectedPokemon(poke);
    };

    const handleCloseModal = () => {
        setSelectedPokemon(null);
    };

    return (
        <>
            <div className="flex flex-wrap justify-center items-center gap-4">
                {team.map((poke, index) => (
                    <div key={index} className="relative rounded-lg shadow-lg p-2 w-36 h-28 flex flex-col items-center">
                        <img
                            src={poke.other.other.showdown.front_default}
                            alt={poke.name}
                            className="object-contain w-16 h-16 mb-2"
                        />
                        <p
                            className="text-sm font-semibold text-center hover:text-blue-500 cursor-pointer"
                            onClick={() => handleOpenModal(poke)}
                        >
                            {poke.name}
                        </p>
                        <div className="absolute top-1 right-3 flex space-x-1">
                            <button
                                onClick={() => removeFromTeam(index)}
                                className="hover:text-red-500"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
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
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.5 8.046H11V6.119c0-.921-.9-1.446-1.524-.894l-5.108 4.49a1.2 1.2 0 0 0 0 1.739l5.108 4.49c.624.556 1.524.027 1.524-.893v-1.928h2a3.023 3.023 0 0 1 3 3.046V19a5.593 5.593 0 0 0-1.5-10.954Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamPokemon;
