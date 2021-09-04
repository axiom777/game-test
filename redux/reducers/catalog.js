import * as t from "../types";

const initialState = {
  key: null,
  data: null,
  games: null,

  //ordering
  nameSort: null,
  realiseDateSort: null,
  platformsSort: [],
};

export const catalog = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_KEY:
      return { ...state, key: action.key };
    case t.SET_CATALOG:
      return {
        ...state,
        data: action.json,
        games: action.results,
      };
    default:
      return { ...state };
  }
};
