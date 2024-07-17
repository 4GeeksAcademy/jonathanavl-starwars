import React, { useEffect, useContext, useRef } from "react";
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";
import "../../styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import soldado from "../../img/soldado.png";

export const Card = ({ type }) => {
  const { store, actions } = useContext(Context);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    if (type === "people" && store.people.length === 0) {
      actions.fetchPeople();
    } else if (type === "planets" && store.planets.length === 0) {
      actions.fetchPlanets();
    } else if (type === "vehicles" && store.vehicles.length === 0) {
      actions.fetchVehicles();
    }
  }, [type, actions, store.people.length, store.planets.length, store.vehicles.length]);

  const items = store[type] || [];

  const getImageUrl = (item) => {
    switch(type) {
      case 'people':
        return `https://starwars-visualguide.com/assets/img/characters/${item.uid}.jpg`;
      case 'planets':
        return `https://starwars-visualguide.com/assets/img/planets/${item.uid}.jpg`;
      case 'vehicles':
        return `https://starwars-visualguide.com/assets/img/vehicles/${item.uid}.jpg`;
      default:
        return 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
    }
  };

  const getAttributes = (item) => {
    switch (type) {
      case 'people':
        return `Gender: ${item.gender}, Hair Color: ${item.hair_color}, Eye Color: ${item.eye_color}`;
      case 'planets':
        return `Population: ${item.population}, Terrain: ${item.terrain}`;
      case 'vehicles':
        return `Model: ${item.model}, Manufacturer: ${item.manufacturer}`;
      default:
        return null;
    }
  };
  const isFavorite = (item) => {
    // Check if item is in favorites based on its type
    switch (type) {
      case 'people':
        return store.favorites.some(fav => fav.type === 'people' && fav.uid === item.uid);
      case 'planets':
        return store.favorites.some(fav => fav.type === 'planets' && fav.uid === item.uid);
      case 'vehicles':
        return store.favorites.some(fav => fav.type === 'vehicles' && fav.uid === item.uid);
      default:
        return false;
    }
  };
  const toggleFavorite = (item) => {
    // Toggle favorite status based on current status
    if (isFavorite(item)) {
      actions.removeFavorite(item);
    } else {
      actions.addFavorite(item);
    }
  };

  const scrollLeft = () => {
    cardContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    cardContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="carousel-container">
      <button className="scroll-button left" onClick={scrollLeft}>&lt;</button>
      <div className="card-wrap" ref={cardContainerRef}>
        {items.map((item) => {
          const isFavorite = store.favorites.some(fav => fav.uid === item.uid);

          return (
            <div className="card" key={item.uid}>
              <img
                src={getImageUrl(item)}
                className="card-img-top"
                alt={item.name}
                onError={(e) => { e.target.onerror = null; e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg" }}
              />
              <div className="card-body">
                <h2 className="card-title text-warning">{item.name}</h2>
                <p className="text-light">{getAttributes(item)}</p>
                <Link to={`/${type}/${item.uid}`}>
                  <button className="learn-more-button me-3">Learn more</button>
                </Link>
                <button
                  className={`fav-button ${isFavorite ? 'active' : ''}`}
                  onClick={() => isFavorite ? actions.removeFavorite(item) : actions.addFavorite(item)}
                >
                  <img src={soldado} width="20" height="auto" alt="Favorite" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="scroll-button right" onClick={scrollRight}>&gt;</button>
    </div>
  );
};