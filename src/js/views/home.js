import React from "react";
import { Card } from "../component/card";
import "../../styles/index.css";

export const Home = () => {
  return (
    <div>
      <div className="container">
        <h1 className="text-center mb-4">People</h1>
        <Card type="people" />

        <h1 className="text-center mb-4 mt-5">Planets</h1>
        <Card type="planets" />

        <h1 className="text-center mb-4 mt-5">Vehicles</h1>
        <Card type="vehicles" />
      </div>
    </div>
  );
};