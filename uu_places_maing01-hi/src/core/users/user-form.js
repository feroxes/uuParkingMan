//@@viewOn:imports
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { Form, FormText, SubmitButton, CancelButton } from "uu5g05-forms";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import Constants from "../../helpers/constants.js";
import LsiData from "../../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UserFrom",
  defaultType: "Car",
  //@@viewOff:statics
};

const CLASS_NAMES = {
  controls: () => Config.Css.css`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
  `,
  grid: () => Config.Css.css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  `,
};

export const UserFrom = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    user: PropTypes.object,
    handlerMap: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { user, onClose } = props;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function _handleOnSubmitClick({ data }) {
      if (props.user) {
        props.handlerMap
          .update(prepareDtoIn({ ...data.value, id: props.user.id }))
          .then(() => {
            addAlert({ message: <Lsi lsi={LsiData.userSuccessfullyUpdated} />, priority: "success", durationMs: 3000 });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      } else {
        props.handlerMap
          .create(prepareDtoIn(data.value))
          .then(() => {
            addAlert({ message: <Lsi lsi={LsiData.userSuccessfullyCreated} />, priority: "success", durationMs: 3000 });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      }
    }

    function prepareDtoIn(values) {
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
    return (
      <Form onSubmit={_handleOnSubmitClick}>
        <FormText
          name={Constants.Users.formNames.uuIdentity}
          label={LsiData.uuIdentity}
          required
          readOnly={!!user}
          placeholder={LsiData.userCreatePlaceHolders.uuIdentity}
          initialValue={user?.uuIdentity || ""}
        />
        <div className={CLASS_NAMES.grid()}>
          <FormText
            name={Constants.Users.formNames.type}
            label={LsiData.type}
            required
            initialValue={user ? user.transport.type : STATICS.defaultType}
          />
          <FormText
            name={Constants.Users.formNames.brand}
            label={LsiData.brand}
            placeholder={LsiData.userCreatePlaceHolders.brand}
            initialValue={user && user.transport.brand}
          />
        </div>
        <div className={CLASS_NAMES.grid()}>
          <FormText
            name={Constants.Users.formNames.model}
            label={LsiData.model}
            placeholder={LsiData.userCreatePlaceHolders.model}
            initialValue={user && user.transport.model}
          />
          <FormText
            name={Constants.Users.formNames.number}
            label={LsiData.number}
            placeholder={LsiData.userCreatePlaceHolders.number}
            initialValue={user && user.transport.number}
          />
        </div>
        <div className={CLASS_NAMES.controls()}>
          <SubmitButton style={{ marginRight: "8px" }} lsi={{ submit: user ? LsiData.update : LsiData.create }} />
          <CancelButton onClick={onClose} />
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

export default UserFrom;
