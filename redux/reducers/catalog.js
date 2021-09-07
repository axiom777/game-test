import * as t from "../types";

const initialState = {
  games: null,
  isLoading: false,
  next: null,
  seo_title: "",

  //ordering
  nameSort: null,
  releaseDateSort: null,
  platformsSort: {
    4: { name: "PC", active: false },
    1: { name: "Xbox One", active: false },
    14: { name: "Xbox 360", active: false },
    18: { name: "PlayStation 4", active: false },
    187: { name: "PlayStation 5", active: false },
    186: { name: "Xbox Series S/X", active: false },
  },
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

    case t.TOGGLE_NAME_SORT:
      return { ...state, nameSort: action.nameSort };

    case t.RESET_NAME_SORT:
      return { ...state, nameSort: null };

    case t.TOGGLE_RELEASE_SORT:
      return { ...state, releaseDateSort: action.releaseDateSort };

    case t.RESET_RELEASE_SORT:
      return { ...state, releaseDateSort: null };

    case t.CHANGE_PLATFORM:
      return { ...state, platformsSort: action.platformsSort };

    default:
      return { ...state };
  }
};
