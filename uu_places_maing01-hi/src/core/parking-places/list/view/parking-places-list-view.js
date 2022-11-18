//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi, useState } from "uu5g05";
import { Button, Dropdown, Modal, Tag, useAlertBus } from "uu5g05-elements";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import ParkingPlaceFrom from "../../parking-place-form.js";
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

export const ParkingPlacesListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ParkingPlacesListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    parkingPlacesDataList: PropTypes.object,
    handlerMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    parkingPlacesDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    const [open, setOpen] = useState(false);
    const [modalProps, setModalProps] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function getColumns() {
      return [
        { cell: (cellProps) => cellProps.data.data.number, header: <Lsi lsi={LsiData.number} /> },
        { cell: (cellProps) => <Lsi lsi={LsiData[cellProps.data.data.type]} />, header: <Lsi lsi={LsiData.type} /> },
        {
          cell: (cellProps) => {
            const { isBlocked } = cellProps.data.data;
            return (
              <Tag size="m" colorScheme={isBlocked ? "problem" : "active"}>
                <Lsi lsi={isBlocked ? LsiData.blocked : LsiData.free} />
              </Tag>
            );
          },
          header: <Lsi lsi={LsiData.status} />,
        },
        {
          cell: (cellProps) => {
            const { ownerUuIdentity } = cellProps.data.data;
            return ownerUuIdentity ? ComponentsHelper.getBusinessCart(ownerUuIdentity) : null;
          },
          header: <Lsi lsi={LsiData.ownerUuIdentity} />,
        },
        {
          cell: () => null,
          header: (
            <Button
              colorScheme="primary"
              icon="mdi-plus-circle"
              onClick={onControlsBtnClick}
              className={CLASS_NAMES.createBtn()}
            />
          ),
          width: 1,
          fixed: "right",
          isControls: true,
        },
        {
          key: "actions",
          cell: (cellProps) => {
            const { isBlocked } = cellProps.data.data;
            return (
              <Dropdown
                significance="subdued"
                itemList={[
                  {
                    children: <Lsi lsi={LsiData.update} />,
                    icon: "mdi-update",
                    onClick: () => {
                      setModalHeader(<Lsi lsi={LsiData.parkingPlaceUpdate} />);
                      setModalProps({ handlerMap: cellProps.data.handlerMap, parkingPlace: cellProps.data.data });
                      setOpen(true);
                    },
                  },
                  {
                    children: <Lsi lsi={isBlocked ? LsiData.unBlock : LsiData.block} />,
                    icon: isBlocked ? "mdi-lock-open" : "mdi-lock",
                    onClick: () => handleOnParkingPlaceBlock(cellProps.data),
                  },
                ]}
              />
            );
          },
          fixed: "right",
          width: 48,
          cellPadding: "0 16px",
        },
      ];
    }

    function handleOnParkingPlaceBlock(parkingLot) {
      const { isBlocked, id } = parkingLot.data;
      parkingLot.handlerMap
        .update({ id, isBlocked: !isBlocked })
        .then(() => {
          addAlert({
            message: <Lsi lsi={isBlocked ? LsiData.successfullyUnblocked : LsiData.successfullyBlocked} />,
            priority: "success",
            durationMs: 3000,
          });
        })
        .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
    }

    function onControlsBtnClick() {
      setModalHeader(<Lsi lsi={LsiData.createParkingPlace} />);
      setModalProps({ handlerMap: props.handlerMap });
      setOpen(true);
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={props.parkingPlacesDataList.data}>
        <Uu5Tiles.InfoBar sortable={false} />
        <Uu5Tiles.List alternateRowBackground rowPadding="8px 16px" columns={getColumns()} />
        {open && (
          <Modal open header={modalHeader} onClose={() => setOpen(false)} closeOnOverlayClick>
            <ParkingPlaceFrom onClose={() => setOpen(false)} {...modalProps} />
          </Modal>
        )}
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default ParkingPlacesListView;
