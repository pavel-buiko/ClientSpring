import {
  login,
  logout,
  searchTerm as search,
  loginError as logErr,
} from "./types";
import { refreshAccessToken } from "../../components/jwtFunctions";
import { fetchWithAuth } from "../../components/jwtFunctions";

export const loginThunk = (username, password) => async (dispatch) => {
  try {
    const response = await fetchWithAuth(
      "https://server-ancient-grass-9030.fly.dev/api/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      const { accessToken, refreshToken, user } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      dispatch(loginAction(user));
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
    payload: searchTerm,
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
    payload: message,
  };
};

export const loginAction = (user) => {
  return {
    type: login,
    payload: user,
  };
};

//That hurts me so bad
export const fetchSearchItems = (searchTerm) => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://server-ancient-grass-9030.fly.dev/api/cards?search=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          const retryResponse = await fetch(
            `https://server-ancient-grass-9030.fly.dev/api/cards?search=${encodeURIComponent(searchTerm)}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          const data = await retryResponse.json();
          dispatch({
            type: "set_filtered_objects",
            payload: data,
          });
        } else {
          dispatch(logoutAction());
        }
      } else {
        const data = await response.json();
        dispatch({
          type: "set_filtered_objects",
          payload: data,
        });
      }
    } catch (error) {
      console.log("An error occurred: \n", error);
    }
  };
};

export const fetchAllItems = () => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://server-ancient-grass-9030.fly.dev/api/cards`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          const retryResponse = await fetch(
            `https://server-ancient-grass-9030.fly.dev/api/cards`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${newAccessToken}`,
              },
            }
          );
          const data = await retryResponse.json();
          dispatch({
            type: "set_filtered_objects",
            payload: data,
          });
        } else {
          dispatch(logoutAction());
        }
      } else {
        const data = await response.json();
        dispatch({
          type: "set_filtered_objects",
          payload: data,
        });
      }
    } catch (error) {
      console.log("An error occurred: \n", error);
    }
  };
};
