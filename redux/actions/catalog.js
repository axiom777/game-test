import * as t from "../types";

const URL = "http://localhost:3000/api/games";

export const setCatalog = () => async (dispatch) => {
  const params = [];
  const url = `${URL}?${params.join("&")}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const { games, seo_title, next } = json;
    dispatch({ type: t.SET_CATALOG, games, seo_title, next });
  } catch (e) {
    console.error(e);
  }
};

export const getNewPage = () => async (dispatch, getState) => {
  const { isLoading, games: oldGames, next: curNext } = getState().catalog;
  if (isLoading && !curNext) return;
  dispatch(setIsLoading(true));
  try {
    console.log(isLoading, oldGames, curNext);
    const response = await fetch(curNext);
    const json = await response.json();
    const { games: newGames, next } = json;
    const games = oldGames.concat(newGames);
    dispatch({ type: t.ADD_GAMES, games, next });
    dispatch(setIsLoading(false));
  } catch (e) {
    console.error(e);
  }
};

export const setIsLoading = (isLoading) => (dispatch) => {
  dispatch({ type: t.SET_IS_LOADING, isLoading });
};

export const sortToggle = () => (dispatch, getState) => {
  const { nameSort } = getState().catalog;
  if (nameSort === null) dispatch({ type: t.TOGGLE_NAME_SORT, nameSort: true });
  if (nameSort === true)
    dispatch({ type: t.TOGGLE_NAME_SORT, nameSort: false });
  if (nameSort === false)
    dispatch({ type: t.TOGGLE_NAME_SORT, nameSort: null });
  dispatch({ type: t.RESET_RELEASE_SORT });
};

export const releaseToggle = () => (dispatch, getState) => {
  const { releaseDateSort: rds } = getState().catalog;
  if (rds === null)
    dispatch({ type: t.TOGGLE_RELEASE_SORT, releaseDateSort: true });
  if (rds === true)
    dispatch({ type: t.TOGGLE_RELEASE_SORT, releaseDateSort: false });
  if (rds === false)
    dispatch({ type: t.TOGGLE_RELEASE_SORT, releaseDateSort: null });
  dispatch({ type: t.RESET_NAME_SORT });
};
