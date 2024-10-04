import {
  login,
  logout,
  searchTerm as search,
  loginError as logErr,
} from "./types";

export const loginThunk = (username, password) => async (dispatch) => {
  try {
    const response = await fetch(
      "https://server-ancient-grass-9030.fly.dev/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      dispatch(loginAction(data));
      localStorage.setItem("user", JSON.stringify(data));
      return { success: true };
    } else {
      dispatch(loginError(data.message));
      return { success: false, message: data.message };
    }
  } catch (error) {
    dispatch(loginError(error.toString()));
    return { success: false, message: error.toString() };
  }
};

export const setSearchTerm = (searchTerm) => {
  return {
    type: search,
    value: searchTerm,
  };
};

export const logoutAction = () => {
  return {
    type: logout,
  };
};

export const loginError = (message) => {
  return {
    type: logErr,
    value: message,
  };
};

export const loginAction = (user) => {
  return {
    type: login,
    value: user,
  };
};

export const fetchSearchItems = (searchTerm) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://server-ancient-grass-9030.fly.dev/api/cards?search=${searchTerm}`
      );
      const data = await response.json();
      dispatch({
        type: "set_filtered_objects",
        value: data,
      });
    } catch (error) {
      alert("Happend error: \n", error);
    }
  };
};
