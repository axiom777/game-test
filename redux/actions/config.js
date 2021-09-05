import * as t from "../types";

export const setKey = (key) => (dispatch) => {
  dispatch({ type: t.SET_KEY, key });
};

export const setIsMobile = (isMobile) => (dispatch) => {
  dispatch({ type: t.SET_IS_MOBILE, isMobile });
};
