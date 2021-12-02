//@@viewOn:imports
import UU5 from "uu5g04";
import UuBookigyWorkplace from "uu_bookigy_workplaceg01-uu5";
import { createVisualComponent, useState } from "uu5g04-hooks";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
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
      background: ${Constants.mainColor};
    }
  `,
};

export const WeeklyOverviewView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const [selectedDate, setSelectedDate] = useState(new Date());
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <UuBookigyWorkplace.Bricks.CalendarDateSelect
          className={Css.calendarDateSelect()}
          onSelectDate={(date) => setSelectedDate(new Date(date))}
        />
      </>
    );
    //@@viewOff:render
  },
});

export default WeeklyOverviewView;
