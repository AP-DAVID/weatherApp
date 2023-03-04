import { useContext, useEffect, useState } from "react";
import { HiHand, HiMenu, HiX } from "react-icons/hi";
import ViewContext from "context/ViewContext";
type Props = {
  citiesData: { name: string; lat: number; lng: number }[];
};

// The typescript interface for the city
interface City {
  name: string;
  lat: number;
  lng: number;
}

const Sidebar = ({ citiesData }: Props) => {
  const [cities, setCities] = useState<City[]>([]);
  // responsive sidebar button useState
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { setViewState } = useContext<any>(ViewContext);

  // Load the cities data from the JSON file when the component mounts
  useEffect(() => {
    setCities(citiesData);
  }, [citiesData]);

  // goes to the city being clicked location on the map
  const handleClick = (city: any) => {
    setViewState({
      width: "100vw",
      height: "100vh",
      latitude: city.lat,
      longitude: city.lng,
      zoom: 10,
    });
  };

  return (
    <div className="bg-[#67cbff] overflow-y-auto overflow-x-hidden sm:scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      {/* This buttton is only visibile in the mobile view, it open and closes the sidebar */}

      <button
        className="cursor-pointer text-xl leading-none  border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {!sidebarOpen ? (
          <HiMenu className="h-10 w-10 sm:hidden cursor-pointer px-3 py-2 bg-blue-400 rounded-xl" />
        ) : (
          <HiX className="h-10 w-10 sm:hidden cursor-pointer px-3 py-2 bg-blue-400 rounded-xl" />
        )}
      </button>

      <div
        className={
          sidebarOpen
            ? "sm:border-r-2 sm:flex w-40 flex-col h-screen"
            : "hidden sm:flex flex-col w-40 h-screen shadow-2xl"
        }
      >
        <div>
          <div className="mt-6 -ml-0 md:space-x-2 p-2 " />
          <div className="flex space-x-3 py-2 px-2 text-center ">
            <HiHand className="h-6 w-6 text-yellow-500" />

            <h1 className="text-md font-medium text-black">Hey,!</h1>
          </div>
        </div>

        {/* display the city list in the sidebar */}
        {cities.map((city) => (
          <div
            onClick={() => {
              handleClick(city);
            }}
            key={city.lng}
            data-testid="city-list"
            className="flex items-center left-0 -ml-0.5 md:ml-2 md:space-x-2 p-2 md-p-4 hover:bg-gray-200 rounded-xl cursor-pointer group"
          >
            <div className={"w-full flex space-x-3 py-2 px-2 rounded-xl"}>
              <p className="sm:inline-flex font-medium text-black">
                {city.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
