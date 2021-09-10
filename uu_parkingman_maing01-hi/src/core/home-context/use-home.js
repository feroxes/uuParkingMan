//@@viewOn:imports
import { useContext } from "uu5g04-hooks";
import Context from "./home-context";
//@@viewOff:imports

export function useHome() {
  return useContext(Context);
}

export default useHome;
