//@@viewOn:imports
import { createVisualComponent, PropTypes, useSession, Lsi, useState } from "uu5g05";
import { Modal, Button } from "uu5g05-elements";
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
    border: 1px solid #2196F3;
    height: 180px;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;
    padding: 16px 0;
  `,
  reservedBy: () => Config.Css.css`
    display: flex;
    flex-direction: column;
    padding-top: 16px;
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
    function _isDisabled() {
      return (
        disabled || DateTimeHelper.isDateInPast(selectedDate) || (isParkingPlaceReserved && !isUserOwnerOfReservation)
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
        <Button
          width="100%"
          colorScheme="primary"
          borderRadius="moderate"
          className={CLASS_NAMES.main()}
          disabled={_isDisabled()}
          onClick={() => setOpen(true)}
          iconNotification
        >
          <ParkingPlaceNumber number={data.data.number.toString()} />
          {isParkingPlaceReserved && (
            <div className={CLASS_NAMES.reservedBy()}>
              <Lsi lsi={LsiData.reservedBy} />
              {ComponentsHelper.getBusinessCart(reservedBy.data.uuIdentity)}
            </div>
          )}
        </Button>
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
