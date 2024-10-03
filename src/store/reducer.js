import projectItems from "../../../server/projectItems";
import {
  login,
  logout,
  loginError,
  searchTerm,
  setFiltered,
} from "./actions/types";
const defaultState = {
  searchTerm: "",
  filteredObjects: projectItems,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case searchTerm:
      return { ...state, searchTerm: action.value };
    case setFiltered: {
      return { ...state, filteredObjects: action.value };
    }
    default:
      return state;
  }
};

const initialState = {
  isAuth: false,
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case login:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case logout:
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    case loginError:
      return { ...state, isAuth: false, user: null };
    default:
      return state;
  }
};
