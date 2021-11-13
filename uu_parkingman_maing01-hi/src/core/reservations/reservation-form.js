//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useRef } from "uu5g04-hooks";
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
    user: UU5.PropTypes.object,
    parkingPlace: UU5.PropTypes.object,
    renderDeleteButton: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    renderDeleteButton: false,
  },
  //@@viewOff:defaultProps

  render({
    reservation,
    user,
    handlerMap,
    modal,
    parkingPlace,
    parkingPlacesDataList,
    usersDataList,
    renderDeleteButton,
  }) {
    //@@viewOn:hooks
    const parkingPlaceLsi = useLsi(Lsi.parkingPlace);
    const userLsi = useLsi(Lsi.user);
    const reservationDatesLsi = useLsi(Lsi.reservationDates);
    const showAlert = useContextAlert();
    const confirmModalRef = useRef();
    //@@viewOff:hooks

    //@@viewOn:private
    function _handleOnSubmitClick(opt) {
      if (reservation) {
        handlerMap
          .update({ ..._getDtoIn(opt.values), id: reservation.id, revision: reservation.sys.rev })
          .then(() => {
            showAlert(<UU5.Bricks.Lsi lsi={Lsi.successMessage("updated")} />);
            modal.close();
          })
          .catch((e) => showAlert(e.message, false));
      } else {
        handlerMap
          .create(_getDtoIn(opt.values))
          .then(() => {
            showAlert(<UU5.Bricks.Lsi lsi={Lsi.successMessage("created")} />)
            modal.close();
          })
          .catch((e) => showAlert(e.message, false));
      }
    }

    function _handleOnDeleteClick() {
      confirmModalRef.current.open();
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
      if (parkingPlace) {
        return <UU5.Forms.Select.Option value={parkingPlace.data.id} content={parkingPlace.data.number} />;
      } else {
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
    }

    function _getParkingPlaceValue() {
      if (reservation) return reservation.parkingPlaceId;
      else if (parkingPlace) return parkingPlace.data.id;
    }

    function _getUsersOptions() {
      if (user) {
        return (
          <UU5.Forms.Select.Option
            value={user.data.id}
            content={ComponentsHelper.getBusinessCart(user.data.uuIdentity)}
          />
        );
      } else {
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
    }

    function _getUserListValue() {
      if (reservation) return reservation.userId;
      else if (user) {
        return user.data.id;
      }
    }

    function _getDateFrom() {
      const date = reservation ? new Date(reservation.dayFrom) : new Date();
      return DateTimeHelper.formatDate(date, STATICS.dateFormat);
    }

    function _getDateTo() {
      if (!reservation) return null;
      return DateTimeHelper.formatDate(new Date(reservation.dayTo), STATICS.dateFormat);
    }

    function _getConfirmModalContent() {
      return (
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <div>Your reservation</div>
          <div>
            {reservation.dayFrom} {"<—>"} {reservation.dayTo}
          </div>
          <div>will be deleted.</div>
          <div>Are you sure?</div>
        </div>
      );
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <UU5.Forms.Form
        labelColWidth="xs-12"
        colWidth="xs-12"
        onCancel={modal.close}
        onSave={_handleOnSubmitClick}
        onReset={_handleOnDeleteClick}
      >
        <UU5.Forms.Select
          className={CLASS_NAMES.formItem()}
          name={Constants.Reservation.formNames.userId}
          label={userLsi}
          required
          readOnly={!!user}
          value={_getUserListValue()}
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
          popoverLocation="portal"
        />
        <UU5.Forms.Select
          className={CLASS_NAMES.formItem()}
          name={Constants.Reservation.formNames.parkingPlaceId}
          label={parkingPlaceLsi}
          required
          readOnly={!!parkingPlace}
          value={_getParkingPlaceValue()}
        >
          {_getParkingPlacesOptions()}
        </UU5.Forms.Select>
        <UU5.Forms.Controls
          className={CLASS_NAMES.controls()}
          buttonReset={renderDeleteButton}
          buttonResetProps={{
            content: useLsi(Lsi.delete),
            bgStyle: "filled",
            colorSchema: "danger",
          }}
        />
        {renderDeleteButton && (
          <UU5.Bricks.ConfirmModal
            header={useLsi(Lsi.reservationDelete)}
            content={_getConfirmModalContent()}
            onConfirm={() => {
              handlerMap.delete();
              modal.close();
            }}
            confirmButtonProps={{ colorSchema: "danger" }}
            ref_={confirmModalRef}
          />
        )}
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  },
});

export default ReservationFrom;
