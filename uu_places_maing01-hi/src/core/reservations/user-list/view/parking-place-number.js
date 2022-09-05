//@@viewOn:imports
import { createVisualComponent, PropTypes } from "uu5g05";
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
//@@viewOff:css

export const ParkingPlaceNumber = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ParkingPlaceNumber",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    number: PropTypes.string.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps
  render(props) {
    const numbers = {
      0: zero,
      1: one,
      2: two,
      3: three,
      4: four,
      5: five,
      6: six,
      7: seven,
      8: eight,
      9: nine,
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
      <div>
        {number.map((num, key) => {
          return <img src={numbers[num]} key={key} width={40} height={60} />;
        })}
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers

//@@viewOff: helpers
export default ParkingPlaceNumber;
