import { createAction } from "redux-actions";
import axios from "axios";
import capitalize from "lodash/capitalize";
import { getWeatherByCityUrl } from "../routes";

export const addToFavorites = createAction("FAVORITES_ADD");
export const setFavorites = createAction("FAVORITES_SET");
export const deleteFromFavorites = createAction("FROM_FAVORITES_DELETE");
export const setCurrentCity = createAction("CURRENT_CITY_SET");

export const changeCurrentCity = (name) => async (dispatch) => {
  try {
    const { data } = await axios.get(getWeatherByCityUrl(name));

    const {
      main: { temp },
    } = data;

    dispatch(
      setCurrentCity({ name: capitalize(name), temp: Math.floor(temp) })
    );
  } catch (e) {
    console.log(e);
  }
};
