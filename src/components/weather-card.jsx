import React from "react";
import { CalloutCard } from "@shopify/polaris";
import { useDispatch } from "react-redux";
import { addToFavorites, deleteFromFavorites } from "../actions";

const WeatherCard = ({ city }) => {
  const { name, temp, isFavorite } = city;
  const dispatch = useDispatch();
  return (
    <CalloutCard
      title={`Weather today in ${name} is ${temp > 0 ? `+${temp}` : temp}C`}
      primaryAction={{
        content: isFavorite ? "Delete from favorites" : "Add to favorites",
        onAction: () => {
          if (isFavorite) {
            dispatch(deleteFromFavorites({ name }));
            return;
          }
          dispatch(addToFavorites({ name, temp }));
        },
      }}
    ></CalloutCard>
  );
};

export default WeatherCard;
