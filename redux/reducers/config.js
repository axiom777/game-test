import * as t from "../types";

const initialState = {
  key: null,
  isMobile: true,
};

export const config = (state = initialState, action) => {
  switch (action.type) {
    case t.SET_KEY:
      return { ...state, key: action.key };
    case t.SET_IS_MOBILE:
      return { ...state, isMobile: action.isMobile };
    default:
      return { ...state };
  }
};
