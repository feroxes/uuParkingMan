//@@viewOn:imports
import { createVisualComponent, Utils, useSession } from "uu5g05";
import { Unauthenticated } from "uu_plus4u5g02-elements";
import { useSubAppData } from "uu_plus4u5g02";
import Plus4U5App from "uu_plus4u5g02-app";
import Config from "../config/config";
//@@viewOff:imports

const About = Utils.Component.lazy(() => import("../routes/about.js"));
const Reservations = Utils.Component.lazy(() => import("../routes/reservations.js"));
const Admin = Utils.Component.lazy(() => import("../routes/admin.js"));

export const SpaView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SpaView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:hooks
    const { data: uuPlaces } = useSubAppData();
    const session = useSession();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:render
    const routeMap = {
      [Config.ROUTES.HOME]: () => (session.state === "notAuthenticated" ? <Unauthenticated /> : <Reservations />),
      [Config.ROUTES.ABOUT]: () => <About />,
      "": { redirect: Config.ROUTES.HOME },
      "*": { redirect: Config.ROUTES.HOME },
    };

    if (uuPlaces?.isAuthorizedForAdmin) {
      routeMap[Config.ROUTES.ADMIN] = () => <Admin />;
    }

    return (
      <Plus4U5App.Spa>
        <Plus4U5App.Router routeMap={routeMap} />
      </Plus4U5App.Spa>
    );
    //@@viewOff:render
  },
});

export default SpaView;
