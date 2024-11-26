// StateContext.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  transferredVideos: [], // { filename: string, url: string }
  totalPoints: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_VIDEO':
      return {
        ...state,
        transferredVideos: [...state.transferredVideos, action.payload],
        totalPoints: state.totalPoints + 5,
      };
    default:
      return state;
  }
};

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
