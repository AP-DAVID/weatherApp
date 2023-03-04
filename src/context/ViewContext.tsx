import React, { createContext, useState } from "react";

// Define an interface for a city
export interface ICity {
  lng: number;
  name: string;
  lat: number;
  lon: number;
}

// Define an interface for the viewport state
export interface IViewState {
  width: string;
  height: string;
  latitude: number;
  longitude: number;
  zoom: number;
}

// Define an interface for the view context
interface IViewContext {
  selectedCity: ICity | null;
  viewState: IViewState;
  setSelectedCity: (city: ICity) => void;
  setViewState: (state: IViewState) => void;
}

// Define an interface for the props of the view context provider component
interface IViewContextProviderProps {
  children: React.ReactNode;
}

// Create a context for the view context
const ViewContext = createContext<IViewContext>({
  selectedCity: null,
  viewState: {
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 10,
  },
  setSelectedCity: () => {},
  setViewState: () => {},
});

// Define a component for the view context provider
function ViewContextProvider(props: IViewContextProviderProps) {
  // Set state for selected city
  const [selectedCityState, setSelectedCityState] = useState<ICity | null>(
    null
  );
  // Set initial state for viewport
  const [viewState, setViewState] = useState<IViewState>({
    width: "100vw",
    height: "100vh",
    latitude: 0,
    longitude: 0,
    zoom: 2,
  });

  // Function to handle the selection of a city
  async function handleSelectedCity(city: ICity) {
    setSelectedCityState(city);
  }

  // Set the value for the view context
  const value: IViewContext = {
    selectedCity: selectedCityState,
    viewState,
    setSelectedCity: handleSelectedCity,
    setViewState,
  };

  // Render the view context provider
  return (
    <ViewContext.Provider value={value}>{props.children}</ViewContext.Provider>
  );
}

export default ViewContext;
export { ViewContextProvider };
