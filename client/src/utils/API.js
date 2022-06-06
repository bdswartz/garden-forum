

//user info
export const getMe = (token) => {
  return fetch("/api/users/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};

//plant info
export const savePlant = (plantData, token) => {
  return fetch("/api/users", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(plantData),
  });
};

export const deletePlant = (plantId, token) => {
  return fetch(`/api/users/plants/${plantId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

//plant.id api info
export const searchPlants = (files) => {
  const promises = files.map((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const res = event.target.result;
        // console.log(res);
        resolve(res);
      };
      reader.readAsDataURL(file);
    });
  });

  return Promise.all(promises).then((base64files) => {
    // console.log(base64files);
    const API_KEY = process.env.REACT_APP_API_KEY;
    const data = {
      api_key: process.env.API_KEY,
      images: base64files,
      // modifiers docs: https://github.com/flowerchecker/Plant-id-API/wiki/Modifiers
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      // plant details docs: https://github.com/flowerchecker/Plant-id-API/wiki/Plant-details
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    return new Promise((resolve, reject) => {
      fetch("https://api.plant.id/v2/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log("Success:", data);
          resolve(data);
        })
        .catch((error) => {
          console.log("Error:", data);
          reject(error);
        });
    });
  });
};

// ("eVh7gMTn4ySBkcg5XnOz13qsTPkurS35JZGG9b9sFHEPajraHT");
