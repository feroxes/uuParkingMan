//@@viewOn:imports
import { createComponent, useDataList, useMemo } from "uu5g05";
import { useSubApp } from "uu_plus4u5g02";
import Config from "./config/config";
import Calls from "calls";
import UsersContext from "./context/users-context.js";
//@@viewOff:imports

export const UsersProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UsersProvider",
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
    const usersDataList = useDataList({
      handlerMap: {
        load: handleLoad,
        create: handleCreate,
      },
      itemHandlerMap: {
        update: async (dtoIn) => {
          const req = await handleUpdate(dtoIn);
          return { ...usersDataList.data, ...req };
        },
        delete: handleDelete,
      },
    });

    function handleLoad(criteria) {
      const dtoIn = { ...criteria };
      return Calls.USERS.load(dtoIn, baseUri);
    }

    function handleCreate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.USERS.create(dtoIn, baseUri);
    }

    function handleUpdate(criteria) {
      const dtoIn = { ...criteria };
      return Calls.USERS.update(dtoIn, baseUri);
    }

    function handleDelete(criteria) {
      const dtoIn = { ...criteria };
      return Calls.USERS.delete(dtoIn, baseUri);
    }

    const value = useMemo(() => usersDataList, [usersDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <UsersContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </UsersContext.Provider>
    );
    //@@viewOff:render
  },
});

export default UsersProvider;
