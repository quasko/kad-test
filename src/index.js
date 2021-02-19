import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import axios from "axios";
import reducers from "./reducers";
import * as actions from "./actions";
import App from "./components/app.jsx";
import { getWeatherByCityUrl, getWeatherByCordsUrl } from "./routes";

const initApp = async () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  const geo = navigator.geolocation;

  const onSuccessGet = async (pos) => {
    const { latitude, longitude } = pos.coords;
    const { data } = await axios.get(getWeatherByCordsUrl(latitude, longitude));

    const {
      name,
      main: { temp },
    } = data;

    store.dispatch(actions.setCurrentCity({ name, temp: Math.floor(temp) }));
  };

  geo.getCurrentPosition(onSuccessGet, (err) => console.log(err), {
    timeout: 20000,
  });

  const favorites = JSON.parse(localStorage.getItem("favorites"));

  const favoritesPromises = favorites.map(({ name }) =>
    axios.get(getWeatherByCityUrl(name))
  );

  const data = await Promise.all(favoritesPromises);

  const newFavorites = data.map(({ data }) => {
    const {
      name,
      main: { temp },
    } = data;
    return { name, temp: Math.floor(temp) };
  });

  store.dispatch(actions.setFavorites({ favorites: newFavorites }));

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

initApp();
