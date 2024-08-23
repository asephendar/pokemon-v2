import React from 'react';
import AvatarBag from "./AvatarBag";
import { Berry } from "./AvatarBag";

interface BagManagerProps {
    addToTeamBag: (berry: Berry) => void;
    teamBag: Berry[];
}

const BagManager: React.FC<BagManagerProps> = ({ addToTeamBag, teamBag }) => {
    return (
        <>
            <AvatarBag addToTeamBag={addToTeamBag} teamBag={teamBag}/>
        </>
    );
};

export default BagManager;
