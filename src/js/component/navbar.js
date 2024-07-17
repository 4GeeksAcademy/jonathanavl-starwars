import React, { useState } from "react";
import logo from "../../img/star-wars.png";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import soldado from "../../img/soldado.png";
import { Favorites } from "./favorites";

export const Navbar = () => {
    const [showFavorites, setShowFavorites] = useState(false);

    return (
        <nav className="navbar dark">
            <Link to="/" className="navbar-logo">
            <img
                src={logo}
                width="200"
                height="auto"
                className=""
            />
        </Link>
            <div className="ml-auto">
                <button className="fav-button" onClick={() => setShowFavorites(!showFavorites)}>
                    Favorites <img src={soldado} width="25" height="auto" className=""/>
                </button>
            </div>
            {showFavorites && <Favorites onClose={() => setShowFavorites(false)} />}
        </nav>
    );
};
