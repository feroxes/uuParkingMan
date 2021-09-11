//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useRef, useLsi } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";
import Config from "../config/config.js";
import useUsers from "../context/use-users.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import UsersListView from "./view/users-list-view.js";
import DataPending from "../../../common/data-pending.js";
import Lsi from "../users-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  nestingLevel: "bigBox",
  //@@viewOff:statics
};

export const List = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    cardView: UU5.PropTypes.bool,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOf([-1, 0, 1, 2, 3, 4, 5, "-1", "0", "1", "2", "3", "4", "5"]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    bgStyle: UU5.PropTypes.oneOf(["filled", "outline", "transparent", "underline"]),
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    cardView: true,
    colorSchema: undefined,
    elevation: undefined,
    borderRadius: undefined,
    bgStyle: undefined,
    contextType: "basic",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const { data: parkingManDataObject } = useSubAppData();
    const usersDataList = useUsers();
    const modal = useRef();
    const headerLsi = useLsi(Lsi.header);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    return (
      <UU5.Bricks.Div {...attrs}>
        <DataObjectStateResolver dataObject={parkingManDataObject}>
          <DataListStateResolver dataList={usersDataList}>
            <UU5.Bricks.Header className="uu5-common-center" content={headerLsi} level={5} />
            <UsersListView usersDataList={usersDataList} modal={modal} handlerMap={usersDataList.handlerMap} />
          </DataListStateResolver>
        </DataObjectStateResolver>
        <UU5.Bricks.Modal ref_={modal} />
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default List;
