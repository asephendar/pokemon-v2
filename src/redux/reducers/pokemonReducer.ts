import { Pokemon } from '../../components/Fragments/AvatarPokemon';

// Extend PokemonState interface
export interface PokemonState {
    pokemonList: Pokemon[];
    currentPage: number;
    totalPages: number;
}

// Action interface
interface SetPokemonAction {
    type: 'SET_POKEMON';
    payload: Pokemon[];
}

interface SetCurrentPageAction {
    type: 'SET_CURRENT_PAGE';
    payload: number;
}

interface SetTotalPagesAction {
    type: 'SET_TOTAL_PAGES';
    payload: number;
}

// Combined action type
type PokemonActions = SetPokemonAction | SetCurrentPageAction | SetTotalPagesAction;

const initialState: PokemonState = {
    pokemonList: [],
    currentPage: 1,
    totalPages: 1,
};

// Action creators
export const setPokemon = (pokemonList: Pokemon[]) => ({
    type: 'SET_POKEMON',
    payload: pokemonList,
});

export const setCurrentPage = (page: number) => ({
    type: 'SET_CURRENT_PAGE',
    payload: page,
});

export const setTotalPages = (total: number) => ({
    type: 'SET_TOTAL_PAGES',
    payload: total,
});

// Reducer
export const pokemonReducer = (state = initialState, action: PokemonActions) => {
    switch (action.type) {
        case 'SET_POKEMON':
            return {
                ...state,
                pokemonList: action.payload,
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'SET_TOTAL_PAGES':
            return {
                ...state,
                totalPages: action.payload,
            };
        default:
            return state;
    }
};

// Selectors
export const pokemon = (state: { pokemon: PokemonState }) => state.pokemon.pokemonList;
export const CurrentPage = (state: { pokemon: PokemonState }) => state.pokemon.currentPage;
export const TotalPages = (state: { pokemon: PokemonState }) => state.pokemon.totalPages;