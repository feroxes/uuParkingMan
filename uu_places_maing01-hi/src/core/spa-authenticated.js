//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import Constants from "../helpers/constants.js";

import Config from "./config/config";
import Bottom from "./bottom";
import Admin from "../routes/admin.js";
import Reservations from "../routes/reservations.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SpaAuthenticated",
  //@@viewOff:statics
};

const top = () => Config.Css.css`
  .plus4u5-app-button-authenticated {
    background: ${Constants.mainColor} !important;
    background-color: ${Constants.mainColor} !important;
    border-color: ${Constants.mainColor} !important;
  }
 `;

const About = UU5.Common.Component.lazy(() => import("../routes/about"));

const DEFAULT_USE_CASE = "reservations";

export const SpaAuthenticated = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { data: places } = useSubAppData();

    //@@viewOn:private
    let [initialActiveItemId] = useState(() => {
      let url = UU5.Common.Url.parse(window.location.href);
      return url.useCase || DEFAULT_USE_CASE;
    });

    function _getRoutes() {
      return {
        "": DEFAULT_USE_CASE,
        admin: { component: <Admin /> },
        reservations: { component: <Reservations /> },
        about: { component: <About /> },
      };
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.App.MenuProvider activeItemId={initialActiveItemId}>
        <Plus4U5.App.Page
          {...props}
          className={top()}
          top={<Plus4U5.App.TopBt />}
          topFixed="smart"
          bottom={<Bottom />}
          type={3}
          displayedLanguages={["en"]}
          showLeftToggleButton
          fullPage
        >
          <Plus4U5.App.MenuConsumer>
            {({ setActiveItemId }) => {
              let handleRouteChanged = ({ useCase }) => setActiveItemId(useCase || DEFAULT_USE_CASE);
              return <UU5.Common.Router routes={_getRoutes()} controlled={false} onRouteChanged={handleRouteChanged} />;
            }}
          </Plus4U5.App.MenuConsumer>
        </Plus4U5.App.Page>
      </Plus4U5.App.MenuProvider>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
