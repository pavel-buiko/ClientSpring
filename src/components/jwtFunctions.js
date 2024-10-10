export const fetchWithAuth = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");
  let response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    accessToken = await refreshAccessToken();

    if (accessToken) {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } else {
      throw new Error("Unable to refresh access token");
    }
  }

  return response;
};

export const refreshAccessToken = async () => {
  console.log("Refresh Access Token start");
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("Retrieved Refresh Token:", refreshToken);
  if (!refreshToken) {
    console.log("Refresh token not found");
    return null;
  }

  try {
    const response = await fetch(
      `https://server-ancient-grass-9030.fly.dev/api/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const newAccessToken = data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      return newAccessToken;
    } else {
      console.log("Failed to refresh access token");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while refreshing access token:", error);
    return null;
  }
};
