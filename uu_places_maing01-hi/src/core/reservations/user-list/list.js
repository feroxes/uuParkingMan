//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";
import Config from "../config/config.js";
import useReservations from "../context/use-reservations.js";
import useUsers from "../../users/context/use-users.js";
import useParkingPlaces from "../../parking-places/context/use-parking-places.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import UserReservationsListView from "./view/user-reservations-list-view.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "List",
  nestingLevel: "bigBox",
  //@@viewOff:statics
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
    const { data: placesDataObject } = useSubAppData();
    const reservationsDataList = useReservations();
    const usersDataList = useUsers();
    const parkingPlacesDataList = useParkingPlaces();
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
                <UserReservationsListView
                  reservationsDataList={reservationsDataList}
                  usersDataList={usersDataList}
                  parkingPlacesDataList={parkingPlacesDataList}
                  handlerMap={reservationsDataList.handlerMap}
                />
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
