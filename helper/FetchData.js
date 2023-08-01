const getTurfData = async (longitude, latitude) => {
  let data = [];
  try {
    const apiUrl = "https://api.staging.playspots.app/v8/turfs/list";
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

const getDiscountBanner = async (longitude, latitude) => {
  let data = [];
  let alteredData = [];
  try {
    const apiUrl = "https://api.staging.playspots.app/v8/user_dashboard";
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
  console.log(alteredData);
  return alteredData;
};

export { getTurfData, getDiscountBanner };
