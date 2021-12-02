import Plus4U5 from "uu_plus4u5g01";

const ComponentsHelper = {
  getBusinessCart(uuIdentity) {
    return <Plus4U5.Bricks.BusinessCard uuIdentity={uuIdentity} visual="inline" infoDetail="full" showUuIdentity />;
  },
};

export default ComponentsHelper;
