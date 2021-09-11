//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Plus4U5 from "uu_plus4u5g01";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import StringHelper from "../../../../helpers/string-helper.js";
import UserFrom from "../../user-form.js";
import Lsi from "../../users-lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const CLASS_NAMES = {
  createBtn: () => Config.Css.css`
    position: relative;
    left: 16px;
    color: ${Constants.mainColor}
  `,
};

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
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={props.usersDataList.data}>
        <Uu5Tiles.InfoBar />
        <Uu5Tiles.List alternateRowBackground rowPadding="8px 16px" columns={getColumns(props)} />
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
function getColumns(props) {
  return [
    {
      key: Constants.Users.columnKeys.uuIdentity,
      cell: (cellProps) => (
        <Plus4U5.Bricks.BusinessCard
          uuIdentity={cellProps.data.data.uuIdentity}
          visual="inline"
          infoDetail="full"
          showUuIdentity
        />
      ),
      header: <UU5.Bricks.Lsi lsi={Lsi.user} />,
    },
    {
      cell: (cellProps) => `${cellProps.data.data.transport.brand} ${cellProps.data.data.transport.model}`,
      header: <UU5.Bricks.Lsi lsi={Lsi.transport} />,
    },
    {
      cell: (cellProps) => cellProps.data.data.transport.number,
      header: <UU5.Bricks.Lsi lsi={Lsi.transportNumber} />,
    },
    {
      cell: (cellProps) => StringHelper.capitalizeFirstLetter(cellProps.data.data.transport.type),
      header: <UU5.Bricks.Lsi lsi={Lsi.transportType} />,
    },
    {
      cell: () => null,
      header: (
        <UU5.Bricks.Button
          content={<UU5.Bricks.Icon icon="mdi-plus-circle" />}
          bgStyle="filled"
          onClick={() => onControlsBtnClick(props)}
          className={CLASS_NAMES.createBtn()}
        />
      ),
      width: "0",
      fixed: "right",
      isControls: true,
      visible: true,
    },
    {
      key: "actions",
      cell: (cellProps) => {
        return (
          <UU5.Bricks.Dropdown
            fitMenuToViewport
            popoverLocation="portal"
            items={[
              {
                label: <UU5.Bricks.Lsi lsi={Lsi.update} />,
                onClick: () => {
                  props.modal.current.open({
                    header: <UU5.Bricks.Lsi lsi={Lsi.userUpdate} />,
                    content: (
                      <UserFrom modal={props.modal} handlerMap={cellProps.data.handlerMap} user={cellProps.data.data} />
                    ),
                    size: "l",
                  });
                },
              },
            ]}
            bgStyle="transparent"
            iconHidden
            label={<UU5.Bricks.Icon icon={"uu5-menu"} style={{ fontSize: "16px" }} />}
          />
        );
      },
      fixed: "right",
      width: "48px",
      cellPadding: "0 16px",
    },
  ];
}
function onControlsBtnClick(props) {
  let modalContent = {
    header: <UU5.Bricks.Lsi lsi={Lsi.createUser} />,
    content: <UserFrom modal={props.modal} handlerMap={props.handlerMap} />,
    size: "l",
  };
  props.modal.current.open(modalContent);
}
//@@viewOff: helpers
export default UsersListView;
