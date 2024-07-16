import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";

export const Favorites = ({ onClose }) => {
  const { store, actions } = useContext(Context);

  return (
    <div className="favorites-card">
      <div className="favorites-header">
        <h3>Favorites</h3>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      <ul>
        {store.favorites.length > 0 ? (
          store.favorites.map((item) => (
            <li key={item.uid}>
              {item.name}
              <button 
                className="remove-favorite"
                onClick={() => actions.removeFavorite(item)}
              >
                X
              </button>
            </li>
          ))
        ) : (
          <li>No favorites selected.</li>
        )}
      </ul>
    </div>
  );
};