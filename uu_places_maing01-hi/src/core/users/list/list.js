//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import Config from "../config/config.js";
import useUsers from "../context/use-users.js";
import DataListStateResolver from "../../../common/data-list-state-resolver.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import UsersListView from "./view/users-list-view.js";
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

  render() {
    //@@viewOn:hooks
    const placesDataObject = useSubAppData();
    const usersDataList = useUsers();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <DataObjectStateResolver dataObject={placesDataObject}>
          <DataListStateResolver dataList={usersDataList}>
            <UsersListView usersDataList={usersDataList} handlerMap={usersDataList.handlerMap} />
          </DataListStateResolver>
        </DataObjectStateResolver>
      </div>
    );
    //@@viewOff:render
  },
});

export default List;
