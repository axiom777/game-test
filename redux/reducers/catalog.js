import * as t from "../types";

const initialState = {
  games: null,
  isLoading: false,
  next: null,
  seo_title: "",

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
        games: action.games,
        next: action.next,
        seo_title: action.seo_title,
      };

    case t.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };

    case t.ADD_GAMES:
      return {
        ...state,
        games: action.games,
        next: action.next,
      };

    default:
      return { ...state };
  }
};
