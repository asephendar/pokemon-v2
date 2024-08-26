// src/redux/store.ts
import { createStore, combineReducers } from 'redux';
import { pokemonReducer } from './reducers/pokemonReducer';

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
});

const store = createStore(rootReducer);

console.log("Initial Pokémon Data:", store.getState().pokemon);

store.subscribe(() => {
    console.log("Updated Pokemon Data:", store.getState().pokemon);
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
