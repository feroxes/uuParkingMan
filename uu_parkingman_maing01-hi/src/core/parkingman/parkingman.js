//@@viewOn:imports
import { ParkingmanContext } from "./context/context.js";
import { useParkingman } from "./context/context.js";
import { Loader } from "./parkingman-loader.js";
//@@viewOff:imports

const Parkingman = {
  ParkingmanContext,
  useParkingman,
  Loader,
};

export { ParkingmanContext, useParkingman, Loader };
export default Parkingman;
