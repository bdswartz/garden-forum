// const [searchedPlants, setSearchedPlants] = useState([]);

// const [searchInput, setSearchInput] = useState("");

// const handleClose = () => {
//   setOpen(false);
// };

//   const [savedPlantIds, setSavedPlantIds] = useState(getSavedPlantIds());

//   useEffect(() => {
//     return () => savePlantIds(savedPlantIds);
//   });

// const handleFormSubmit = async (event) => {
//   event.preventDefault();

//   if (!searchInput) {
//     return false;
//   }
//   try {
//     const response = await searchPlants();
//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }
//     const { suggestions } = await response.json();

//     const plantData = suggestions.map((plant_details) => ({
//       plantName: plant_details.common_names || ["No names to display!"],
//       scienceName: plant_details.scientific_name,
//       likeness: plant_details.probability,
//     }));
//     setSearchedPlants(plantData);
//     setSearchInput("");
//   } catch (err) {
//     console.error(err);
//   }
// };

{
  /* <Button
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
          // <button type="button">OK</button> */
}
{
  /* </Button>
        <CardColumns>
          {searchedPlants.map((plant_details) => {
            return (
              <Card key={plant_details.plantName}>
                <h1>A NEW PLANT</h1>
              </Card>
            );
          })}
        </CardColumns> */
}
