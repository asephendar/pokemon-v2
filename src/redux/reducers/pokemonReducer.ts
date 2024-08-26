import { Pokemon } from '../../components/Fragments/AvatarPokemon';

export interface PokemonState {
    pokemonList: Pokemon[];
}

const initialState: PokemonState = {
    pokemonList: [],
};

export const setPokemon = (pokemonList: Pokemon[]) => ({
    type: 'SET_POKEMON',
    payload: pokemonList,
});

export const pokemonReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_POKEMON':
            return {
                ...state,
                pokemonList: action.payload,
            };
        default:
            return state;
    }
};

export const pokemon = (state: { pokemon: PokemonState }) => state.pokemon.pokemonList;
