//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useRef, useContext } from "uu5g04-hooks";
import Config from "../config/config";
//@@viewOff:imports

const ContextModalStore = UU5.Common.Context.create();

export function useContextModal() {
  return useContext(ContextModalStore);
}

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ModalManager",
  //@@viewOff:statics
};

export const ModalManager = createComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const modalRef = useRef();

    //@@viewOff:private

    //@@viewOn:interface
    function open(openProps) {
      modalRef.current.open(openProps);
    }

    function close(shouldOnClose = true, callback) {
      modalRef.current.close(shouldOnClose, () => {
        if (typeof callback === "function") {
          callback();
        }
      });
    }

    //@@viewOff:interface

    //@@viewOn:render
    return (
      <ContextModalStore.Provider value={{ open, close }}>
        {props.children}
        <UU5.Bricks.Modal size="m" ref={modalRef} mountContent={"onEachOpen"} />
      </ContextModalStore.Provider>
    );
    //@@viewOff:render
  },
});

export default { ModalManager, useContextModal };
