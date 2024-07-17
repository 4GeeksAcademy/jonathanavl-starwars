import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import '../../styles/index.css';
import soldado from "../../img/soldado.png";

export const Favorites = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="favorites-container">
      <h4>Favorites</h4>
      {store.favorites.length > 0 ? (
        store.favorites.map((item, index) => (
          <div key={index} className="favorites-item">
            <img src={soldado} alt={item.name} />
            <span>{item.name}</span>
            <button onClick={() => actions.removeFavorite(item)}>X</button>
          </div>
        ))
      ) : (
        <p>No favorites added yet</p>
      )}
    </div>
  );
};