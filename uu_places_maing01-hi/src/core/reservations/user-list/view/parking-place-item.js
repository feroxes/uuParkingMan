//@@viewOn:imports
import { createVisualComponent, PropTypes, useSession, Lsi, useState } from "uu5g05";
import { Modal, Tile, Icon } from "uu5g05-elements";
import Config from "../../config/config.js";
import ParkingPlaceNumber from "./parking-place-number.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
import ComponentsHelper from "../../../../helpers/components-helper.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import ReservationFrom from "../../reservation-form.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:css
const CLASS_NAMES = {
  main: () => Config.Css.css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 16px;
  `,
  tileHeader: () => Config.Css.css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  `,
  footerPlaceholder: () => Config.Css.css`
    height: 36px;
    background-color: rgb(245, 245, 245);
    border-color: transparent;
    border-width: 1px;
    border-style: hidden;
  `,
};

//@@viewOff:css
export const ParkingPlaceItem = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ParkingPlaceItem",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    data: PropTypes.object,
    reservationsDataList: PropTypes.object,
    usersDataList: PropTypes.object,
    selectedDate: PropTypes.object,
    disabled: PropTypes.bool,
    isReservationOpened: PropTypes.bool,
    isAllParkingPlacesReserved: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render(props) {
    const {
      data,
      reservationsDataList,
      selectedDate,
      usersDataList,
      disabled,
      isReservationOpened,
      isAllParkingPlacesReserved,
    } = props;
    //@@viewOn:hooks
    const [open, setOpen] = useState(false);
    const session = useSession();
    const isParkingPlaceReserved = ReservationHelper.isParkingPlaceReserved(
      data.data.id,
      reservationsDataList.data,
      selectedDate
    );
    const reservation = isParkingPlaceReserved
      ? ReservationHelper.findReservation(data.data.id, reservationsDataList.data, selectedDate)
      : null;

    const reservedBy = isParkingPlaceReserved
      ? ReservationHelper.getReservationUser(reservation, usersDataList.data)
      : null;

    const user = ReservationHelper.getUser(usersDataList, session);

    const isUserOwnerOfReservation = isParkingPlaceReserved
      ? ReservationHelper.isUserOwnerOfReservation(reservedBy.data.uuIdentity, session)
      : false;
    //@@viewOff:hooks

    //@@viewOn:private
    function isUnavailable() {
      return (
        disabled ||
        DateTimeHelper.isDateInPast(selectedDate) ||
        (isParkingPlaceReserved && !isUserOwnerOfReservation) ||
        data.data.isBlocked
      );
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Tile
          borderRadius="moderate"
          header={
            <div className={CLASS_NAMES.tileHeader()}>
              {isUnavailable() ? (
                <Icon icon="mdi-lock" colorScheme="negative" />
              ) : (
                <Icon icon="mdi-check-outline" colorScheme="active" />
              )}
            </div>
          }
          headerSignificance="distinct"
          headerColorScheme="building"
          significance={isUnavailable() ? "subdued" : "common"}
          footer={
            isParkingPlaceReserved ? (
              ComponentsHelper.getBusinessCart(reservedBy.data.uuIdentity)
            ) : (
              <div className={CLASS_NAMES.footerPlaceholder()} />
            )
          }
          footerSignificance="distinct"
          footerColorScheme="building"
          onClick={isUnavailable() ? null : () => setOpen(true)}
          height={190}
        >
          <div className={CLASS_NAMES.main()}>
            <ParkingPlaceNumber number={data.data.number.toString()} />
          </div>
        </Tile>
        {open && (
          <Modal
            open
            closeOnOverlayClick
            onClose={() => setOpen(false)}
            header={<Lsi lsi={isUserOwnerOfReservation ? LsiData.reservationUpdate : LsiData.createReservation} />}
          >
            <ReservationFrom
              onClose={() => setOpen(false)}
              user={isUserOwnerOfReservation ? reservedBy : user}
              reservation={isUserOwnerOfReservation ? reservation.data : null}
              parkingPlace={data}
              handlerMap={isUserOwnerOfReservation ? reservation.handlerMap : reservationsDataList.handlerMap}
              renderDeleteButton={isUserOwnerOfReservation}
              isAllParkingPlacesReserved={isAllParkingPlacesReserved}
              isReservationOpened={isReservationOpened}
              selectedDate={selectedDate}
            />
          </Modal>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default ParkingPlaceItem;
