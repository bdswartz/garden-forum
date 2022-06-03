import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { searchPlants } from "../utils/API";
// import { Navigate, useParams } from "react-router-dom";

// import Auth from "../utils/auth";
// import { useQuery } from "@apollo/client";
// import { QUERY_USER, QUERY_ME } from "../utils/queries";
// import { ADD_FRIEND } from "../utils/mutations";
// import { useQuery, useMutation } from "@apollo/client";

const Profile = () => {
  const [searchedPlants, setSearchedPlants] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  //   const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());

  //   useEffect(() => {
  //     return () => savePlantIds(savedPlantIds);
  //   });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchPlants();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const { suggestions } = await response.json();

      const plantData = suggestions.map((plant_details) => ({
        plantName: plant_details.common_names || ["No names to display!"],
        scienceName: plant_details.scientific_name,
        likeness: plant_details.probability,
      }));
      setSearchedPlants(plantData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Jumbotron>
        <Button
          onClick={() => handleFormSubmit(plant_details.plantName)}
          onSubmit={handleFormSubmit}
          name="searchInput"
          value={searchInput}
          placeholder="Identify a new plant!"
        >
          IDENTIFY A NEW PLANT
          {/* <Button.Control
          />
          // <input type="file" multiple />
          // <button type="button">OK</button> */}
        </Button>
        <CardColumns>
          {searchedPlants.map((plant_details) => {
            return (
              <Card key={plant_details.plantName}>
                <h1>A NEW PLANT</h1>
              </Card>
            );
          })}
        </CardColumns>
      </Jumbotron>{" "}
    </div>
  );
};

export default Profile;
