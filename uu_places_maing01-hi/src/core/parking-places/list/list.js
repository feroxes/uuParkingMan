//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import Config from "../config/config.js";
import useParkingPlaces from "../context/use-parking-places.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import ParkingPlacesListView from "./view/parking-places-list-view.js";
//@@viewOff:imports

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

  render(props) {
    //@@viewOn:hooks
    const placesDataObject = useSubAppData();
    const parkingPlacesDataList = useParkingPlaces();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <DataObjectStateResolver dataObject={placesDataObject}>
        <DataListStateResolver dataList={parkingPlacesDataList}>
          <ParkingPlacesListView
            parkingPlacesDataList={parkingPlacesDataList}
            handlerMap={parkingPlacesDataList.handlerMap}
          />
        </DataListStateResolver>
      </DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default List;
