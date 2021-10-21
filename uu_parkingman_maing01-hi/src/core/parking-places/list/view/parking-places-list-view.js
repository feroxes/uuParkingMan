//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "../../config/config.js";
import Constants from "../../../../helpers/constants.js";
import ParkingPlaceFrom from "../../parking-place-form.js";
import { useContextModal } from "../../../managers/modal-manager.js";
import Lsi from "../../parking-places-lsi.js";

//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

const CLASS_NAMES = {
  createBtn: () => Config.Css.css`
    position: relative;
    left: 16px;
    color: ${Constants.mainColor}
  `,
};

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "ParkingPlacesListView",
  //@@viewOff:statics
};

export const ParkingPlacesListView = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    parkingPlacesDataList: UU5.PropTypes.object,
    handlerMap: UU5.PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    parkingPlacesDataList: {},
    handlerMap: {},
  },
  //@@viewOff:defaultProps
  render(props) {
    //@@viewOn:hooks
    const modal = useContextModal();
    //@@viewOff:hooks

    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:handlers
    //@@viewOff:handlers

    // @@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Uu5Tiles.ControllerProvider
        data={props.parkingPlacesDataList.data}
        sorters={getSorters()}
        initialActiveSorters={getSorters()}
      >
        <Uu5Tiles.InfoBar sortable={false} />
        <Uu5Tiles.List alternateRowBackground rowPadding="8px 16px" columns={getColumns(props, modal)} />
      </Uu5Tiles.ControllerProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn: helpers
function getSorters() {
  return [
    {
      key: Constants.ParkingPlace.columnKeys.type,
      sorterFn: (a, b) => {
        return a.data.type < b.data.type ? -1 : 1;
      },
    },
  ];
}

function getColumns(props, modal) {
  return [
    {
      cell: (cellProps) => cellProps.data.data.number,
      header: <UU5.Bricks.Lsi lsi={Lsi.number} />,
    },
    {
      key: Constants.ParkingPlace.columnKeys.type,
      cell: (cellProps) => <UU5.Bricks.Lsi lsi={Lsi[cellProps.data.data.type]} />,
      header: <UU5.Bricks.Lsi lsi={Lsi.type} />,
    },
    {
      cell: () => null,
      header: (
        <UU5.Bricks.Button
          content={<UU5.Bricks.Icon icon="mdi-plus-circle" />}
          bgStyle="filled"
          onClick={() => onControlsBtnClick(props, modal)}
          className={CLASS_NAMES.createBtn()}
        />
      ),
      width: 1,
      fixed: "right",
      isControls: true,
      visible: true,
    },
    {
      key: "actions",
      cell: (cellProps) => {
        return (
          <UU5.Bricks.Dropdown
            fitMenuToViewport
            popoverLocation="portal"
            items={[
              {
                label: <UU5.Bricks.Lsi lsi={Lsi.update} />,
                onClick: () => {
                  modal.open({
                    header: <UU5.Bricks.Lsi lsi={Lsi.parkingPlaceUpdate} />,
                    content: (
                      <ParkingPlaceFrom
                        modal={modal}
                        handlerMap={cellProps.data.handlerMap}
                        parkingPlace={cellProps.data.data}
                      />
                    ),
                    size: "m",
                  });
                },
              },
            ]}
            bgStyle="transparent"
            iconHidden
            label={<UU5.Bricks.Icon icon={"uu5-menu"} style={{ fontSize: "16px" }} />}
          />
        );
      },
      fixed: "right",
      width: 48,
      cellPadding: "0 16px",
    },
  ];
}
function onControlsBtnClick(props, modal) {
  let modalContent = {
    header: <UU5.Bricks.Lsi lsi={Lsi.createParkingPlace} />,
    content: <ParkingPlaceFrom modal={modal} handlerMap={props.handlerMap} />,
    size: "m",
  };
  modal.open(modalContent);
}
//@@viewOff: helpers
export default ParkingPlacesListView;
