//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import ParkingPlacesContext from "./context/parking-places-context.js";
//@@viewOff:imports

export const ParkingPlacesProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ParkingPlacesProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { baseUri } = useSubApp();
    //@@viewOn:private
    const parkingPlacesDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...parkingPlacesDataList.data, ...req };
        },
      },
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.PARKING_PLACES.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.PARKING_PLACES.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.PARKING_PLACES.update(dtoIn, baseUri);
    }

    const value = useMemo(() => parkingPlacesDataList, [parkingPlacesDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ParkingPlacesContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ParkingPlacesContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ParkingPlacesProvider;
