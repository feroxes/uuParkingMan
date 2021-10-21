//@@viewOn:imports
import { ParkingPlacesContext } from "./context/context.js";
import { useParkingPlaces } from "./context/context.js";
import { Loader } from "./parking-places-loader.js";
import ListContextResolver from "./context/list-context-resolver.js";
//@@viewOff:imports

const ParkingPlaces = {
  ListContextResolver,
  ParkingPlacesContext,
  useParkingPlaces,
  Loader,
};

export { ListContextResolver, ParkingPlacesContext, useParkingPlaces, Loader };
export default ParkingPlaces;
