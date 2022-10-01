//@@viewOn:imports
import { Form, FormSelect, FormNumber, SubmitButton, CancelButton } from "uu5g05-forms";
import { createVisualComponent, PropTypes, Lsi } from "uu5g05";
import { useAlertBus } from "uu5g05-elements";
import Config from "./config/config.js";
import Constants from "../../helpers/constants.js";
import LsiData from "../../config/lsi.js";
//@@viewOff:imports

const CLASS_NAMES = {
  grid: () => Config.Css.css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  `,
  controls: () => Config.Css.css`
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: flex-end;
  `,
};

export const ParkingPlaceFrom = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ParkingPlaceFrom",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    parkingPlace: PropTypes.object,
    handlerMap: PropTypes.object,
    onClose: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const { parkingPlace, handlerMap, onClose } = props;
    //@@viewOn:hooks
    const { addAlert } = useAlertBus();
    //@@viewOff:hooks

    //@@viewOn:private
    function handleOnSubmitClick({ data }) {
      if (parkingPlace) {
        handlerMap
          .update({ ...data.value, id: parkingPlace.id })
          .then(() => {
            addAlert({
              message: <Lsi lsi={LsiData.parkingPlaceSuccessfullyUpdated} />,
              priority: "success",
              durationMs: 3000,
            });
            onClose();
          })
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      } else {
        handlerMap
          .create(data.value)
          .then(() =>
            addAlert({
              message: <Lsi lsi={LsiData.parkingPlaceSuccessfullyCreated} />,
              priority: "success",
              durationMs: 3000,
            })
          )
          .catch(({ message }) => addAlert({ message, priority: "error", durationMs: 3000 }));
      }
    }
    function getTypeItemList() {
      return Constants.ParkingPlace.types.map((type) => {
        return { value: type.value, children: type.content };
      });
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Form onSubmit={handleOnSubmitClick}>
        <div className={CLASS_NAMES.grid()}>
          <FormSelect
            name={Constants.ParkingPlace.formNames.type}
            label={<Lsi lsi={LsiData.type} />}
            required
            initialValue={parkingPlace && parkingPlace.type}
            itemList={getTypeItemList()}
          />
          <FormNumber
            min={1}
            name={Constants.ParkingPlace.formNames.number}
            label={<Lsi lsi={LsiData.number} />}
            required
            initialValue={parkingPlace && parkingPlace.number}
          />
        </div>
        <div className={CLASS_NAMES.controls()}>
          <SubmitButton
            style={{ marginRight: "8px" }}
            lsi={{ submit: parkingPlace ? LsiData.update : LsiData.create }}
          />
          <CancelButton onClick={onClose} />
        </div>
      </Form>
    );
    //@@viewOff:render
  },
});

export default ParkingPlaceFrom;
