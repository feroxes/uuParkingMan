//@@viewOn:imports
import { createVisualComponent, PropTypes, useSession, Lsi, useState } from "uu5g05";
import { Modal, Tile, Icon, Text } from "uu5g05-elements";
import Config from "../../config/config.js";
import ParkingPlaceNumber from "./parking-place-number.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
import ComponentsHelper from "../../../../helpers/components-helper.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import ReservationFrom from "../../reservation-form.js";
import LsiData from "../../../../config/lsi.js";
import Constants from "../../../../helpers/constants.js";
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
  tileHeader: (ownerUuIdentity) => Config.Css.css`
    width: 100%;
    display: flex;
    align-items: center;
    height: 20px;
    justify-content: ${ownerUuIdentity ? "space-between" : "flex-end"};
  `,
  footerPlaceholder: () => Config.Css.css`
    height: 30px;
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

    function getTileHeader() {
      const { ownerUuIdentity } = data.data;
      return (
        <div className={CLASS_NAMES.tileHeader(ownerUuIdentity)}>
          <>
            {ownerUuIdentity && (
              <div>
                {ComponentsHelper.getBusinessCart(ownerUuIdentity, "xxs", "0")}
                <Icon icon="mdi-crown" colorScheme="yellow" size="m" />
              </div>
            )}
            <Icon
              icon={isUnavailable() ? "mdi-lock" : "mdi-check-outline"}
              colorScheme={isUnavailable() ? "negative" : "active"}
            />
          </>
        </div>
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
          header={getTileHeader()}
          headerSignificance="distinct"
          headerColorScheme="building"
          significance={isUnavailable() ? "subdued" : "common"}
          footer={
            isParkingPlaceReserved ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                {ComponentsHelper.getBusinessCart(reservedBy.data.uuIdentity, "xxs")}
                {Constants.space}
                <Text category="interface" segment="interactive" type="xsmall">
                  <Lsi lsi={LsiData.reserved} />
                </Text>
              </div>
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
