//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { ModalBus } from "uu5g05-elements";
import Plus4U5 from "uu_plus4u5g02";
import Config from "../config/config.js";
import SpaView from "./spa-view.js";
//@@viewOff:imports

export const Spa = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Spa",
  //@@viewOff:statics

  render() {
    //@@viewOn:render
    return (
      <Plus4U5.SpaProvider initialLanguageList={["en", "uk"]}>
        <ModalBus>
          <Plus4U5.RouteDataProvider>
            <SpaView />
          </Plus4U5.RouteDataProvider>
        </ModalBus>
      </Plus4U5.SpaProvider>
    );
    //@@viewOff:render
  },
});

export default Spa;
