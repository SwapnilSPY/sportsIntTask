import React from 'react';
import moment from 'moment';

const PlayerCard = (props) => {
    const {
        PFName = "",
        Id = "",
        SkillDesc = "",
        Value = 0,
        UpComingMatchesList = []
    } = props?.playerInfo;
    const imgSrc = `/assets/images/${Id}.jpg`;
    const upcomingMatch = UpComingMatchesList[0];
    const {
        MDate = "",
        CCode = "-",
        VsCCode = "-"
    } = upcomingMatch ? upcomingMatch : {};
    const utcDate = moment.utc(MDate, "D/MM/YYYY h:mm:ss A");
    const formattedDate = utcDate.local().format("DD-MM-YYYY h:mm:ss a");
    const renderedDate = MDate && MDate !== "" ? formattedDate : "-";
    const vsString = upcomingMatch && CCode !== "" && VsCCode !== "" ? `${CCode} vs. ${VsCCode}` : "-";

    return (
        <div className="player-card-main">
            <img src={imgSrc} alt={`${PFName}'s profile`} className="player-card-img" />
            <p className="player-info player-card-name">{PFName}</p>
            {/* <p className="player-info player-card-name">{PFName} ({SkillDesc})</p> */}
            <p className="player-info">{SkillDesc}</p>
            <p className="player-info">${Value}</p>
            {<p className="player-info">{vsString}</p>}
            <p className="player-info">{renderedDate}</p>
        </div>
    );
};

export default PlayerCard;