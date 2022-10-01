//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, Lsi } from "uu5g05";
import { Button, Dropdown, Modal, Dialog, useAlertBus } from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import StringHelper from "../../../../helpers/string-helper.js";
import UserFrom from "../../user-form.js";
import ComponentsHelper from "../../../../helpers/components-helper.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const CLASS_NAMES = {
  createBtn: () => Config.Css.css`
    position: relative;
    left: 16px;
  `,
};

export const UsersListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UsersListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    usersDataList: PropTypes.object,
    handlerMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    usersDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalHeader, setModalHeader] = useState("");
    const [modalContentProps, setModalContentProps] = useState({});
    const [userForDelete, setUserForDelete] = useState(null);
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function getColumns(props) {
      return [
        {
          key: Constants.Users.columnKeys.uuIdentity,
          cell: (cellProps) => ComponentsHelper.getBusinessCart(cellProps.data.data.uuIdentity),
          header: <Lsi lsi={LsiData.user} />,
        },
        {
          cell: (cellProps) => `${cellProps.data.data.transport.brand} ${cellProps.data.data.transport.model}`,
          header: <Lsi lsi={LsiData.transport} />,
        },
        {
          cell: (cellProps) => cellProps.data.data.transport.number,
          header: <Lsi lsi={LsiData.transportNumber} />,
        },
        {
          cell: (cellProps) => StringHelper.capitalizeFirstLetter(cellProps.data.data.transport.type),
          header: <Lsi lsi={LsiData.transportType} />,
        },
        {
          cell: () => null,
          header: (
            <Button
              icon="mdi-plus-circle"
              colorScheme="primary"
              onClick={() => {
                setModalHeader(<Lsi lsi={LsiData.createUser} />);
                setModalContentProps({ handlerMap: props.handlerMap });
                setOpen(true);
              }}
              className={CLASS_NAMES.createBtn()}
            />
          ),
          width: 1,
          fixed: "right",
          isControls: true,
          visible: true,
        },
        {
          key: "actions",
          cell: (cellProps) => {
            return (
              <Dropdown
                significance="subdued"
                itemList={[
                  {
                    children: <Lsi lsi={LsiData.update} />,
                    icon: "mdi-update",
                    onClick: () => {
                      setModalHeader(<Lsi lsi={LsiData.userUpdate} />);
                      setModalContentProps({ handlerMap: cellProps.data.handlerMap, user: cellProps.data.data });
                      setOpen(true);
                    },
                  },
                  {
                    children: <Lsi lsi={LsiData.delete} />,
                    icon: "mdi-delete",
                    colorScheme: "negative",
                    onClick: () => {
                      setUserForDelete(cellProps);
                      setDialogOpen(true);
                    },
                  },
                ]}
              />
            );
          },
          fixed: "right",
          width: 48,
          cellPadding: "0 8px",
        },
      ];
    }

    function handleUserDelete() {
      userForDelete.data.handlerMap
        .delete({ id: userForDelete.data.id })
        .then(() => {
          addAlert({ message: <Lsi lsi={LsiData.successMessageUserDeleted} />, priority: "success", durationMs: 3000 });
        })
        .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
    }
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
        {open && (
          <Modal open onClose={() => setOpen(false)} header={modalHeader} closeOnOverlayClick>
            <UserFrom onClose={() => setOpen(false)} {...modalContentProps} />
          </Modal>
        )}
        {dialogOpen && (
          <Dialog
            open
            header={<Lsi lsi={LsiData.userDelete} />}
            onClose={() => setDialogOpen(false)}
            actionDirection="horizontal"
            actionList={[
              {
                children: <Lsi lsi={LsiData.delete} />,
                colorScheme: "negative",
                onClick: handleUserDelete,
              },
              {
                children: <Lsi lsi={LsiData.cancel} />,
                onClick: () => setDialogOpen(false),
              },
            ]}
          />
        )}
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default UsersListView;
