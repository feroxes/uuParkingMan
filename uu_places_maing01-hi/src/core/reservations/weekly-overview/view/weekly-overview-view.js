//@@viewOn:imports
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";
import UuBookigyWorkplace from "uu_bookigy_workplaceg01-uu5";
import { createVisualComponent, useState, useMemo, useLsi, useSession } from "uu5g04-hooks";
import Config from "../../config/config.js";
import { useContextAlert } from "../../../managers/alert-manager.js";
import { useContextModal } from "../../../managers/modal-manager.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
import ReservationFrom from "../../reservation-form.js";
import Lsi from "../weekly-overview-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "WeeklyOverviewView",
  nestingLevel: "bigBox",
  //@@viewOff:statics
};

const Css = {
  calendarDateSelect: () => Config.Css.css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    .uu5-calendar-simple-calendar-selected {
      background: #ECECEC;
      color: #9E9E9E;
    }
  `,
  table: () => Config.Css.css`
    margin: 0 20px;
  `,

  tableCell: () => Config.Css.css`
    background-color: #FAFAFA;
  `,
};

export const WeeklyOverviewView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: UU5.PropTypes.object,
    parkingPlacesDataList: UU5.PropTypes.object,
    usersDataList: UU5.PropTypes.object,
    selectedDate: UU5.PropTypes.object,
    useLoggedInUser: UU5.PropTypes.bool,
    isReservationOpenedBySelectedDay: UU5.PropTypes.bool,
    isReservationOpened: UU5.PropTypes.bool,
    isAdminView: UU5.PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const session = useSession();

    const weeklyOverviewLsi = useLsi(Lsi.weeklyOverview);
    const freeForReservationLsi = useLsi(Lsi.freeForReservation);
    const reservedByLsi = useLsi(Lsi.reservedBy);

    const showAlert = useContextAlert();
    const modal = useContextModal();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const _selectedDate = props.selectedDate || selectedDate;

    const week = useMemo(() => DateTimeHelper.getWeek(_selectedDate), [_selectedDate]);
    const weekRange = useMemo(() => DateTimeHelper.getRange(week.start, week.end), [week]);
    const weekDays = useMemo(() => [...DateTimeHelper.getWeekDays().slice(1), DateTimeHelper.getWeekDays()[0]], []);

    const user = ReservationHelper.getUser(props.usersDataList, session);
    //@@viewOff:hooks

    //@@viewOn:private
    function _getTableBody() {
      return (
        <UU5.Bricks.Table.TBody>
          {props.parkingPlacesDataList.data.map((parkingPlace, key) => {
            return (
              <UU5.Bricks.Table.Tr key={key}>
                <UU5.Bricks.Table.Td content={<b>{parkingPlace.data.number}</b>} />
                {weekRange.map((date, key) => {
                  const isDateInPast = DateTimeHelper.isDateInPast(date);
                  const { isParkingPlaceReserved, reservation } = ReservationHelper.isParkingPlaceReserved(
                    parkingPlace.data.id,
                    props.reservationsDataList.data,
                    date,
                    true
                  );
                  return (
                    <UU5.Bricks.Table.Td
                      key={key}
                      className={key > 4 && Css.tableCell()}
                      content={_getReservationAvailability(
                        isParkingPlaceReserved,
                        isDateInPast,
                        reservation,
                        parkingPlace
                      )}
                    />
                  );
                })}
              </UU5.Bricks.Table.Tr>
            );
          })}
        </UU5.Bricks.Table.TBody>
      );
    }

    function _getReservationAvailability(isParkingPlaceReserved, isDateInPast, reservation, parkingPlace) {
      if (isParkingPlaceReserved) {
        return (
          <UU5.Bricks.Button
            content={<UU5.Bricks.Icon icon="mdi-close-circle" />}
            bgStyle="outline"
            colorSchema="red"
            borderRadius="50%"
            onClick={() => {
              showAlert(
                <>
                  {reservedByLsi}
                  <Plus4U5.Bricks.BusinessCard
                    uuIdentity={reservation.data.user.uuIdentity}
                    visual="inline"
                    infoDetail="full"
                    showUuIdentity
                  />
                </>,
                false
              );
            }}
          />
        );
      } else {
        return (
          <UU5.Bricks.Button
            content={<UU5.Bricks.Icon icon="mdi-checkbox-marked-circle" />}
            bgStyle="outline"
            colorSchema="green"
            disabled={_isDisabled(isDateInPast)}
            borderRadius="50%"
            tooltip={freeForReservationLsi}
            onClick={() => {
              modal.open({
                header: <UU5.Bricks.Lsi lsi={Lsi.reservationCreate} />,
                content: (
                  <ReservationFrom
                    modal={modal}
                    reservation={reservation}
                    parkingPlace={parkingPlace}
                    usersDataList={props.usersDataList.data}
                    handlerMap={props.reservationsDataList.handlerMap}
                    user={props.useLoggedInUser && user}
                    isReservationOpened={props.isReservationOpened}
                    isAdminView={props.isAdminView}
                  />
                ),
                size: "m",
              });
            }}
          />
        );
      }
    }

    function _isDisabled(isDateInPast) {
      if (props.isAdminView) return false;
      else if (isDateInPast || !props.isReservationOpenedBySelectedDay) return true;
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        {!props.selectedDate && (
          <UuBookigyWorkplace.Bricks.CalendarDateSelect
            className={Css.calendarDateSelect()}
            onSelectDate={(date) => setSelectedDate(new Date(date))}
          />
        )}
        <UU5.Bricks.Table header={weeklyOverviewLsi} responsive className={Css.table()} bordered>
          <UU5.Bricks.Table.THead>
            <UU5.Bricks.Table.Tr>
              <UU5.Bricks.Table.Th content="" />
              {weekDays.map((dayName, key) => {
                return <UU5.Bricks.Table.Th content={dayName} key={key} />;
              })}
            </UU5.Bricks.Table.Tr>
          </UU5.Bricks.Table.THead>
          {_getTableBody()}
        </UU5.Bricks.Table>
      </>
    );
    //@@viewOff:render
  },
});

export default WeeklyOverviewView;
