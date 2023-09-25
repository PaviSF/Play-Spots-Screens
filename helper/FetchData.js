import { ENV } from "../env";
const baseUrl = ENV.apiUrl;

//Get Turf Data
const getTurfData = async (longitude, latitude) => {
  let data = [];
  try {
    const apiUrl = `${baseUrl}/turfs/list`;
    const requestData = {
      rating: 0,
      longitude,
      latitude,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (responseData.turfs && responseData.turfs.data) {
        data = responseData.turfs.data;
      } else {
        console.error("Error: Invalid response data format");
      }
    } else {
      console.error("Request failed:", responseData.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return data;
};

//Get Turf Data
const getPaginatedTurfData = async (currentPage, longitude, latitude) => {
  let data = [];
  try {
    const apiUrl = `${baseUrl}/turfs/list?page=${currentPage}`;
    const requestData = {
      rating: 0,
      longitude,
      latitude,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    if (response.ok)
      if (responseData.turfs && responseData.turfs.data) {
        data = responseData.turfs.data;
      } else {
        console.error("Error: Invalid response data format");
      }
    else {
      console.error("Request failed:", responseData.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }
  return data;
};

//Get time availability information of Turf
const getTiming = async (date, turf_id, sport_id, slot_id) => {
  let setData = [];
  const apiUrl = `${baseUrl}/bookings/check_availability`;

  const inputData = {
    turf_id,
    sport_id,
    slot_id,
    date,
  };

  await fetch(apiUrl, {
    method: "POST", // or "GET" if it's a GET request
    headers: {
      "Content-Type": "application/json",
      uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
    },
    body: JSON.stringify(inputData), // Convert the input data to JSON
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the API response data here
      // console.log("API response:", data);
      setData[0] = data;
    })
    .catch((error) => {
      // Handle any errors that occurred during the fetch
      console.error("API error:", error);
    });
  return setData;
};

//Get the discount banners
const getDiscountBanner = async (longitude, latitude) => {
  let data = [];
  let alteredData = [];
  try {
    const apiUrl = `${baseUrl}/user_dashboard`;
    const requestData = {
      rating: 0,
      longitude,
      latitude,
      country: "India",
      state: "Kerala",
      district: "Kozhikode",
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
      },
      body: JSON.stringify(requestData),
    });

    const responseData = await response.json();

    if (response.ok) {
      if (responseData.banner_list) {
        data = responseData.banner_list;
      } else {
        console.error("Error: Invalid response data format");
      }
    } else {
      console.error("Request failed:", responseData.error);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  for (let i = 0; i < data.length; i++) {
    alteredData[i] = { image: data[i].image };
  }
  return alteredData;
};

// Get the price of the turf
const getPrice = async (
  turf_id,
  sport_id,
  slot_id,
  date,
  start_time,
  end_time
) => {
  const apiUrl = `${baseUrl}/bookings/get_booking_price`;
  const inputData = { turf_id, sport_id, slot_id, date, start_time, end_time };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
    },
    body: JSON.stringify(inputData),
  });
  const responseData = await response.json();

  if (response.ok) {
  } else {
    console.error("Request failed:", responseData.error);
  }
  return responseData;
};

const getCoins = async () => {
  const apiUrl = `${baseUrl}/loyalty_wallet/fetch_points`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
    },
  });
  const responseData = await response.json();

  if (response.ok) {
  } else {
    console.error("Request failed:", responseData.error);
  }
  return responseData;
};

const sendOtp = async (phone) => {
  const apiUrl = `${baseUrl}/user/staging-otp-send`;
  const inputData = { phone };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });
  const responseData = await response.json();

  if (response.ok) {
  } else {
    console.error("Request failed:", responseData.error);
  }
  return responseData;
};

const getProfileData = async () => {
  const apiUrl = `${baseUrl}/user`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
    },
  });
  const responseData = await response.json();

  if (response.ok) {
  } else {
    console.error("Request failed:", responseData.error);
  }
  return responseData;
};

const getFavourites = async () => {
  const apiUrl = `${baseUrl}/favourites/list`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
    },
  });
  const responseData = await response.json();
  if (response.ok) {
  } else {
    console.error("Request failed:", responseData.error);
  }
  return responseData;
};

const toggleFavourites = async (turf_id) => {
  const apiUrl = `${baseUrl}/favourites/toggle`;
  const inputData = { turf_id };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      uid: "5c669f948ddcf427f0539cd2", // Replace this with the actual uid
    },
    body: JSON.stringify(inputData),
  });
  return await response.json();
};

const register = async () => {};

export {
  getTurfData,
  getDiscountBanner,
  getTiming,
  getPrice,
  getCoins,
  sendOtp,
  getPaginatedTurfData,
  getProfileData,
  getFavourites,
  toggleFavourites,
};
