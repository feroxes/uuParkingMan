//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useSession, useMemo, useLsi, useScreenSize } from "uu5g04-hooks";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import Lsi from "../../reservations-lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  wrapper: () => Config.Css.css`
    display: flex;
    justify-content: flex-end;
  `,
  main: (screenSize) => Config.Css.css`
    width: 230px;
    border: 2px solid ${Constants.mainColor};
    border-radius: 4px;
    height: auto;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: ${screenSize === "s" || screenSize === 'xs' ? "0px" : "52px"};
  `,
};

//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "InfoBlock",
  //@@viewOff:statics
};

export const InfoBlock = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: UU5.PropTypes.object,
    selectedDate: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render({ reservationsDataList, selectedDate }) {
    //@@viewOn:hooks
    const noReservationLsi = useLsi(Lsi.noReservation);
    const yourParkingPlaceLsi = useLsi(Lsi.yourParkingPlace);

    const { uuIdentity } = useSession().identity;
    const screenSize = useScreenSize();
    console.log('----->screenSize<-----', screenSize);

    const reservation = useMemo(() => {
      return reservationsDataList.data.find((reservation) => {
        if (reservation.data.user.uuIdentity === uuIdentity) {
          return DateTimeHelper.isBetween(selectedDate, reservation.data.dayFrom, reservation.data.dayTo);
        }
      });
    }, [reservationsDataList, selectedDate]);
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <div className={Css.wrapper()}>
        <div className={Css.main(screenSize)}>
          {reservation ? `${yourParkingPlaceLsi} ${reservation.data.parkingPlace.number}` : noReservationLsi}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default InfoBlock;
