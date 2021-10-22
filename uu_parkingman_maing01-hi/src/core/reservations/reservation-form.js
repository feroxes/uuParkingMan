//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi } from "uu5g04-hooks";
import Config from "./config/config.js";
import Constants from "../../helpers/constants.js";
import { useContextAlert } from "../managers/alert-manager.js";
import ComponentsHelper from "../../helpers/components-helper.js";
import DateTimeHelper from "../../helpers/date-time-helper.js";
import Lsi from "./reservations-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ReservationFrom",
  nestingLevel: "bigBox",
  dateFormat: "YYYY-MM-DD",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Config.Css.css``,
  controls: () => Config.Css.css`
    > *:last-child {
      background-color: ${Constants.mainColor} !important;
    }
  `,
  formItem: () => Config.Css.css`
    width: 100%;
    .uu5-forms-input-wrapper {
      width: 100%;
    }
  `,
};

export const ReservationFrom = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservation: UU5.PropTypes.object,
    usersDataList: UU5.PropTypes.array,
    parkingPlacesDataList: UU5.PropTypes.array,
    modal: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const parkingPlaceLsi = useLsi(Lsi.parkingPlace);
    const userLsi = useLsi(Lsi.user);
    const reservationDatesLsi = useLsi(Lsi.reservationDates);
    const showAlert = useContextAlert();
    //@@viewOff:hooks

    //@@viewOn:private
    function _handleOnSubmitClick(opt) {
      if (props.reservation) {
        props.handlerMap
          .update({ ..._getDtoIn(opt.values), id: props.reservation.id, revision: props.reservation.sys.rev })
          .then(() => {
            showAlert(<UU5.Bricks.Lsi lsi={Lsi.successMessage("updated")} />);
            props.modal.close();
          })
          .catch((e) => showAlert(e.message, false));
      } else {
        props.handlerMap
          .create(_getDtoIn(opt.values))
          .then(() => showAlert(<UU5.Bricks.Lsi lsi={Lsi.successMessage("created")} />))
          .catch((e) => showAlert(e.message, false));
      }
    }

    function _getDtoIn(values) {
      return {
        userId: values.userId,
        parkingPlaceId: values.parkingPlaceId,
        dayFrom: DateTimeHelper.formatDate(values.daysRange[0], STATICS.dateFormat),
        dayTo: DateTimeHelper.formatDate(values.daysRange[1], STATICS.dateFormat),
      };
    }

    function _getParkingPlacesOptions() {
      const { parkingPlacesDataList } = props;
      const surfacePlaces = [];
      const undergroundPlaces = [];
      parkingPlacesDataList.forEach((place, key) => {
        const { type, id, number } = place.data;
        if (type === Constants.ParkingPlace.surface) {
          surfacePlaces.push(<UU5.Forms.Select.Option value={id} content={number} key={key} />);
        } else undergroundPlaces.push(<UU5.Forms.Select.Option value={id} content={number} key={key} />);
      });

      return [...surfacePlaces, ...undergroundPlaces];
    }

    function _getUsersOptions() {
      const { usersDataList } = props;
      return usersDataList.map((user, key) => {
        return (
          <UU5.Forms.Select.Option
            value={user.data.id}
            content={ComponentsHelper.getBusinessCart(user.data.uuIdentity)}
            key={key}
          />
        );
      });
    }

    function _getDateFrom() {
      const date = props.reservation ? new Date(props.reservation.dayFrom) : new Date();
      return DateTimeHelper.formatDate(date, STATICS.dateFormat);
    }

    function _getDateTo() {
      if (!props.reservation) return null;
      return DateTimeHelper.formatDate(new Date(props.reservation.dayTo), STATICS.dateFormat);
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
    const { reservation } = props;
    return (
      <UU5.Forms.Form
        {...attrs}
        labelColWidth="xs-12"
        colWidth="xs-12"
        onCancel={props.modal.close}
        onSave={_handleOnSubmitClick}
      >
        <UU5.Forms.Select
          className={CLASS_NAMES.formItem()}
          name={Constants.Reservation.formNames.userId}
          label={userLsi}
          required
          value={reservation && reservation.userId}
        >
          {_getUsersOptions()}
        </UU5.Forms.Select>
        <UU5.Forms.DateRangePicker
          className={CLASS_NAMES.formItem()}
          name={Constants.Reservation.formNames.daysRange}
          label={reservationDatesLsi}
          required
          value={
            reservation && [
              DateTimeHelper.formatDate(reservation.dayFrom, STATICS.dateFormat),
              DateTimeHelper.formatDate(reservation.dayTo, STATICS.dateFormat),
            ]
          }
          dateFrom={_getDateFrom()}
          dateTo={_getDateTo()}
          hideFormatPlaceholder
          hideWeekNumber
          showTodayButton
          format="dd-mm-Y"
        />
        <UU5.Forms.Select
          className={CLASS_NAMES.formItem()}
          name={Constants.Reservation.formNames.parkingPlaceId}
          label={parkingPlaceLsi}
          required
          value={reservation && reservation.parkingPlaceId}
        >
          {_getParkingPlacesOptions()}
        </UU5.Forms.Select>
        <UU5.Forms.Controls className={CLASS_NAMES.controls()} />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  },
});

export default ReservationFrom;
