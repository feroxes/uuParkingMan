//@@viewOn:imports
import { createVisualComponent, Lsi } from "uu5g05";
import { Tabs } from "uu5g05-elements";
import RouteBar from "../core/route-bar.js";
import UsersProvider from "../core/users/users-provider.js";
import ParkingPlacesProvider from "../core/parking-places/parking-places-provider.js";
import ReservationsProvider from "../core/reservations/reservations-provider.js";
import UsersList from "../core/users/list/list.js";
import ParkingPlacesList from "../core/parking-places/list/list.js";
import ReservationsList from "../core/reservations/admin-list/list.js";
import WeeklyOverview from "../core/reservations/weekly-overview/weekly-overview.js";
import Settings from "../core/settings/form/form.js";
import Config from "./config/config.js";
import LsiData from "../config/lsi.js";
//@@viewOff:imports

export const Admin = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Admin",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:private
    function getItemList() {
      return [
        {
          label: <Lsi lsi={LsiData.usersList} />,
          icon: "mdi-account-box-outline",
          children: <UsersList />,
        },
        {
          label: <Lsi lsi={LsiData.reservations} />,
          icon: "mdi-calendar",
          children: <ReservationsList />,
        },
        {
          label: <Lsi lsi={LsiData.weeklyOverview} />,
          icon: "mdi-calendar",
          children: <WeeklyOverview isAdminView />,
        },
        {
          label: <Lsi lsi={LsiData.parkingPlaces} />,
          icon: "mdi-car-brake-parking",
          children: <ParkingPlacesList />,
        },
        {
          label: <Lsi lsi={LsiData.settings} />,
          icon: "mdi-cogs",
          children: <Settings />,
        },
      ];
    }
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
              <Tabs itemList={getItemList()} />
            </ReservationsProvider>
          </ParkingPlacesProvider>
        </UsersProvider>
      </div>
    );
  },
  //@@viewOff:render
});

export default Admin;
