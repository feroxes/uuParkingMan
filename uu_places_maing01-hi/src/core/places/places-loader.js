//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataObject } from "uu5g04-hooks";
import { SubAppDataProvider } from "uu_plus4u5g01-context";

import Config from "../../bricks/config/config.js";
import Calls from "calls";
//@@viewOff:imports

export const Loader = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "Loader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const placesDataObject = useDataObject({
      handlerMap: {
        load: Calls.uuSubAppInstanceLoad,
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
    return <SubAppDataProvider data={placesDataObject}>{props.children}</SubAppDataProvider>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
//@@viewOff:helpers

export default Loader;
