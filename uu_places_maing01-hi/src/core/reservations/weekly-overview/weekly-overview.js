//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import Config from "../config/config.js";
import useReservations from "../context/use-reservations.js";
import useParkingPlaces from "../../parking-places/context/use-parking-places.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import WeeklyOverviewView from "./view/weekly-overview-view.js";
import useUsers from "../../users/context/use-users.js";
//@@viewOff:imports

export const WeeklyOverview = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WeeklyOverview",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const reservationsDataList = useReservations();
    const parkingPlacesDataList = useParkingPlaces();
    const usersDataList = useUsers();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <DataListStateResolver dataList={reservationsDataList}>
          <DataListStateResolver dataList={parkingPlacesDataList}>
            <DataListStateResolver dataList={usersDataList}>
              <WeeklyOverviewView
                reservationsDataList={reservationsDataList}
                parkingPlacesDataList={parkingPlacesDataList}
                usersDataList={usersDataList}
                isAdminView={props.isAdminView}
              />
            </DataListStateResolver>
          </DataListStateResolver>
        </DataListStateResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default WeeklyOverview;
