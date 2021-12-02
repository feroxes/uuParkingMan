//@@viewOn:imports
import { createComponent, useDataList } from "uu5g04-hooks";
import { ParkingPlacesContext } from "./context/context.js";

import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const Loader = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Loader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const parkingPlacesDataList = useDataList({
      handlerMap: {
        load: Calls.parkingPlaceList,
        create: Calls.parkingPlaceCreate,
      },
      itemHandlerMap: {
        update: Calls.parkingPlaceUpdate,
      },
    });

    //@@viewOff:hooks

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ParkingPlacesContext.Provider value={parkingPlacesDataList}>{props.children}</ParkingPlacesContext.Provider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default Loader;
