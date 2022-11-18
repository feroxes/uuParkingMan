import { PersonItem } from "uu_plus4u5g02-elements";

const ComponentsHelper = {
  getBusinessCart(uuIdentity, size = "xs", margin = "4px 0") {
    return <PersonItem uuIdentity={uuIdentity} size={size} style={{ margin }} />;
  },
};

export default ComponentsHelper;
