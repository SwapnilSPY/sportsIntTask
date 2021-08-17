import React, { useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = () => {
    const [playerList, setPlayerList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [filteredText, setFilteredText] = useState("");

    useEffect(() => {
        fetchPlayerList();
    }, []);

    const fetchPlayerList = async () => {
        const res = await fetch('https://api.npoint.io/20c1afef1661881ddc9c');
        const { playerList = [] } = await res.json();
        const sortedList = playerList.sort((firstEl, secondEl) => {
            const firstVal = Number(firstEl.Value);
            const secondVal = Number(secondEl.Value);
            return firstVal < secondVal ? -1 : (firstVal > secondVal ? 1 : 0)
        });
        setPlayerList(sortedList);
    }

    const handleChangeSearch = (value) => {
        setFilteredText(value);
        const filteredList = getFilteredList(value);
        setFilteredList(filteredList);
    }

    const getFilteredList = (value) => {
        return playerList.filter((player) => {
            const tName = player.TName.toLowerCase();
            const pfName = player.PFName.toLowerCase();
            const newValue = value.toLowerCase();
            return tName.includes(newValue) || pfName.includes(newValue)
        })
    }

    const renderedList = filteredText ? filteredList : playerList;
    return (
        <div>
            <h1 className="player-list-heading">Player List</h1>
            <input className="filter-input"
                type="text" placeholder="Search for a player..."
                value={filteredText} tabIndex="0"
                onChange={(e) => handleChangeSearch(e.target.value)}
                autoComplete="off" autoCorrect="off" spellCheck="off"
            />
            <div className="player-list-wrapper">
                {renderedList.length > 0 ?
                    <React.Fragment>
                        {renderedList.map((player, index) => {
                            return (
                                <PlayerCard playerInfo={player} key={`player_${index}`} />
                            )
                        })}
                    </React.Fragment> :
                    <p className="no-player-el">No player found</p>
                }

            </div>
        </div>
    );
};

export default PlayerList;