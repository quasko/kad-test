import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import * as actions from "../actions";

const currentCity = handleActions(
  {
    [actions.setCurrentCity](state, { payload: { name, temp } }) {
      return { name, temp };
    },
  },
  null
);

const favorites = handleActions(
  {
    [actions.addToFavorites](state, { payload: { name, temp } }) {
      return [...state, { name, temp }];
    },
    [actions.deleteFromFavorites](state, { payload: { name } }) {
      return state.filter(({ name: itemName }) => itemName !== name);
    },
    [actions.setFavorites](state, { payload: { favorites } }) {
      return [...favorites];
    },
  },
  []
);

export default combineReducers({
  currentCity,
  favorites,
});
