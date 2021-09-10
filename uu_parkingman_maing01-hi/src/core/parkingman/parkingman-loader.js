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
    const parkingmanDataObject = useDataObject({
      handlerMap: {
        load: Calls.uuSubAppInstanceLoad,
      },
      initialDtoIn: getInitLoadDtoIn(props.baseUri),
    });

    //@@viewOff:hooks

    //@@viewOn:handlers
    //@@viewOff:handlers

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    return <SubAppDataProvider data={parkingmanDataObject}>{props.children}</SubAppDataProvider>;
    //@@viewOff:render
  },
});

//@@viewOn:helpers
function getInitLoadDtoIn(baseUri) {
  let dtoIn = { data: {} };
  if (baseUri) {
    dtoIn.uri = baseUri;
  }
  return dtoIn;
}
//@@viewOff:helpers

export default Loader;
