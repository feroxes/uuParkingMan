//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession } from "uu5g04-hooks";
import Config from "../../config/config.js";
import ParkingPlaceNumber from "./parking-place-number.js";
import { useContextModal } from "../../../managers/modal-manager.js";
import Constants from "../../../../helpers/constants.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
import ComponentsHelper from "../../../../helpers/components-helper.js";
import ReservationFrom from "../../reservation-form.js";
import Lsi from "../../reservations-lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
    width: 100%;
    border: 1px solid ${Constants.mainColor};
    border-radius: 4px;
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

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParkingPlaceItem",
  //@@viewOff:statics
};

export const ParkingPlaceItem = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: UU5.PropTypes.object,
    usersDataList: UU5.PropTypes.object,
    selectedDate: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render({ data, reservationsDataList, selectedDate, usersDataList }) {
    //@@viewOn:hooks
    const modal = useContextModal();
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
    function _handleOnParkingPlaceClick() {
      if (isUserOwnerOfReservation) return _handleOnReservationUpdate();
      else return _handleOnReservationCreate();
    }

    function _handleOnReservationUpdate() {
      modal.open({
        header: <UU5.Bricks.Lsi lsi={Lsi.reservationUpdate} />,
        content: (
          <ReservationFrom
            modal={modal}
            user={reservedBy}
            reservation={reservation.data}
            parkingPlace={data}
            handlerMap={reservation.handlerMap}
          />
        ),
        size: "m",
      });
    }

    function _handleOnReservationCreate() {
      modal.open({
        header: <UU5.Bricks.Lsi lsi={Lsi.createReservation} />,
        content: (
          <ReservationFrom modal={modal} user={user} parkingPlace={data} handlerMap={reservationsDataList.handlerMap} />
        ),
        size: "m",
      });
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <UU5.Bricks.Button
        className={Css.main()}
        bgStyle="transparent"
        disabled={isParkingPlaceReserved && !isUserOwnerOfReservation}
        onClick={_handleOnParkingPlaceClick}
      >
        <ParkingPlaceNumber number={data.data.number.toString()} />
        {isParkingPlaceReserved && (
          <div className={Css.reservedBy()}>
            <span>Reserved by:</span>
            {ComponentsHelper.getBusinessCart(reservedBy.data.uuIdentity)}
            {reservedBy.data.transport && (
              <>
                <div>{`${reservedBy.data.transport.brand} ${reservedBy.data.transport.model}`}</div>
                <div>{reservedBy.data.transport.number}</div>
              </>
            )}
          </div>
        )}
      </UU5.Bricks.Button>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default ParkingPlaceItem;
