//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useState } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";
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
import Constants from "../../../helpers/constants.js";
import Lsi from "../reservations-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  nestingLevel: "bigBox",
  //@@viewOff:statics
};
const Css = {
  calendarDateSelect: () => Config.Css.css`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
    .uu5-calendar-simple-calendar-selected {
      background: ${Constants.mainColor};
    }
  `,
};
export const List = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    cardView: UU5.PropTypes.bool,
    colorSchema: UU5.PropTypes.string,
    elevation: UU5.PropTypes.oneOf([-1, 0, 1, 2, 3, 4, 5, "-1", "0", "1", "2", "3", "4", "5"]),
    borderRadius: UU5.PropTypes.oneOfType([UU5.PropTypes.string, UU5.PropTypes.number]),
    bgStyle: UU5.PropTypes.oneOf(["filled", "outline", "transparent", "underline"]),
    contextType: UU5.PropTypes.oneOf(["none", "basic", "full"]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    cardView: true,
    colorSchema: undefined,
    elevation: undefined,
    borderRadius: undefined,
    bgStyle: undefined,
    contextType: "basic",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { data: placesDataObject } = useSubAppData();
    const reservationsDataList = useReservations();
    const usersDataList = useUsers();
    const parkingPlacesDataList = useParkingPlaces();

    const reservationsLsi = useLsi(Lsi.reservations);
    const weeklyOverviewLsi = useLsi(Lsi.weeklyOverview);

    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    return (
      <UU5.Bricks.Div {...attrs}>
        <DataObjectStateResolver dataObject={placesDataObject}>
          <DataListStateResolver dataList={reservationsDataList}>
            <DataListStateResolver dataList={usersDataList}>
              <DataListStateResolver dataList={parkingPlacesDataList}>
                <UuBookigyWorkplace.Bricks.CalendarDateSelect
                  className={Css.calendarDateSelect()}
                  onSelectDate={(date) => setSelectedDate(new Date(date))}
                />
                <InfoBlock reservationsDataList={reservationsDataList} selectedDate={selectedDate} />
                <UU5.Bricks.Tabs>
                  <UU5.Bricks.Tabs.Item header={reservationsLsi}>
                    <UserReservationsListView
                      reservationsDataList={reservationsDataList}
                      usersDataList={usersDataList}
                      parkingPlacesDataList={parkingPlacesDataList}
                      handlerMap={reservationsDataList.handlerMap}
                      selectedDate={selectedDate}
                    />
                  </UU5.Bricks.Tabs.Item>
                  <UU5.Bricks.Tabs.Item header={weeklyOverviewLsi}>
                    <WeeklyOverviewView
                      reservationsDataList={reservationsDataList}
                      usersDataList={usersDataList}
                      parkingPlacesDataList={parkingPlacesDataList}
                      selectedDate={selectedDate}
                      useLoggedInUser
                    />
                  </UU5.Bricks.Tabs.Item>
                </UU5.Bricks.Tabs>
              </DataListStateResolver>
            </DataListStateResolver>
          </DataListStateResolver>
        </DataObjectStateResolver>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default List;
