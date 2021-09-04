import * as t from "../types";

const URL = "https://api.rawg.io/api/";

export const setKey = (key) => (dispatch) => {
  dispatch({ type: t.SET_KEY, key });
};

export const setCatalog = () => async (dispatch, getState) => {
  const params = [];
  const { key } = getState().catalog;
  params.push(`key=${key}`);

  const url = `${URL}games?${params.join("&")}`;
  const response = await fetch(url);
  const json = await response.json();

  const { results } = json;

  dispatch({ type: t.SET_CATALOG, json, results });
};
