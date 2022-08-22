//@@viewOn:imports
import { createVisualComponent, PropTypes, useEffect, useMemo } from "uu5g05";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import ParkingPlaceItem from "./parking-place-item.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

export const UserReservationsListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserReservationsListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: PropTypes.object,
    usersDataList: PropTypes.object,
    parkingPlacesDataList: PropTypes.object,
    handlerMap: PropTypes.object,
    selectedDate: PropTypes.object,
    isReservationOpenedBySelectedDay: PropTypes.bool,
    isReservationOpened: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    reservationsDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    useEffect(() => {
      props.parkingPlacesDataList.data.sort((a, b) => a.data.number - b.data.number);
    }, []);

    const isAllParkingPlacesReserved = useMemo(() => {
      const { reservationsDataList, parkingPlacesDataList } = props;
      return parkingPlacesDataList.data.every((place) => {
        return ReservationHelper.isParkingPlaceReserved(place.data.id, reservationsDataList.data, props.selectedDate);
      });
    }, [props.reservationsDataList]);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className="uu5-common-padding-s">
        <Uu5Tiles.ControllerProvider data={props.parkingPlacesDataList.data}>
          <Uu5Tiles.Grid tileMinWidth={200} tileMaxWidth={300} tileSpacing={8} rowSpacing={8}>
            <ParkingPlaceItem
              reservationsDataList={props.reservationsDataList}
              usersDataList={props.usersDataList}
              selectedDate={props.selectedDate}
              placesDataObject={props.placesDataObject}
              disabled={!props.isReservationOpenedBySelectedDay}
              isReservationOpened={props.isReservationOpened}
              isAllParkingPlacesReserved={isAllParkingPlacesReserved}
            />
          </Uu5Tiles.Grid>
        </Uu5Tiles.ControllerProvider>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default UserReservationsListView;
