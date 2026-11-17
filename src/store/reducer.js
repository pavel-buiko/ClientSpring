import {
  login,
  logout,
  loginError,
  searchTerm,
  setFiltered,
} from "./actions/types";

const defaultState = {
  searchTerm: "",
  filteredObjects: [],
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case searchTerm:
      return { ...state, searchTerm: action.payload };
    case setFiltered:
      return { ...state, filteredObjects: action.payload };
    default:
      return state;
  }
};

const initialState = {
  isAuth: false,
  user: null,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case login:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
        error: null,
      };
    case logout:
      return {
        ...state,
        isAuth: false,
        user: null,
        error: null,
      };
    case loginError:
      return {
        ...state,
        isAuth: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
