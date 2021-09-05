import * as t from "../types";

const initialState = {
  data: null,
  games: null,
  isLoading: false,

  //ordering
  nameSort: null,
  realiseDateSort: null,
  platformsSort: [],
};

export const catalog = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_CATALOG:
      return {
        ...state,
        data: action.json,
        games: action.results,
      };

    case t.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case t.ADD_GAMES:
      return {
        ...state,
        data: action.json,
        games: action.games,
      };

    default:
      return { ...state };
  }
};
