//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-app";
import Config from "./config/config.js";
import ParkingPlacesContextResolver from "../core/parking-places/context/list-context-resolver.js";
import ReservationsContextResolver from "../core/reservations/context/list-context-resolver.js";
import UsersListContextResolver from "../core/users/context/list-context-resolver.js";
import UserReservation from "../core/reservations/user-list/list.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Reservations",
  //@@viewOff:statics
};

const Css = {
  main: () => Config.Css.css``,
};

export const Reservations = createVisualComponent({
  ...STATICS,

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
    const attrs = UU5.Common.VisualComponent.getAttrs(props, Css.main());
    return (
      <UU5.Bricks.Section {...attrs}>
        <UsersListContextResolver>
          <ParkingPlacesContextResolver>
            <ReservationsContextResolver>
              <UserReservation />
            </ReservationsContextResolver>
          </ParkingPlacesContextResolver>
        </UsersListContextResolver>
      </UU5.Bricks.Section>
    );
  },
  //@@viewOff:render
});

export default Reservations;
