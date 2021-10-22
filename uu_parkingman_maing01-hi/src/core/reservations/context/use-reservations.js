//@@viewOn:revision
// coded: Kyrychenko Dmytro, 21.07.2021
//@@viewOff:revision

//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./reservations-context.js";
//@@viewOff:imports

export function useReservations() {
  return useContext(Context);
}

export default useReservations;
