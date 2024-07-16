import React, { useState } from "react";
import logo from "../../img/star-wars.png";
import "../../styles/index.css";
import soldado from "../../img/soldado.png";
import { Favorites } from "./favorites";

export const Navbar = () => {
    const [showFavorites, setShowFavorites] = useState(false);

    return (
        <nav className="navbar dark">
            <img
                src={logo}
                width="200"
                height="auto"
                className=""
            />
            <div className="ml-auto">
                <button className="fav-button" onClick={() => setShowFavorites(!showFavorites)}>
                    Favorites <img src={soldado} width="25" height="auto" className=""/>
                </button>
            </div>
            {showFavorites && <Favorites onClose={() => setShowFavorites(false)} />}
        </nav>
    );
};
