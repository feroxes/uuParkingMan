//@@viewOn:imports
import { createVisualComponent, PropTypes, useCall, Lsi } from "uu5g05";
import { Text, useAlertBus } from "uu5g05-elements";
import { Form, FormSelect, FormTextArea, SubmitButton } from "uu5g05-forms";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import LsiData from "../../../../config/lsi.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const CLASS_NAMES = {
  grid: () => Config.Css.css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  `,
};

export const FormView = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "FormView",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    placesDataObject: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps
  render(props) {
    const { placesDataObject } = props;
    const { reservationsConfig } = placesDataObject.data;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    const placesUpdate = useCall(Calls.PLACES.placesUpdate);
    const sendMessage = useCall(Calls.PLACES.sendMessage);
    //@@viewOff:hooks

    //@@viewOn:private
    function getSelectDaysValues() {
      const weekDays = [...DateTimeHelper.getWeekDays().slice(1), DateTimeHelper.getWeekDays()[0]];
      return weekDays.map((day, key) => {
        return { value: (key + 1).toString(), children: day };
      });
    }

    function getSelectHoursValues() {
      const hours = Array.from({ length: 24 }, (_, i) => i + 1);
      return hours.map((hour) => {
        return { value: hour.toString(), children: hour };
      });
    }

    function handleOnSubmitClick({ data }) {
      const { dayOfStartReservations, hourOfStartReservations } = data.value;
      const dtoIn = {
        reservationsConfig: {
          dayOfStartReservations: Number(dayOfStartReservations),
          hourOfStartReservations: Number(hourOfStartReservations),
        },
      };
      placesUpdate
        .call(dtoIn)
        .then(() =>
          addAlert({ message: <Lsi lsi={LsiData.successAppUpdate} />, priority: "success", durationMs: 3000 })
        )
        .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
    }

    function handleOnSendMessageClick({ data }) {
      const { message } = data.value;
      sendMessage
        .call({ message })
        .then(() =>
          addAlert({ message: <Lsi lsi={LsiData.successMessageSend} />, priority: "success", durationMs: 3000 })
        )
        .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Form onSubmit={handleOnSubmitClick} className="uu5-common-padding-s">
          <Text category="interface" segment="title" type="common">
            <Lsi lsi={LsiData.formHeader} />
          </Text>
          <div className={CLASS_NAMES.grid()}>
            <FormSelect
              name={Constants.Settings.formNames.dayOfStartReservations}
              label={<Lsi lsi={LsiData.dayOfStartReservations} />}
              required
              initialValue={reservationsConfig?.dayOfStartReservations.toString()}
              itemList={getSelectDaysValues()}
            />
            <FormSelect
              name={Constants.Settings.formNames.hourOfStartReservations}
              label={<Lsi lsi={LsiData.hourOfStartReservations} />}
              required
              initialValue={reservationsConfig?.hourOfStartReservations.toString()}
              itemList={getSelectHoursValues()}
            />
          </div>
          <div className="uu5-common-center uu5-common-padding-s">
            <SubmitButton />
          </div>
        </Form>
        <Form onSubmit={handleOnSendMessageClick} className="uu5-common-padding-s">
          <Text category="interface" segment="title" type="common">
            <Lsi lsi={LsiData.sendMessageFormHeader} />
          </Text>
          <FormTextArea
            name={Constants.Settings.formNames.message}
            label={<Lsi lsi={LsiData.message} />}
            spellCheck
            required
          />
          <SubmitButton style={{ marginTop: "8px" }} />
        </Form>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default FormView;
