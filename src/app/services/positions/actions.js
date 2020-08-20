import * as actionTypes from "./actionTypes";

export const setElementPosition = newPositions => async dispatch => {
  window.localStorage.setItem("positions", JSON.stringify(newPositions));

  dispatch({
    type: actionTypes.SET_POSITION,
    positions: newPositions
  });
};
