//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useState } from "uu5g04-hooks";
import Config from "./config/config.js";
import Constants from "../../helpers/constants.js";
import Lsi from "./users-lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "UserFrom",
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

export const UserFrom = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    user: UU5.PropTypes.object,
    modal: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:hooks
    const uuIdentityLsi = useLsi(Lsi.uuIdentity);
    const typeLsi = useLsi(Lsi.type);
    const brandLsi = useLsi(Lsi.brand);
    const modelLsi = useLsi(Lsi.model);
    const numberLsi = useLsi(Lsi.number);
    const uuIdentityPlaceHolderLsi = useLsi(Lsi.userCreatePlaceHolders.uuIdentity);
    const brandPlaceHolderLsi = useLsi(Lsi.userCreatePlaceHolders.brand);
    const modelPlaceHolderLsi = useLsi(Lsi.userCreatePlaceHolders.model);
    const numberPlaceHolderLsi = useLsi(Lsi.userCreatePlaceHolders.number);
    const userInfoLsi = useLsi(Lsi.userInfo);
    const transportInfoLsi = useLsi(Lsi.transportInfo);
    const [disabled, setDisable] = useState(false);
    //@@viewOff:hooks

    //@@viewOn:private
    function _handleOnSubmitClick(opt) {
      setDisable(true);
      props.handlerMap.create(_prepareDtoIn(opt.values)).finally(() => {
        setDisable(false);
      });
    }

    function _prepareDtoIn(values) {
      return {
        uuIdentity: values.uuIdentity,
        transport: {
          type: values.type,
          brand: values.brand,
          model: values.model,
          number: values.number,
        },
      };
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = UU5.Common.VisualComponent.getAttrs(props, CLASS_NAMES.main());
    return (
      <UU5.Forms.Form
        {...attrs}
        className="uu5-common-center"
        onCancel={props.modal.current.close}
        onSave={_handleOnSubmitClick}
        disabled={disabled}
      >
        <UU5.Bricks.Header content={userInfoLsi} level={6} />
        <UU5.Forms.Text
          name={Constants.Users.formNames.uuIdentity}
          label={uuIdentityLsi}
          required
          placeholder={uuIdentityPlaceHolderLsi}
        />
        <UU5.Bricks.Line size="s" />
        <UU5.Bricks.Header content={transportInfoLsi} level={6} />
        <UU5.Forms.Text name={Constants.Users.formNames.type} label={typeLsi} required value={STATICS.defaultType} />
        <UU5.Forms.Text
          name={Constants.Users.formNames.brand}
          label={brandLsi}
          required
          placeholder={brandPlaceHolderLsi}
        />
        <UU5.Forms.Text
          name={Constants.Users.formNames.model}
          label={modelLsi}
          required
          placeholder={modelPlaceHolderLsi}
        />
        <UU5.Forms.Text
          name={Constants.Users.formNames.number}
          label={numberLsi}
          required
          placeholder={numberPlaceHolderLsi}
        />
        <UU5.Forms.Controls className={CLASS_NAMES.controls()}/>
      </UU5.Forms.Form>
    );
    //@@viewOff:render
  },
});

export default UserFrom;
