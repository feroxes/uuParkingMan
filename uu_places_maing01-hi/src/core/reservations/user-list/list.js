//@@viewOn:imports
import { createVisualComponent, useState, useMemo, Lsi } from "uu5g05";
import { Tabs } from "uu5g05-elements";
import { useSubAppData } from "uu_plus4u5g02";
import UuBookigyWorkplace from "uu_bookigy_workplaceg01-uu5";
import Config from "../config/config.js";
import useReservations from "../context/use-reservations.js";
import useUsers from "../../users/context/use-users.js";
import useParkingPlaces from "../../parking-places/context/use-parking-places.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import UserReservationsListView from "./view/user-reservations-list-view.js";
import WeeklyOverviewView from "../weekly-overview/view/weekly-overview-view.js";
import InfoBlock from "./view/info-block.js";
import DateTimeHelper from "../../../helpers/date-time-helper.js";
import LsiData from "../../../config/lsi.js";
//@@viewOff:imports

const CLASS_NAMES = {
  calendarDateSelect: () => Config.Css.css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  `,
};
export const List = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "List",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render() {
    //@@viewOn:hooks
    const [selectedDate, setSelectedDate] = useState(new Date());

    const placesDataObject = useSubAppData();
    const reservationsDataList = useReservations();
    const usersDataList = useUsers();
    const parkingPlacesDataList = useParkingPlaces();
    const isReservationOpenedBySelectedDay = useMemo(() => {
      return (
        placesDataObject.data &&
        DateTimeHelper.isReservationOpenedBySelectedDay(placesDataObject.data.reservationsConfig, selectedDate)
      );
    }, [placesDataObject, selectedDate]);

    const isReservationOpened = useMemo(() => {
      return placesDataObject.data && DateTimeHelper.isReservationOpened(placesDataObject.data.reservationsConfig);
    }, [placesDataObject]);
    //@@viewOff:hooks

    //@@viewOn:private
    function getItemList() {
      return [
        {
          label: <Lsi lsi={LsiData.reservations} />,
          icon: "mdi-car",
          children: (
            <UserReservationsListView
              reservationsDataList={reservationsDataList}
              usersDataList={usersDataList}
              parkingPlacesDataList={parkingPlacesDataList}
              handlerMap={reservationsDataList.handlerMap}
              selectedDate={selectedDate}
              isReservationOpenedBySelectedDay={isReservationOpenedBySelectedDay}
              isReservationOpened={isReservationOpened}
            />
          ),
        },
        {
          label: <Lsi lsi={LsiData.weeklyOverview} />,
          icon: "mdi-calendar",
          children: (
            <WeeklyOverviewView
              reservationsDataList={reservationsDataList}
              usersDataList={usersDataList}
              parkingPlacesDataList={parkingPlacesDataList}
              selectedDate={selectedDate}
              useLoggedInUser
              isReservationOpenedBySelectedDay={isReservationOpenedBySelectedDay}
              isReservationOpened={isReservationOpened}
            />
          ),
        },
      ];
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <DataObjectStateResolver dataObject={placesDataObject}>
          <DataListStateResolver dataList={reservationsDataList}>
            <DataListStateResolver dataList={usersDataList}>
              <DataListStateResolver dataList={parkingPlacesDataList}>
                <UuBookigyWorkplace.Bricks.CalendarDateSelect
                  className={CLASS_NAMES.calendarDateSelect()}
                  onSelectDate={(date) => setSelectedDate(new Date(date))}
                />
                <InfoBlock
                  reservationsDataList={reservationsDataList}
                  selectedDate={selectedDate}
                  isReservationOpenedBySelectedDay={isReservationOpenedBySelectedDay}
                  placesDataObject={placesDataObject.data}
                />
                <Tabs itemList={getItemList()} />
              </DataListStateResolver>
            </DataListStateResolver>
          </DataListStateResolver>
        </DataObjectStateResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default List;
