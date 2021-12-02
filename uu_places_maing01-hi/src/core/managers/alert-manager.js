//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useRef, useContext } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const ContextAlertStore = UU5.Common.Context.create();

export function useContextAlert() {
  return useContext(ContextAlertStore);
}

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "AlertManager",
  //@@viewOff:statics
};

export const AlertManager = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const alertRef = useRef();
    //@@viewOff:private

    //@@viewOn:interface

    function showAlert(content, isSuccess = true) {
      return alertRef.current.addAlert({
        content: <UU5.Bricks.Text content={content} />,
        colorSchema: isSuccess ? "success" : "danger",
      });
    }

    //@@viewOff:interface

    //@@viewOn:render
    return (
      <ContextAlertStore.Provider value={showAlert}>
        {props.children}
        <UU5.Bricks.AlertBus
          colorSchema={UU5.Environment.colorSchemaMap.green.color}
          ref_={alertRef}
          closeTimer={2000}
        />
      </ContextAlertStore.Provider>
    );
    //@@viewOff:render
  },
});

export default { AlertManager, useContextAlert };
