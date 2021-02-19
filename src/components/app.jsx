import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "@shopify/polaris/dist/styles.css";
import { AppProvider, Layout, Page } from "@shopify/polaris";
import Form from "./form.jsx";
import WeatherCard from "./weather-card.jsx";
import Favorites from "./favorites.jsx";

const App = () => {
  const { currentCity, favorites } = useSelector((state) => {
    const { currentCity, favorites } = state;
    return { currentCity, favorites };
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isCurrentCityFavorite =
    currentCity && favorites.some(({ name }) => name === currentCity.name);

  return (
    <div style={{ width: "700px", marginLeft: "auto", marginRight: "auto" }}>
      <AppProvider>
        <Page>
          <Layout>
            <Layout.Section>
              {currentCity && (
                <WeatherCard
                  city={{ ...currentCity, isFavorite: isCurrentCityFavorite }}
                />
              )}
            </Layout.Section>
            <Layout.Section>
              <Form />
            </Layout.Section>
            <Layout.Section>
              {favorites.length > 0 && <Favorites />}
            </Layout.Section>
          </Layout>
        </Page>
      </AppProvider>
    </div>
  );
};

export default App;
