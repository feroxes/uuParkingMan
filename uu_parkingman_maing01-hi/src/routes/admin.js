//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent } from "uu5g04-hooks";
import "uu_plus4u5g01-app";
import ListContextResolver from "../core/users/context/list-context-resolver.js";
import List from "../core/users/list/list.js";
import Config from "./config/config.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Admin",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Config.Css.css``,
};

export const Admin = createVisualComponent({
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
    const attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
    return (
      <UU5.Bricks.Section {...attrs}>
        <ListContextResolver>
          <List />
        </ListContextResolver>
      </UU5.Bricks.Section>
    );
  },
  //@@viewOff:render
});

export default Admin;
