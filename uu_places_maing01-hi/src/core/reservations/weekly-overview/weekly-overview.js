//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../config/config.js";
import useReservations from "../context/use-reservations.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import WeeklyOverviewView from "./view/weekly-overview-view.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "WeeklyOverview",
  nestingLevel: "bigBox",
  //@@viewOff:statics
};

export const WeeklyOverview = createVisualComponent({
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
    const reservationsDataList = useReservations();
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
        <DataListStateResolver dataList={reservationsDataList}>
          <WeeklyOverviewView reservationsDataList={reservationsDataList} />
        </DataListStateResolver>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default WeeklyOverview;
