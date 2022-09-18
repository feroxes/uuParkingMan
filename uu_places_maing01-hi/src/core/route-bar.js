//@@viewOn:imports
import { createVisualComponent, Lsi, useRoute } from "uu5g05";
import Plus4U5App from "uu_plus4u5g02-app";
import { useSubAppData } from "uu_plus4u5g02";
import Config from "./config/config.js";
import LSI from "../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const RouteBar = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "RouteBar",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { data: uuPlaces } = useSubAppData();
    const [, setRoute] = useRoute();

    let appActionList = [
      { children: <Lsi lsi={LSI.menu.home} />, onClick: () => setRoute("home") },
      { children: <Lsi lsi={LSI.menu.about} />, onClick: () => setRoute("about") },
    ];

    if (uuPlaces.isAuthorizedForAdmin) {
      appActionList = [{ children: <Lsi lsi={LSI.menu.admin} />, onClick: () => setRoute("admin") }, ...appActionList];
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <Plus4U5App.RouteBar appActionList={appActionList} {...props} />;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { RouteBar };
export default RouteBar;
//@@viewOff:exports
