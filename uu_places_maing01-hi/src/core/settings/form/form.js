//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import { useSubAppData } from "uu_plus4u5g01-context";
import Config from "../config/config.js";
import DataObjectStateResolver from "../../../common/data-object-state-resolver.js";
import FromView from "./view/form-view.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "Form",
  nestingLevel: "bigBox",
  //@@viewOff:statics
};

export const Form = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const { data: placesDataObject } = useSubAppData();
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
          <FromView placesDataObject={placesDataObject} />
        </DataObjectStateResolver>
      </UU5.Bricks.Div>
    );
    //@@viewOff:render
  },
});

export default Form;
