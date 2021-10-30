//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "../../config/config.js";
import one from "../../../../assets/numbers/1.png";
import two from "../../../../assets/numbers/2.png";
import three from "../../../../assets/numbers/3.png";
import four from "../../../../assets/numbers/4.png";
import five from "../../../../assets/numbers/5.png";
import six from "../../../../assets/numbers/6.png";
import seven from "../../../../assets/numbers/7.png";
import eight from "../../../../assets/numbers/8.png";
import nine from "../../../../assets/numbers/9.png";
import zero from "../../../../assets/numbers/0.png";

//@@viewOff:imports

//@@viewOn:css
const Css = {
  main: () => Config.Css.css`
    display: flex;
  `,
};

//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParkingPlaceNumber",
  //@@viewOff:statics
};

export const ParkingPlaceNumber = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    number: UU5.PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render(props) {
    const numbers = {
      "0": zero,
      "1": one,
      "2": two,
      "3": three,
      "4": four,
      "5": five,
      "6": six,
      "7": seven,
      "8": eight,
      "9": nine,
    };
    //@@viewOn:hooks
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const number = props.number.split("");
    return (
      <div className={Css.main()}>
        {number.map((num, key) => {
          return <UU5.Bricks.Image src={numbers[num]} key={key} width={40} height={60}/>;
        })}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default ParkingPlaceNumber;
