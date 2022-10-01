//@@viewOn:imports
import { createVisualComponent } from "uu5g05";
import { useSubAppData } from "uu_plus4u5g02";
import Config from "../config/config.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import FromView from "./view/form-view.js";
//@@viewOff:imports

export const Form = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Form",
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
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <DataObjectStateResolver dataObject={placesDataObject}>
        <FromView placesDataObject={placesDataObject} />
      </DataObjectStateResolver>
    );
    //@@viewOff:render
  },
});

export default Form;
