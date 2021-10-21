//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import "uu_plus4u5g01-app";
import UsersListContextResolver from "../core/users/context/list-context-resolver.js";
import ParkingPlacesContextResolver from "../core/parking-places/context/list-context-resolver.js";
import UsersList from "../core/users/list/list.js";
import ParkingPlacesList from "../core/parking-places/list/list.js";
import Config from "./config/config.js";
import Lsi from "./routes-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Admin",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Config.Css.css``,
};

export const Admin = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const usersListLsi = useLsi(Lsi.Admin.usersList);
    const parkingPlacesLsi = useLsi(Lsi.Admin.parkingPlaces);
    const reservationsLsi = useLsi(Lsi.Admin.reservations);
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
    return (
      <UU5.Bricks.Section {...attrs}>
        <UU5.Bricks.Tabs>
          <UU5.Bricks.Tabs.Item header={parkingPlacesLsi}>
            <ParkingPlacesContextResolver>
              <ParkingPlacesList />
            </ParkingPlacesContextResolver>
          </UU5.Bricks.Tabs.Item>
          <UU5.Bricks.Tabs.Item header={usersListLsi}>
            <UsersListContextResolver>
              <UsersList />
            </UsersListContextResolver>
          </UU5.Bricks.Tabs.Item>
          <UU5.Bricks.Tabs.Item header={reservationsLsi} content={reservationsLsi} />
        </UU5.Bricks.Tabs>
      </UU5.Bricks.Section>
    );
  },
  //@@viewOff:render
});

export default Admin;
