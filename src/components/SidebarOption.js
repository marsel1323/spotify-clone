import React from "react";
import "./SidebarOption.css";

function SidebarOption({option, Icon, selectPlaylist}) {
    return (
        <div className="sidebarOption" onClick={() => selectPlaylist(option.id)}>
            {Icon && <Icon className="sidebarOption__icon"/>}
            {Icon ? <h4>{option.name}</h4> : <p>{option.name}</p>}
        </div>
    );
}

export default SidebarOption;
