//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useLsi, useCall } from "uu5g04-hooks";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import Lsi from "../../lsi.js";
import DateTimeHelper from "../../../../helpers/date-time-helper.js";
import { useContextAlert } from "../../../managers/alert-manager.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const Css = {
  main: () => Config.Css.css`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `,
  form: () => Config.Css.css`
    width: 500px;
  `,
};

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "FormView",
  //@@viewOff:statics
};

export const FormView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    placesDataObject: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    const dayOfStartReservationsLsi = useLsi(Lsi.dayOfStartReservations);
    const hourOfStartReservationsLsi = useLsi(Lsi.hourOfStartReservations);
    const messageLsi = useLsi(Lsi.message);
    const formHeaderLsi = useLsi(Lsi.formHeader);
    const sendMessageFormHeaderLsi = useLsi(Lsi.sendMessageFormHeader);
    const successLsi = useLsi(Lsi.success);
    const successMessageSendLsi = useLsi(Lsi.successMessageSend);
    const showAlert = useContextAlert();

    const { call } = useCall(Calls.sendMessage);
    //@@viewOff:hooks
    //@@viewOn:private
    function _getSelectDaysValues() {
      const weekDays = [...DateTimeHelper.getWeekDays().slice(1), DateTimeHelper.getWeekDays()[0]];
      return weekDays.map((day, key) => {
        return <UU5.Forms.Select.Option value={(key + 1).toString()} content={day} key={key} />;
      });
    }
    function _getSelectHoursValues() {
      const hours = Array.from({ length: 24 }, (_, i) => i + 1);
      return hours.map((hour, key) => {
        return <UU5.Forms.Select.Option value={hour.toString()} key={key} />;
      });
    }
    function _getFormValues() {
      const { reservationsConfig } = props.placesDataObject.data;
      if (reservationsConfig) {
        return {
          dayOfStartReservations: reservationsConfig.dayOfStartReservations.toString(),
          hourOfStartReservations: reservationsConfig.hourOfStartReservations.toString(),
        };
      } else return null;
    }
    function _handleOnSubmitClick(opt) {
      const { dayOfStartReservations, hourOfStartReservations } = opt.values;
      const dtoIn = {
        reservationsConfig: {
          dayOfStartReservations: Number(dayOfStartReservations),
          hourOfStartReservations: Number(hourOfStartReservations),
        },
      };
      props.placesDataObject.handlerMap
        .update(dtoIn)
        .then(() => showAlert(successLsi))
        .catch((e) => showAlert(e.message, false));
    }
    function _handleOnSendMessageClick(opt) {
      const { message } = opt.values;

      call({ message })
        .then(() => showAlert(successMessageSendLsi))
        .catch((e) => showAlert(e.message, false));
    }
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div className={Css.main()}>
        <UU5.Forms.Form
          onSave={_handleOnSubmitClick}
          header={formHeaderLsi}
          values={_getFormValues()}
          className={Css.form()}
        >
          <UU5.Forms.Select
            name={Constants.Settings.formNames.dayOfStartReservations}
            label={dayOfStartReservationsLsi}
            required
          >
            {_getSelectDaysValues()}
          </UU5.Forms.Select>
          <UU5.Forms.Select
            name={Constants.Settings.formNames.hourOfStartReservations}
            label={hourOfStartReservationsLsi}
            required
          >
            {_getSelectHoursValues()}
          </UU5.Forms.Select>
          <UU5.Forms.Controls />
        </UU5.Forms.Form>
        <UU5.Forms.Form onSave={_handleOnSendMessageClick} header={sendMessageFormHeaderLsi} className={Css.form()}>
          <UU5.Forms.TextArea name={Constants.Settings.formNames.message} label={messageLsi} required />
          <UU5.Forms.Controls />
        </UU5.Forms.Form>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
//@@viewOff: helpers
export default FormView;
