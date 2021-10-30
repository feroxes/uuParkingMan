//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../config/config.js";
import ParkingPlaceNumber from "./parking-place-number.js";
import { useContextModal } from "../../../managers/modal-manager.js";
import Constants from "../../../../helpers/constants.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
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
  render(props) {
    //@@viewOn:hooks
    const modal = useContextModal();
    const isParkingPlaceReserved = ReservationHelper.isParkingPlaceReserved(
      props.data.data.id,
      props.reservationsDataList.data,
      props.selectedDate
    );
    const reservation = ReservationHelper.findReservation(
      props.data.data.id,
      props.reservationsDataList.data,
      props.selectedDate
    );
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Bricks.Button className={Css.main()} bgStyle="transparent" disabled={isParkingPlaceReserved}>
        <ParkingPlaceNumber number={props.data.data.number.toString()} />
        {isParkingPlaceReserved && (
          <>
            <span>Reserved by: {reservation.data.userId}</span>
          </>
        )}
      </UU5.Bricks.Button>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default ParkingPlaceItem;
