import {
  login,
  logout,
  searchTerm as search,
  loginError as logErr,
} from "./types";
import { refreshAccessToken } from "../../components/jwtFunctions";

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
// Looks good. I'm kinda proud of myself(a little)
export const fetchSearchItems = (searchTerm) => {
  return (dispatch) => {
    dispatch(fetchItems(searchTerm));
  };
};

export const fetchAllItems = () => {
  return (dispatch) => {
    dispatch(fetchItems());
  };
};
export const fetchItems = (searchTerm = "") => {
  return async (dispatch) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let url = `https://server-ancient-grass-9030.fly.dev/api/cards`;

      if (searchTerm) {
        url += `?search=${encodeURIComponent(searchTerm)}`;
      }

      let response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          });
        } else {
          dispatch(logoutAction());
          return;
        }
      }

      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: "set_filtered_objects",
          payload: data,
        });
      } else {
        const errorData = await response.json();
        console.error("Error data fetching:", errorData.message);
      }
    } catch (error) {
      console.log("Happened error: \n", error);
    }
  };
};
