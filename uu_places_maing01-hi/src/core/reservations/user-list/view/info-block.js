//@@viewOn:imports
import { createVisualComponent, PropTypes, useMemo, useScreenSize, useSession, Lsi } from "uu5g05";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  wrapper: () => Config.Css.css`
    display: flex;
    justify-content: flex-end;
  `,
  main: (screenSize) => Config.Css.css`
    width: 230px;
    border: 1px solid ${Constants.mainColor};
    border-radius: 6px;
    height: auto;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-right: ${screenSize === "s" || screenSize === "xs" ? "0px" : "52px"};
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
    reservationsDataList: PropTypes.object,
    selectedDate: PropTypes.object,
    placesDataObject: PropTypes.object,
    isReservationOpenedBySelectedDay: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render({ reservationsDataList, selectedDate, isReservationOpenedBySelectedDay, placesDataObject }) {
    //@@viewOn:hooks
    const { uuIdentity } = useSession().identity;
    const screenSize = useScreenSize();

    const reservation = useMemo(() => {
      return reservationsDataList.data.find((reservation) => {
        if (reservation.data.user.uuIdentity === uuIdentity) {
          return DateTimeHelper.isBetween(selectedDate, reservation.data.dayFrom, reservation.data.dayTo);
        }
      });
    }, [reservationsDataList, selectedDate]);
    //@@viewOff:hooks

    //@@viewOn:private
    function _getChild() {
      if (reservation) {
        return <Lsi lsi={LsiData.yourParkingPlace} params={{ number: reservation.data.parkingPlace.number }} />;
      } else if (!isReservationOpenedBySelectedDay) {
        const { dayOfStartReservations, hourOfStartReservations } = placesDataObject.data.reservationsConfig;
        const dayName = DateTimeHelper.getDayName(dayOfStartReservations - 1);
        return `${(<Lsi lsi={LsiData.notOpened} />)} ${dayName} at ${hourOfStartReservations}:00`;
      } else return <Lsi lsi={LsiData.noReservation} />;
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface
    //@@viewOn:render
    return (
      <div className={Css.wrapper()}>
        <div className={Css.main(screenSize)}>{_getChild()}</div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default InfoBlock;
