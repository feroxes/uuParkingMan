//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useState, useSession, useCall, useEffect } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import Constants from "../helpers/constants.js";
import Calls from "calls";

import Config from "./config/config";
import Bottom from "./bottom";
import Admin from "../routes/admin.js";
import Reservations from "../routes/reservations.js";
import UseCallStateResolver from "../common/use-call-state-resolver.js";
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
    const userProfiles = useCall(Calls.getUserProfile);

    const session = useSession();
    useEffect(() => {
      userProfiles.call({ baseUri: Calls.APP_BASE_URI, uuIdentity: session.identity.uuIdentity });
    }, []);

    //@@viewOn:private
    const [initialActiveItemId] = useState(() => {
      let url = UU5.Common.Url.parse(window.location.href);
      return url.useCase || DEFAULT_USE_CASE;
    });

    function _getRoutes(userProfiles) {
      const routes = {
        "": DEFAULT_USE_CASE,
        reservations: { component: <Reservations /> },
        about: { component: <About /> },
      };
      if (userProfiles.data.userProfiles.includes(Constants.profiles.AUTHORITIES)) {
        routes.admin = { component: <Admin /> };
      }
      return routes;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UseCallStateResolver data={userProfiles}>
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
                return (
                  <UU5.Common.Router
                    routes={_getRoutes(userProfiles)}
                    controlled={false}
                    onRouteChanged={handleRouteChanged}
                    notFoundRoute="about"
                  />
                );
              }}
            </Plus4U5.App.MenuConsumer>
          </Plus4U5.App.Page>
        </Plus4U5.App.MenuProvider>
      </UseCallStateResolver>
    );
    //@@viewOff:render
  },
});

export default SpaAuthenticated;
