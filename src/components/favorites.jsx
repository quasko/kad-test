import React from "react";
import { Heading } from "@shopify/polaris";
import uniqueId from "lodash/uniqueId";
import { useSelector } from "react-redux";
import WeatherCard from "./weather-card.jsx";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const cards = favorites.map((favorite) => (
    <WeatherCard
      key={uniqueId()}
      city={{ name: favorite.name, temp: favorite.temp, isFavorite: true }}
    />
  ));
  return (
    <>
      <Heading>Favorite Cities</Heading>
      <div>{cards}</div>
    </>
  );
};

export default Favorites;
