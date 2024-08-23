import TeamBag from "../Fragments/TeamBag";
import TeamPokemon from "../Fragments/TeamPokemon";
import { Pokemon } from '../Fragments/AvatarPokemon';
import { Berry } from '../Fragments/AvatarBag';

interface TabProps {
    pokemonTeam: Pokemon[];
    berryTeam: Berry[];
    removeFromPokemonTeam: (index: number) => void;
    removeFromBerryTeam: (name: string) => void;
}

const Tab: React.FC<TabProps> = ({ pokemonTeam, berryTeam, removeFromPokemonTeam, removeFromBerryTeam }) => {
    return (
        <>
            <div role="tablist" className="tabs tabs-lifted">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Pokemon" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
                    <TeamPokemon team={pokemonTeam} removeFromTeam={removeFromPokemonTeam} />
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Bag" />
                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-7 pt-1">
                    <TeamBag teamBag={berryTeam} removeFromTeamBag={removeFromBerryTeam} />
                </div>
            </div>
        </>
    );
};

export default Tab;
