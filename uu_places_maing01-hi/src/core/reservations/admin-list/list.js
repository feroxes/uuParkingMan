//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import Config from "../config/config.js";
import useReservations from "../context/use-reservations.js";
import useUsers from "../../users/context/use-users.js";
import useParkingPlaces from "../../parking-places/context/use-parking-places.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import ReservationsListView from "./view/reservations-list-view.js";
//@@viewOff:imports

export const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:hooks
    const placesDataObject = useSubAppData();
    const reservationsDataList = useReservations();
    const usersDataList = useUsers();
    const parkingPlacesDataList = useParkingPlaces();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <DataObjectStateResolver dataObject={placesDataObject}>
          <DataListStateResolver dataList={reservationsDataList}>
            <DataListStateResolver dataList={usersDataList}>
              <DataListStateResolver dataList={parkingPlacesDataList}>
                <ReservationsListView
                  reservationsDataList={reservationsDataList}
                  usersDataList={usersDataList.data}
                  parkingPlacesDataList={parkingPlacesDataList.data}
                  handlerMap={reservationsDataList.handlerMap}
                />
              </DataListStateResolver>
            </DataListStateResolver>
          </DataListStateResolver>
        </DataObjectStateResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default List;
