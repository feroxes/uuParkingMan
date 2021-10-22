//@@viewOn:imports
import { ReservationsContext } from "./context/context.js";
import { useReservations } from "./context/context.js";
import { Loader } from "./reservations-loader.js";
import ListContextResolver from "./context/list-context-resolver.js";
//@@viewOff:imports

const Reservations = {
  ListContextResolver,
  ReservationsContext,
  useReservations,
  Loader,
};

export { ListContextResolver, ReservationsContext, useReservations, Loader };
export default Reservations;
