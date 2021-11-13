//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useRef, useState } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import ReservationFrom from "../../reservation-form.js";
import { useContextModal } from "../../../managers/modal-manager.js";
import StringHelper from "../../../../helpers/string-helper.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import ComponentsHelper from "../../../../helpers/components-helper.js";
import Lsi from "../../reservations-lsi.js";

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
  displayName: Config.TAG + "ReservationsListView",
  //@@viewOff:statics
};

export const ReservationsListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: UU5.PropTypes.object,
    usersDataList: UU5.PropTypes.array,
    parkingPlacesDataList: UU5.PropTypes.array,
    handlerMap: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    reservationsDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    const modal = useContextModal();
    const confirmModalHeaderLsi = useLsi(Lsi.reservationDelete);
    const confirmModalContentLsi = useLsi(Lsi.reservationDeleteConfirmation);

    const confirmModalRef = useRef();

    const [reservationForDelete, setReservationForDelete] = useState(null);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider data={props.reservationsDataList.data}>
        <Uu5Tiles.InfoBar sortable={false} />
        <Uu5Tiles.List
          alternateRowBackground
          rowPadding="8px 16px"
          columns={getColumns(props, modal, confirmModalRef, setReservationForDelete)}
        />
        <UU5.Bricks.ConfirmModal
          header={confirmModalHeaderLsi}
          content={confirmModalContentLsi}
          onConfirm={() => {
            reservationForDelete.data.handlerMap.delete();
          }}
          confirmButtonProps={{ colorSchema: "danger" }}
          ref_={confirmModalRef}
        />
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
function getColumns(props, modal, confirmModalRef, setReservationForDelete) {
  return [
    {
      header: <UU5.Bricks.Lsi lsi={Lsi.user} />,
      cell: (cellProps) => {
        const uuIdentity = props.usersDataList.find((user) => user.data.id === cellProps.data.data.userId).data
          .uuIdentity;
        return ComponentsHelper.getBusinessCart(uuIdentity);
      },
    },
    {
      header: <UU5.Bricks.Lsi lsi={Lsi.parkingPlace} />,
      cell: (cellProps) => {
        const parkingPlace = props.parkingPlacesDataList.find(
          (parkingPlace) => parkingPlace.data.id === cellProps.data.data.parkingPlaceId
        );
        return (
          <UU5.Bricks.Text
            content={parkingPlace.data.number}
            tooltip={StringHelper.capitalizeFirstLetter(parkingPlace.data.type)}
          />
        );
      },
    },
    {
      header: <UU5.Bricks.Lsi lsi={Lsi.reservationDates} />,
      cell: (cellProps) => {
        const { dayFrom, dayTo } = cellProps.data.data;
        return `${DateTimeHelper.formatDate(dayFrom, "DD.MM")} - ${DateTimeHelper.formatDate(dayTo, "DD.MM")}`;
      },
    },
    {
      header: <UU5.Bricks.Lsi lsi={Lsi.reservationDuration} />,
      cell: (cellProps) => {
        const { dayFrom, dayTo } = cellProps.data.data;
        return <UU5.Bricks.Lsi lsi={Lsi.days(DateTimeHelper.getDiffDays(dayFrom, dayTo))} />;
      },
    },
    {
      cell: () => null,
      header: (
        <UU5.Bricks.Button
          content={<UU5.Bricks.Icon icon="mdi-plus-circle" />}
          bgStyle="filled"
          onClick={() => onControlsBtnClick(props, modal)}
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
          <UU5.Bricks.Dropdown
            fitMenuToViewport
            popoverLocation="portal"
            items={[
              {
                label: <UU5.Bricks.Lsi lsi={Lsi.update} />,
                disabled: DateTimeHelper.isDateInPast(cellProps.data.data.dayTo),
                onClick: () => {
                  modal.open({
                    header: <UU5.Bricks.Lsi lsi={Lsi.reservationUpdate} />,
                    content: (
                      <ReservationFrom
                        modal={modal}
                        handlerMap={cellProps.data.handlerMap}
                        usersDataList={props.usersDataList}
                        parkingPlacesDataList={props.parkingPlacesDataList}
                        reservation={cellProps.data.data}
                      />
                    ),
                    size: "m",
                  });
                },
              },
              {
                label: <UU5.Bricks.Lsi lsi={Lsi.delete} />,
                disabled: DateTimeHelper.isDateInPast(cellProps.data.data.dayTo),
                onClick: () => {
                  setReservationForDelete(cellProps);
                  confirmModalRef.current.open(cellProps);
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
      width: 48,
      cellPadding: "0 16px",
    },
  ];
}
function onControlsBtnClick(props, modal) {
  let modalContent = {
    header: <UU5.Bricks.Lsi lsi={Lsi.createReservation} />,
    content: (
      <ReservationFrom
        modal={modal}
        handlerMap={props.handlerMap}
        usersDataList={props.usersDataList}
        parkingPlacesDataList={props.parkingPlacesDataList}
      />
    ),
    size: "m",
  };
  modal.open(modalContent);
}
//@@viewOff: helpers
export default ReservationsListView;
