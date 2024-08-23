import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../../components/Fragments/AvatarPokemon";

interface PokemonState {
    pokemon: Pokemon[];
}

const initialState: PokemonState = {
    pokemon: [],
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        addPokemon: (state, action: PayloadAction<Pokemon>) => {
            state.pokemon.push(action.payload);
        },
        removePokemon: (state, action: PayloadAction<string>) => {
            state.pokemon = state.pokemon.filter(p => p.name !== action.payload);
        },
        setPokemon: (state, action: PayloadAction<Pokemon[]>) => {
            state.pokemon = action.payload;
        }
    },
});

export const { addPokemon, removePokemon, setPokemon } = pokemonSlice.actions;
// Selector to get Pokémon data
export const pokemon = (state: { pokemonList: PokemonState }) => state.pokemonList.pokemon;
export default pokemonSlice.reducer;
