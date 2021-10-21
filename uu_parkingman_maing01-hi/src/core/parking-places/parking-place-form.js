//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useState } from "uu5g04-hooks";
import Config from "./config/config.js";
import Constants from "../../helpers/constants.js";
import Lsi from "./parking-places-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParkingPlaceFrom",
  nestingLevel: "bigBox",
  defaultType: "Car",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  main: () => Config.Css.css``,
  controls: () => Config.Css.css`
    > *:last-child {
      background-color: ${Constants.mainColor} !important;
    }
  `,
};

export const ParkingPlaceFrom = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    parkingPlace: UU5.PropTypes.object,
    modal: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const typeLsi = useLsi(Lsi.type);
    const numberLsi = useLsi(Lsi.number);
    const [disabled, setDisable] = useState(false);
    //@@viewOff:hooks

    //@@viewOn:private
    function _handleOnSubmitClick(opt) {
      setDisable(true);
      if (props.parkingPlace) {
        props.handlerMap.update({ ...opt.values, id: props.parkingPlace.id }).finally(() => {
          setDisable(false);
          props.modal.current.close();
        });
      } else {
        props.handlerMap.create(opt.values).finally(() => {
          setDisable(false);
        });
      }
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
    const { parkingPlace } = props;
    return (
      <UU5.Forms.Form {...attrs} onCancel={props.modal.current.close} onSave={_handleOnSubmitClick} disabled={disabled}>
        <UU5.Forms.Select
          name={Constants.Users.formNames.type}
          label={typeLsi}
          required
          value={parkingPlace && parkingPlace.type}
        >
          {Constants.ParkingPlace.types.map((type, key) => {
            return <UU5.Forms.Select.Option value={type.value} content={type.content} key={key} />;
          })}
        </UU5.Forms.Select>
        <UU5.Forms.Number
          buttonHidden
          name={Constants.Users.formNames.number}
          label={numberLsi}
          required
          value={parkingPlace && parkingPlace.number}
        />
        <UU5.Forms.Controls className={CLASS_NAMES.controls()} />
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  },
});

export default ParkingPlaceFrom;
