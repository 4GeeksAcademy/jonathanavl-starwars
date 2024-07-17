import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "../../styles/index.css";
import soldado from "../../img/soldado.png";
import { Context } from "../store/appContext";

export const Cardinfo = () => {
    const { uid, type } = useParams();
    const { actions, store } = useContext(Context);
    const [item, setItem] = useState(null);
    const [description, setDescription] = useState("Loading...");
    const [imageLoaded, setImageLoaded] = useState(false);

    const getImageCategory = (type) => {
        const categoryMap = {
            'people': 'characters',
            'planets': 'planets',
            'vehicles': 'vehicles',
            'starships': 'starships',
            'species': 'species'
        };
        return categoryMap[type] || type;
    };

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

    const addToFavorites = () => {
        const itemToAdd = {
            ...item,
            uid: uid,
            type: type
        };
        actions.addFavorite(itemToAdd);
    };

    const removeFromFavorites = () => {
        const itemToRemove = {
            ...item,
            uid: uid,
            type: type
        };
        actions.removeFavorite(itemToRemove);
    };

    if (!item) {
        return <div>Loading...</div>;
    }

    const renderDetails = () => {
        return Object.entries(item).map(([key, value]) => {
            if (key === 'name' || key === 'url') return null;
            const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            if (Array.isArray(value)) {
                value = value.join(', ');
            }
            return (
                <div key={key} className="attribute">
                    <strong>{formattedKey}:</strong> {value}
                </div>
            );
        });
    };

    const imageUrl = `https://starwars-visualguide.com/assets/img/${getImageCategory(type)}/${uid}.jpg`;

    // Determine if the current item is in favorites
    const isInFavorites = store.favorites.some(fav => fav.uid === item.uid);

    return (
        <div className="container mt-3 card-info-container">
            <div className="row">
                <div className="col-md-6">
                    {!imageLoaded && <div>Loading image...</div>}
                    <img
                        src={imageUrl}
                        alt={item.name}
                        className={`img-fluid rounded ${imageLoaded ? '' : 'd-none'}`}
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => {
                            console.error(`Failed to load image: ${imageUrl}`);
                            e.target.onerror = null;
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                            setImageLoaded(true);
                        }}
                    />
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div>
                        <h2 className="text-warning">{item.name}</h2>
                        <p>{description}</p>
                    </div>
                    <div>
                        <h3>Attributes</h3>
                        <div className="attributes-container">
                            {renderDetails()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};