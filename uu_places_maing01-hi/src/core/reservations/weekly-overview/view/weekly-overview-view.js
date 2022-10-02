//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, PropTypes, useState, useMemo, useSession, Lsi } from "uu5g05";
import { Text, Modal, Button } from "uu5g05-elements";
import UuBookigyWorkplace from "uu_bookigy_workplaceg01-uu5";
import Config from "../../config/config.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import ReservationHelper from "../../../../helpers/reservation-helper.js";
import ComponentsHelper from "../../../../helpers/components-helper.js";
import ReservationFrom from "../../reservation-form.js";
import Constants from "../../../../helpers/constants.js";
import LsiData from "../../../../config/lsi.js";
//@@viewOff:imports

const CLASS_NAMES = {
  calendarDateSelect: () => Config.Css.css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  `,

  tableCell: (key) => Config.Css.css`
    background-color: ${key > 4 ? "#FAFAFA" : "#FFFFFF"};
  `,
};

export const WeeklyOverviewView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "WeeklyOverviewView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    reservationsDataList: PropTypes.object,
    parkingPlacesDataList: PropTypes.object,
    usersDataList: PropTypes.object,
    selectedDate: PropTypes.object,
    useLoggedInUser: PropTypes.bool,
    isReservationOpenedBySelectedDay: PropTypes.bool,
    isReservationOpened: PropTypes.bool,
    isAdminView: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const session = useSession();
    const [open, setOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
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
                      className={CLASS_NAMES.tableCell(key)}
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
      if (isParkingPlaceReserved || parkingPlace.data.isBlocked) {
        return (
          <>
            <Button colorScheme="negative" borderRadius="full" icon="mdi-lock" />
            {Constants.space}
            {reservation && ComponentsHelper.getBusinessCart(reservation.data.user.uuIdentity)}
          </>
        );
      } else {
        return (
          <Button
            icon="mdi-checkbox-marked-circle"
            borderRadius="full"
            colorScheme="positive"
            disabled={_isDisabled(isDateInPast)}
            onClick={() => {
              setModalContent(
                <ReservationFrom
                  onClose={() => setOpen(false)}
                  reservation={reservation}
                  parkingPlace={parkingPlace}
                  usersDataList={props.usersDataList.data}
                  handlerMap={props.reservationsDataList.handlerMap}
                  user={props.useLoggedInUser && user}
                  isReservationOpened={props.isReservationOpened}
                  isAdminView={props.isAdminView}
                />
              );
              setOpen(true);
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
            className={CLASS_NAMES.calendarDateSelect()}
            onSelectDate={(date) => setSelectedDate(new Date(date))}
          />
        )}
        <div className="uu5-common-padding-s">
          <div style={{ marginBottom: "8px" }}>
            <Text category="interface" segment="title" type="common">
              <Lsi lsi={LsiData.weeklyOverview} />
            </Text>
          </div>
          <UU5.Bricks.Table responsive bordered>
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
        </div>
        {open && (
          <Modal open header={<Lsi lsi={LsiData.createReservation} />} onClose={() => setOpen(false)}>
            {modalContent}
          </Modal>
        )}
      </>
    );
    //@@viewOff:render
  },
});

export default WeeklyOverviewView;
