import { useContext, useState } from "react";
import { HiLocationMarker } from "react-icons/hi";
// import the react-mapbox-gl styles so that the map is displayed correctly
import Map, { Marker, Popup } from "react-map-gl";
import axios from "axios";
import ViewContext from "context/ViewContext";


// Declaring types for City and Props
type City = {
  id: number;
  name: string;
  lat: number;
  lng: number;
};

type Props = {
  cities: City[];
};

function Mapbox({ cities }: Props) {
  // Getting the view context data
  const { selectedCity, viewState, setSelectedCity, setViewState } =
    useContext<any>(ViewContext);
  // Using state to store the selected city's data(weather, temp)
  const [gottenCity, setGottenCity] = useState<any>(null);

  // Function to get the city's data using its lat and long from the API
  const getSelectedCity = async (city: any) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    );
    // Setting the state to the city's data and the selected city
    await setGottenCity(response?.data?.list);
    await setSelectedCity(city);
  };

  return (
    // Render the Map component with props
    <Map
      {...viewState}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onMove={(evt: any) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/streets-v12"
    >
      {cities.map((city) => (
        // Adding a marker for each city
        <Marker
          key={city.id}
          latitude={city.lat}
          longitude={city.lng}
          offset={[-12, -24]}
        >
          <button
            className="marker-btn"
            onClick={() => {
              getSelectedCity(city);
            }}
          >
            <HiLocationMarker className="h-10 w-10 text-black" />
          </button>
        </Marker>
      ))}

      {selectedCity && (
        // Adding a popup for the selected city
        <Popup
          latitude={selectedCity.lat}
          longitude={selectedCity.lng}
          onClose={() => setSelectedCity(null)} // Set selectedCity state to null when Popup is closed
        >
          {/* Popup data being shown */}
          <div>
            <h3 className="text-xl">{selectedCity.name}</h3>
            <h2 className="text-lg">Today</h2>
            <p>Today's temperature : {gottenCity[0]?.main?.temp}°C</p>
            <p>Today's weather : {gottenCity[0]?.weather[0]?.main}</p>
            <p>
              Today's weather description :{" "}
              {gottenCity[0]?.weather[0]?.description}
            </p>

            <h2 className="text-lg">Tomorrow</h2>
            <p>Tomorrow's temperature : {gottenCity[1]?.main?.temp}°C </p>
            <p>Tomorrow's weather : {gottenCity[1]?.weather[0]?.main}</p>
            <p>
              Tomorrow's weather description :{" "}
              {gottenCity[1]?.weather[0]?.description}
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default Mapbox;
