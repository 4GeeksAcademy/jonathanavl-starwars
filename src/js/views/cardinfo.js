import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";
import soldado from "../../img/soldado.png";

export const Cardinfo = () => {
    const { uid, type } = useParams();
    const [item, setItem] = useState(null);
    const [description, setDescription] = useState("Loading...");

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`https://www.swapi.tech/api/${type}/${uid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setItem(data.result.properties);
                setDescription(data.result.description);
            } catch (error) {
                console.error('Error fetching data from SWAPI', error);
                setDescription("Failed to load description.");
            }
        };
        fetchItem();
    }, [uid, type]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/${type}/${uid}.jpg`}
                        alt={item.name}
                        className="img-fluid rounded"
                        onError={(e) => {e.target.onerror = null; e.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"}}
                    />
                </div>
                <div className="col-md-8">
                    <h2>{item.name}</h2>
                    <p>{description}</p>
                    {/* Render other details based on the type (people, planets, vehicles) */}
                    {/* ... */}
                    <button className="fav-button mt-3">
                        <img src={soldado} width="20" height="auto" alt="Favorite" />
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
};