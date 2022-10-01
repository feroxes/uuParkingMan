//@@viewOn:imports
import { createVisualComponent, PropTypes, useState, Lsi } from "uu5g05";
import { Text, Button, Dropdown, Modal, Dialog, useAlertBus } from "uu5g05-elements";
import { Checkbox } from "uu5g05-forms";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import ReservationFrom from "../../reservation-form.js";
import StringHelper from "../../../../helpers/string-helper.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
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

export const ReservationsListView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReservationsListView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: PropTypes.object,
    usersDataList: PropTypes.array,
    parkingPlacesDataList: PropTypes.array,
    handlerMap: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    reservationsDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    const { reservationsDataList } = props;
    //@@viewOn:hooks
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [modalProps, setModalProps] = useState(null);
    const [modalHeader, setModalHeader] = useState(null);
    const [sendMessage, setSendMessage] = useState(false);
    const [reservationForDelete, setReservationForDelete] = useState(null);
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function getColumns() {
      return [
        {
          header: <Lsi lsi={LsiData.user} />,
          cell: (cellProps) => ComponentsHelper.getBusinessCart(cellProps.data.data.user.uuIdentity),
        },
        {
          header: <Lsi lsi={LsiData.parkingPlace} />,
          cell: (cellProps) => {
            return (
              <Text tooltip={StringHelper.capitalizeFirstLetter(cellProps.data.data.parkingPlace.type)}>
                {cellProps.data.data.parkingPlace.number}
              </Text>
            );
          },
        },
        {
          header: <Lsi lsi={LsiData.reservationDates} />,
          cell: (cellProps) => {
            const { dayFrom, dayTo } = cellProps.data.data;
            return `${DateTimeHelper.formatDate(dayFrom, "DD.MM")} - ${DateTimeHelper.formatDate(dayTo, "DD.MM")}`;
          },
        },
        {
          header: <Lsi lsi={LsiData.reservationDuration} />,
          cell: (cellProps) => {
            const { dayFrom, dayTo } = cellProps.data.data;
            return <Lsi lsi={LsiData.days} params={{ days: DateTimeHelper.getDiffDays(dayFrom, dayTo) }} />;
          },
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
                    disabled: DateTimeHelper.isDateInPast(cellProps.data.data.dayTo),
                    onClick: () => {
                      setModalHeader(<Lsi lsi={LsiData.reservationUpdate} />);
                      setModalProps({ handlerMap: cellProps.data.handlerMap, reservation: cellProps.data.data });
                      setOpen(true);
                    },
                  },
                  {
                    children: <Lsi lsi={LsiData.delete} />,
                    icon: "mdi-delete",
                    colorScheme: "negative",
                    disabled: DateTimeHelper.isDateInPast(cellProps.data.data.dayTo),
                    onClick: () => {
                      setReservationForDelete(cellProps);
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
    //@@viewOff:private

    //@@viewOn:handlers
    function onControlsBtnClick() {
      setModalHeader(<Lsi lsi={LsiData.createReservation} />);
      setModalProps({ handlerMap: props.handlerMap, isAdminView: true });
      setOpen(true);
    }

    function _handleReservationDelete() {
      reservationForDelete.data.handlerMap
        .delete({ sendMessage })
        .then(() => {
          addAlert({ message: <Lsi lsi={LsiData.successMessageDeleted} />, priority: "success", durationMs: 3000 });
        })
        .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
    }
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={reservationsDataList.data}>
        <Uu5Tiles.InfoBar sortable={false} />
        <Uu5Tiles.List alternateRowBackground rowPadding="8px 16px" columns={getColumns()} />
        {open && (
          <Modal open header={modalHeader} onClose={() => setOpen(false)} closeOnOverlayClick>
            <ReservationFrom
              usersDataList={props.usersDataList}
              parkingPlacesDataList={props.parkingPlacesDataList}
              onClose={() => setOpen(false)}
              {...modalProps}
            />
          </Modal>
        )}
        {dialogOpen && (
          <Dialog
            open
            header={<Lsi lsi={LsiData.reservationDelete} />}
            onClose={() => setDialogOpen(false)}
            actionDirection="horizontal"
            info={
              <>
                <Lsi lsi={LsiData.reservationDeleteConfirmation} />
                <Checkbox
                  style={{ margin: "0 56px" }}
                  name={Constants.Reservation.formNames.sendMessage}
                  label={LsiData.sendNotification}
                  value={sendMessage}
                  onChange={() => setSendMessage(!sendMessage)}
                />
              </>
            }
            actionList={[
              {
                children: <Lsi lsi={LsiData.delete} />,
                colorScheme: "negative",
                onClick: _handleReservationDelete,
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
export default ReservationsListView;
