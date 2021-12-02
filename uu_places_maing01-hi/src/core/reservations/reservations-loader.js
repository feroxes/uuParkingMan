//@@viewOn:imports
import { createComponent, useDataList } from "uu5g04-hooks";
import { ReservationsContext } from "./context/context.js";

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
    const reservationsDataList = useDataList({
      handlerMap: {
        load: Calls.reservationsList,
        create: Calls.reservationsCreate,
      },
      itemHandlerMap: {
        update: Calls.reservationsUpdate,
        delete: Calls.reservationsDelete,
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
    return <ReservationsContext.Provider value={reservationsDataList}>{props.children}</ReservationsContext.Provider>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default Loader;
