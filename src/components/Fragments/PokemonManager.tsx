import AvatarPokemon from "./AvatarPokemon";
import { Pokemon } from "./AvatarPokemon";

interface PokemonManagerProps {
    addToTeam: (pokemon: Pokemon) => void;
    team: Pokemon[];
}

const PokemonManager: React.FC<PokemonManagerProps> = ({ addToTeam, team }) => {
    return (
        <>
            <AvatarPokemon addToTeam={addToTeam} team={team} />
        </>
    );
};

export default PokemonManager;
