//@@viewOn:imports
import { createVisualComponent } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import Places from "./places/places.js";
import SubAppContextResolver from "../context/sub-app-context-resolver.js";
import Calls from "calls";
import Config from "./config/config.js";
import SpaAuthenticated from "./spa-authenticated.js";
import { AlertManager } from "./managers/alert-manager.js";
import { ModalManager } from "./managers/modal-manager.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Spa",
  //@@viewOff:statics
};

export const Spa = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.App.Spa {...props} appName="uuPlaces">
        <SubAppContextResolver subAppDataLoader={Places.Loader} baseUri={Calls.APP_BASE_URI}>
          <AlertManager>
            <ModalManager>
              <SpaAuthenticated />
            </ModalManager>
          </AlertManager>
        </SubAppContextResolver>
      </Plus4U5.App.Spa>
    );
    //@@viewOff:render
  },
});

export default Spa;
