//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import UsersProvider from "../core/users/users-provider.js";
import ParkingPlacesProvider from "../core/parking-places/parking-places-provider.js";
import ReservationsProvider from "../core/reservations/reservations-provider.js";
import UserReservation from "../core/reservations/user-list/list.js";
//@@viewOff:imports

export const Reservations = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Reservations",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <RouteBar />
        <UsersProvider>
          <ParkingPlacesProvider>
            <ReservationsProvider>
              <UserReservation />
            </ReservationsProvider>
          </ParkingPlacesProvider>
        </UsersProvider>
      </div>
    );
  },
  //@@viewOff:render
});

export default Reservations;
