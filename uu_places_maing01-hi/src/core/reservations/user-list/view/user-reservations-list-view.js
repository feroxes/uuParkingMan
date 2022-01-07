//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useEffect } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import ParkingPlaceItem from "./parking-place-item.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants
const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UserReservationsListView",
  //@@viewOff:statics
};

export const UserReservationsListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: UU5.PropTypes.object,
    usersDataList: UU5.PropTypes.object,
    parkingPlacesDataList: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
    selectedDate: UU5.PropTypes.object,
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
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <>
        <div className="uu5-common-padding-s">
          <Uu5Tiles.ControllerProvider data={props.parkingPlacesDataList.data}>
            <Uu5Tiles.Grid tileMinWidth={200} tileMaxWidth={300} tileSpacing={8} rowSpacing={8}>
              <ParkingPlaceItem
                reservationsDataList={props.reservationsDataList}
                usersDataList={props.usersDataList}
                selectedDate={props.selectedDate}
              />
            </Uu5Tiles.Grid>
          </Uu5Tiles.ControllerProvider>
        </div>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default UserReservationsListView;
