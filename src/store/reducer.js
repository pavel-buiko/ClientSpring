import projectItems from "../../../server/projectItems";

const defaultState = {
  searchTerm: "",
  filteredObjects: projectItems,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "set_search_term":
      return { ...state, searchTerm: action.value };
    case "set_filtered_objects": {
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
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};
