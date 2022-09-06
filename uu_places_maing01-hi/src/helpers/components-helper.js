import { PersonItem } from "uu_plus4u5g02-elements";

const ComponentsHelper = {
  getBusinessCart(uuIdentity, size = "xs") {
    return <PersonItem uuIdentity={uuIdentity} size={size} style={{ margin: "4px 0" }} />;
  },
};

export default ComponentsHelper;
