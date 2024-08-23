import { useState } from "react";
import { useBag } from "../../contexts/BagContext";

interface EffectEntry {
    effect: string;
    short_effect: string;
}

interface Item {
    name: string;
    url: string;
    image: string;
    effect_entries: EffectEntry[];
}

export interface Berry {
    name: string;
    item: Item;
    firmness: string;
    dailyLimit: number;
}

interface AvatarBagProps {
    addToTeamBag: (berry: Berry) => void;
    teamBag: Berry[];
}

const AvatarBag = ({ addToTeamBag }: AvatarBagProps) => {
    const { bag, setBag, currentPage, totalPages, setCurrentPage } = useBag();
    const [selectedBerry, setSelectedBerry] = useState<Berry | null>(null);
    
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);

    // useEffect(() => {
    //     const fetchBagData = async () => {
    //         try {
    //             const limit = 12;
    //             const offset = (currentPage - 1) * limit;
    //             const response = await fetch(`https://pokeapi.co/api/v2/berry?limit=${limit}&offset=${offset}`);
    //             const data = await response.json();

    //             setTotalPages(Math.ceil(data.count / limit));

    //             const bagData = await Promise.all(
    //                 data.results.map(async (berry: { url: string }) => {
    //                     const berryResponse = await fetch(berry.url);
    //                     const berryDetails = await berryResponse.json();

    //                     const itemResponse = await fetch(berryDetails.item.url);
    //                     const itemDetails = await itemResponse.json();

    //                     return {
    //                         name: berryDetails.name,
    //                         item: {
    //                             name: itemDetails.name,
    //                             url: itemDetails.url,
    //                             image: itemDetails.sprites.default,
    //                             effect_entries: itemDetails.effect_entries
    //                         },
    //                         firmness: berryDetails.firmness.name,
    //                         flavors: berryDetails.flavors,
    //                         natural_gift_type: berryDetails.natural_gift_type.name,
    //                         natural_gift_power: berryDetails.natural_gift_power,
    //                         dailyLimit: 10,
    //                     } as Berry;
    //                 })
    //             );
    //             setBag(bagData);
    //         } catch (error) {
    //             console.error("Error fetching bag data:", error);
    //         }
    //     };
    //     fetchBagData();
    // }, [currentPage]);

    const handleOpenModal = (berry: Berry) => {
        setSelectedBerry(berry);
    };

    const handleCloseModal = () => {
        setSelectedBerry(null);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handleAddToTeamBag = (berry: Berry) => {
        if (berry.dailyLimit > 0) {
            const updatedBag = bag.map(b =>
                b.name === berry.name
                    ? { ...b, dailyLimit: b.dailyLimit - 1 }
                    : b
            );
            setBag(updatedBag);
            addToTeamBag(berry);
        }
    };

    return (
        <>
            <div className="flex flex-wrap justify-center">
                {bag.map((berry, index) => (
                    <div key={index} className="relative w-32 h-32 m-1">
                        <div className="w-32 h-32 overflow-hidden border border-gray-300 shadow-lg p-2 flex flex-col items-center">
                            <p
                                className="text-xs text-center mb-1 cursor-pointer hover:text-blue-500"
                                onClick={() => handleOpenModal(berry)}
                            >
                                {berry.name}
                            </p>
                            <div className="flex justify-center items-center mb-1">
                                <img
                                    src={berry.item.image}
                                    alt={berry.item.name}
                                    className="object-cover w-8 h-8"
                                />
                            </div>
                            <p className="text-xs text-center mb-2">
                                Limit Harian {berry.dailyLimit}/10
                            </p>
                            <button
                                className="btn btn-primary btn-xs"
                                onClick={() => handleAddToTeamBag(berry)}
                                disabled={berry.dailyLimit <= 0}
                            >
                                🧊 10.000
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="join mt-4 flex justify-center lg:justify-center">
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

export default AvatarBag;
