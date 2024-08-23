import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { Berry } from "../components/Fragments/AvatarBag";

interface BagContextType {
    bag: Berry[];
    setBag: React.Dispatch<React.SetStateAction<Berry[]>>;
    currentPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

export const BagProvider = ({ children }: { children: ReactNode }) => {
    const [bag, setBag] = useState<Berry[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchBagData = async () => {
            try {
                const limit = 12;
                const offset = (currentPage - 1) * limit;
                const response = await fetch(`https://pokeapi.co/api/v2/berry?limit=${limit}&offset=${offset}`);
                const data = await response.json();

                setTotalPages(Math.ceil(data.count / limit));

                const bagData = await Promise.all(
                    data.results.map(async (berry: { url: string }) => {
                        const berryResponse = await fetch(berry.url);
                        const berryDetails = await berryResponse.json();

                        const itemResponse = await fetch(berryDetails.item.url);
                        const itemDetails = await itemResponse.json();

                        return {
                            name: berryDetails.name,
                            item: {
                                name: itemDetails.name,
                                url: itemDetails.url,
                                image: itemDetails.sprites.default,
                                effect_entries: itemDetails.effect_entries,
                            },
                            firmness: berryDetails.firmness.name,
                            flavors: berryDetails.flavors,
                            natural_gift_type: berryDetails.natural_gift_type.name,
                            natural_gift_power: berryDetails.natural_gift_power,
                            dailyLimit: 10,
                        } as Berry;
                    })
                );
                setBag(bagData);
            } catch (error) {
                console.error("Error fetching bag data:", error);
            }
        };

        fetchBagData();
    }, [currentPage]);

    return (
        <BagContext.Provider value={{ bag, setBag, currentPage, totalPages, setCurrentPage }}>
            {children}
        </BagContext.Provider>
    );
};

export const useBag = (): BagContextType => {
    const context = useContext(BagContext);
    if (!context) {
        throw new Error("useBag harus digunakan di dalam BagProvider");
    }
    return context;
    // return context || { bag: [], setBag: () => {}, currentPage: 1, totalPages: 1, setCurrentPage: () => {} };
};
