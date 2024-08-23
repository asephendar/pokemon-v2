import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice, { pokemon } from "./slices/pokemonSlice";

const store = configureStore({
    reducer: { 
        pokemonList: pokemonSlice,
    },
});

console.log("Initial Pokémon Data:", pokemon(store.getState()));

store.subscribe(() => {
    console.log("Updated Pokémon Data:", pokemon(store.getState()));
});

export default store;
