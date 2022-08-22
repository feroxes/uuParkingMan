//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./users-context.js";
//@@viewOff:imports

export function useUsers() {
  return useContext(Context);
}

export default useUsers;
