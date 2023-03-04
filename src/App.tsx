import React, { useState } from "react";
import Sidebar from "components/Sidebar/Sidebar";
import "./App.css";
import { AiOutlineSearch } from "react-icons/ai";
import citiesData from "cities.json";
import { ViewContextProvider } from "context/ViewContext";
import Mapbox from "components/Mapbox";

function App() {
  // to filter the cities for the search
  const [filter, setFilter] = useState("");

  // gets value from search input and puts it into the useState filter
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  // The filtering function for the search
  const filteredCities = citiesData.filter((city) =>
    city.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ViewContextProvider>
      <div className="h-screen overflow-y-hidden  overflow-x-hidden">
        <main className="flex ">
          {/* The sidebar component */}
          <Sidebar citiesData={filteredCities} />
          <div className=" w-screen h-screen relative">
            {/* The city search input */}
            <div className="absolute z-30 w-1/2 ml-3 sm:w-1/3 md:w-1/4">
              <div className="flex md:ml-2 w-full mt-5 rounded-full bg-gray-500 p-2">
                <AiOutlineSearch className="h-6 text-gray-600 cursor-pointer" />
                <input
                  value={filter}
                  onChange={handleFilterChange}
                  className={`md:inline-flex ml-2 text-white w-full placeholder-white  bg-transparent outline-none`}
                  type="text"
                  placeholder="Search Cities"
                />
              </div>
            </div>

            {/* Mapbox... The mapbox */}
            <Mapbox cities={citiesData} />
          </div>
        </main>
      </div>
    </ViewContextProvider>
  );
}

export default App;
