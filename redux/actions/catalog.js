import * as t from "../types";

const URL = "https://api.rawg.io/api/";

export const setCatalog = () => async (dispatch, getState) => {
  const params = [];
  const { key } = getState().config;
  params.push(`key=${key}`);
  const url = `${URL}games?${params.join("&")}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const { results } = json;
    dispatch({ type: t.SET_CATALOG, json, results });
  } catch (e) {
    console.error(e);
  }
};

export const getNewPage = () => async (dispatch, getState) => {
  const { data, isLoading, games: oldGames } = getState().catalog;
  const { next } = data;
  if (isLoading && !next) return;

  dispatch(setIsLoading(true));
  try {
    const response = await fetch(next);
    const json = await response.json();
    const { results: newGames } = json;
    const games = oldGames.concat(newGames);
    dispatch({ type: t.ADD_GAMES, json, games });
    dispatch(setIsLoading(false));
  } catch (e) {
    console.error(e);
  }
};

export const setIsLoading = (isLoading) => (dispatch) => {
  dispatch({ type: t.SET_IS_LOADING, isLoading });
};
