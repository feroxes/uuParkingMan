//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import ReservationsContext from "./context/reservations-context.js";
//@@viewOff:imports

export const ReservationsProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ReservationsProvider",
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
    const reservationsDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...reservationsDataList.data, ...req };
        },
        delete: handleDelete,
      },
      pageSize: 10000,
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.RESERVATIONS.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.RESERVATIONS.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.RESERVATIONS.update(dtoIn, baseUri);
    }

    function handleDelete(criteria) {
      const dtoIn = { ...criteria };
      return Calls.RESERVATIONS.delete(dtoIn, baseUri);
    }

    const value = useMemo(() => reservationsDataList, [reservationsDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <ReservationsContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </ReservationsContext.Provider>
    );
    //@@viewOff:render
  },
});

export default ReservationsProvider;
