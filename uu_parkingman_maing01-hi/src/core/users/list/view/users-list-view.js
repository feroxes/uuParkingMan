//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Plus4U5 from "uu_plus4u5g01";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import StringHelper from "../../../../helpers/string-helper.js";
import Lsi from "../../users-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UsersListView",
  //@@viewOff:statics
};

export const UsersListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    usersDataList: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
    modal: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    usersDataList: {},
    handlerMap: {},
    modal: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    const columns = [
      {
        key: Constants.Users.columnKeys.uuIdentity,
        cell: (cellProps) => (
          <Plus4U5.Bricks.BusinessCard
            uuIdentity={cellProps.data.uuIdentity}
            visual="inline"
            infoDetail="full"
            showUuIdentity
          />
        ),
        header: <UU5.Bricks.Lsi lsi={Lsi.user} />,
      },
      {
        cell: (cellProps) => `${cellProps.data.transport.brand} ${cellProps.data.transport.model}`,
        header: <UU5.Bricks.Lsi lsi={Lsi.transport} />,
      },
      {
        cell: (cellProps) => cellProps.data.transport.number,
        header: <UU5.Bricks.Lsi lsi={Lsi.transportNumber} />,
      },
      {
        cell: (cellProps) => StringHelper.capitalizeFirstLetter(cellProps.data.transport.type),
        header: <UU5.Bricks.Lsi lsi={Lsi.transportType} />,
      },
    ];
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={props.usersDataList.data.itemList} filters={getFilters(props)}>
        <Uu5Tiles.FilterBar />
        <Uu5Tiles.InfoBar />
        <Uu5Tiles.List alternateRowBackground rowPadding="8px 16px" columns={columns} />
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
function getFilters() {
  return [];
}
//@@viewOff: helpers
export default UsersListView;
