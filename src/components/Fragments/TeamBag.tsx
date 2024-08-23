import { useState } from 'react';
import { Berry } from './AvatarBag';

interface TeamBagProps {
    teamBag: Berry[];
    removeFromTeamBag: (name: string) => void;
}

const TeamBag: React.FC<TeamBagProps> = ({ teamBag, removeFromTeamBag }) => {
    const [selectedBerry, setSelectedBerry] = useState<Berry | null>(null);

    const berryCounts = teamBag.reduce((acc, berry) => {
        acc[berry.name] = (acc[berry.name] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const handleBerryClick = (berry: Berry) => {
        setSelectedBerry(berry);
    };

    const handleCloseModal = () => {
        setSelectedBerry(null);
    };

    return (
        <>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
                {Object.keys(berryCounts).map((berryName) => {
                    const berry = teamBag.find(b => b.name === berryName);
                    if (!berry) return null;

                    return (
                        <div key={berryName} className="relative w-24 h-20">
                            <div className="border border-gray-300 shadow-lg rounded-md p-2">
                                <p
                                    className="text-xs text-center font-semibold  cursor-pointer hover:text-blue-500"
                                    onClick={() => handleBerryClick(berry)}
                                >
                                    {berry.name}
                                </p>
                                <div className="flex justify-center items-center mt-1">
                                    <img
                                        src={berry.item.image}
                                        alt={berry.item.name}
                                        className="object-cover w-8 h-8 rounded-full"
                                    />
                                </div>
                                <p className="text-xs text-center">{berryCounts[berryName]}</p>
                            </div>
                            <button
                                className="absolute top-1 right-2 text-xs hover:text-red-500"
                                onClick={() => removeFromTeamBag(berryName)}
                            >
                                ✕
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            {selectedBerry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="modal-box relative p-4 rounded-md shadow-lg">
                        <div className="relative flex justify-center">
                            <img
                                src={selectedBerry.item.image}
                                alt={selectedBerry.name}
                                className="object-cover w-10 h-10 rounded-full"
                            />
                        </div>
                        <div className="flex justify-center">
                            <p className="text-sm mb-2 font-bold">{selectedBerry.name}</p>
                        </div>
                        <div className="flex flex-col items-center mb-4">
                            {selectedBerry.item.effect_entries.map((entry, index) => (
                                <p key={index} className="text-sm text-center mb-1">{entry.effect}</p>
                            ))}
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-1 right-3 text-xl hover:text-red-500"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default TeamBag;

