//@@viewOn:imports
import { Form, FormSelect, FormDate, SubmitButton, CancelButton, ResetButton } from "uu5g05-forms";
import { createVisualComponent, PropTypes, Lsi, useState } from "uu5g05";
import { useAlertBus, Dialog } from "uu5g05-elements";
import Config from "./config/config.js";
import Constants from "../../helpers/constants.js";
import ComponentsHelper from "../../helpers/components-helper.js";
import DateTimeHelper from "../../helpers/date-time-helper.js";
import LsiData from "../../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReservationFrom",
  dateFormat: "YYYY-MM-DD",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  grid: () => Config.Css.css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  `,
  controls: () => Config.Css.css`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
  `,
};

export const ReservationFrom = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservation: PropTypes.object,
    usersDataList: PropTypes.array,
    parkingPlacesDataList: PropTypes.array,
    onClose: PropTypes.func,
    handlerMap: PropTypes.object,
    user: PropTypes.object,
    parkingPlace: PropTypes.object,
    renderDeleteButton: PropTypes.bool,
    isReservationOpened: PropTypes.bool,
    isAdminView: PropTypes.bool,
    isAllParkingPlacesReserved: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    renderDeleteButton: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    const {
      reservation,
      user,
      handlerMap,
      onClose,
      parkingPlace,
      parkingPlacesDataList,
      usersDataList,
      renderDeleteButton,
      isReservationOpened,
      isAdminView,
      isAllParkingPlacesReserved,
      selectedDate,
    } = props;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    const [open, setOpen] = useState(false);
    //@@viewOff:hooks

    //@@viewOn:private
    function handleOnSubmitClick({ data }) {
      if (reservation) {
        handlerMap
          .update({ ...data.value, id: reservation.id, revision: reservation.sys.rev })
          .then(() => {
            addAlert({ message: <Lsi lsi={LsiData.successMessageUpdated} />, priority: "success", durationMs: 3000 });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      } else {
        handlerMap
          .create(data.value)
          .then(() => {
            addAlert({ message: <Lsi lsi={LsiData.successMessageCreated} />, priority: "success", durationMs: 3000 });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      }
    }

    function getParkingPlacesItemList() {
      if (parkingPlace) {
        return [{ value: parkingPlace.data.id, children: parkingPlace.data.number }];
      } else {
        const surfacePlaces = [];
        const undergroundPlaces = [];
        parkingPlacesDataList.forEach((place) => {
          const { type, id, number } = place.data;
          if (type === Constants.ParkingPlace.surface) {
            surfacePlaces.push({ value: id, children: number });
          } else undergroundPlaces.push({ value: id, children: number });
        });
        return [...surfacePlaces, ...undergroundPlaces];
      }
    }

    function getParkingPlaceValue() {
      if (reservation) return reservation.parkingPlaceId;
      else if (parkingPlace) return parkingPlace.data.id;
    }

    function getUsersItemList() {
      const itemList = [];
      if (user) {
        itemList.push({ value: user.data.id, children: ComponentsHelper.getBusinessCart(user.data.uuIdentity) });
      } else {
        usersDataList.forEach((user) => {
          itemList.push({ value: user.data.id, children: ComponentsHelper.getBusinessCart(user.data.uuIdentity) });
        });
      }
      return itemList;
    }

    function getDateFrom() {
      const date = reservation ? new Date(reservation.dayFrom) : new Date();
      return DateTimeHelper.formatDate(date, STATICS.dateFormat);
    }

    function getDateTo() {
      if (isAdminView) return null;
      else if (!reservation && isReservationOpened) return DateTimeHelper.getEndOnNextWeek(STATICS.dateFormat);
      else if (!reservation && !isReservationOpened) return DateTimeHelper.getEndOnCurrentWeek(STATICS.dateFormat);
      return DateTimeHelper.formatDate(new Date(reservation.dayTo), STATICS.dateFormat);
    }

    function _getConfirmModalContent() {
      return (
        <div>
          <Lsi lsi={LsiData.confirmDelete} />
          <br />
          {`${reservation.dayFrom} <--> ${reservation.dayTo}`}
          <br />
          <Lsi lsi={LsiData.areYouSure} />
        </div>
      );
    }
    function handleOnReservationDelete() {
      handlerMap
        .delete({ sendMessage: isAllParkingPlacesReserved })
        .then(() => {
          onClose();
          addAlert({ message: <Lsi lsi={LsiData.successMessageDeleted} />, priority: "success", durationMs: 3000 });
        })
        .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
    }
    function getUserListValue() {
      if (reservation) return reservation.userId;
      else if (user) {
        return user.data.id;
      } else return null;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Form onSubmit={handleOnSubmitClick}>
        <FormSelect
          name={Constants.Reservation.formNames.userId}
          label={<Lsi lsi={LsiData.user} />}
          required
          initialValue={getUserListValue()}
          readOnly={!!user}
          itemList={getUsersItemList()}
        />
        <div className={CLASS_NAMES.grid()}>
          <FormDate
            label={<Lsi lsi={LsiData.dayFrom} />}
            required
            name="dayFrom"
            min={getDateFrom()}
            max={getDateTo()}
            initialValue={
              reservation
                ? DateTimeHelper.formatDate(reservation.dayFrom, STATICS.dateFormat)
                : DateTimeHelper.formatDate(selectedDate, STATICS.dateFormat)
            }
          />
          <FormDate
            label={<Lsi lsi={LsiData.dayTo} />}
            required
            name="dayTo"
            min={getDateFrom()}
            max={getDateTo()}
            {...(reservation && { initialValue: DateTimeHelper.formatDate(reservation.dayTo, STATICS.dateFormat) })}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormSelect
            name={Constants.Reservation.formNames.parkingPlaceId}
            label={<Lsi lsi={LsiData.parkingPlace} />}
            required
            initialValue={getParkingPlaceValue()}
            readOnly={!!parkingPlace}
            itemList={getParkingPlacesItemList()}
          />
        </div>
        <div className={CLASS_NAMES.controls()}>
          <SubmitButton
            style={{ marginRight: "8px" }}
            lsi={{ submit: reservation ? LsiData.update : LsiData.create }}
          />
          <CancelButton style={{ marginRight: renderDeleteButton ? "8px" : "0px" }} onClick={onClose} />
          {renderDeleteButton && (
            <ResetButton colorScheme="negative" lsi={{ reset: LsiData.delete }} onClick={() => setOpen(true)} />
          )}
        </div>
        {open && (
          <Dialog
            open
            header={<Lsi lsi={LsiData.reservationDelete} />}
            onClose={() => setOpen(false)}
            actionDirection="horizontal"
            info={_getConfirmModalContent()}
            actionList={[
              {
                children: <Lsi lsi={LsiData.cancel} />,
                onClick: () => setOpen(false),
              },
              {
                children: <Lsi lsi={LsiData.delete} />,
                colorScheme: "negative",
                onClick: handleOnReservationDelete,
              },
            ]}
          />
        )}
      </Form>
    );
    //@@viewOff:render
  },
});

export default ReservationFrom;
