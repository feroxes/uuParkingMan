//@@viewOn:imports
import UU5 from "uu5g04";
import Plus4U5 from "uu_plus4u5g01";
import { useSubApp, useSubAppData, SubAppProvider } from "uu_plus4u5g01-context";
import { createComponent, useMemo } from "uu5g04-hooks";
import HomeContext from "../core/home-context/home-context.js";
import Config from "../config/config";
import ContextHelper from "../helpers/context-helper.js";
//@@viewOff:imports

const SubAppContextResolver = createComponent({
  //@@viewOn:statics
  displayName: Config.TAG + "SubAppContextResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: UU5.PropTypes.string.isRequired,
    subAppDataLoader: UU5.PropTypes.func.isRequired,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    baseUri: undefined,
    subAppDataLoader: null,
  },
  //@@viewOff:defaultProps

  render({ subAppDataLoader: SubAppDataLoader, baseUri, children }) {
    //@@viewOn:hooks
    const subApp = useSubApp();
    const { data: subAppData } = useSubAppData();

    const shouldLoadData = useMemo(() => ContextHelper.checkDataOnContext(subAppData), [subAppData]);
    //@@viewOff:hooks

    //@@viewOn:private
    const hasInvalidSubAppContext = isSubAppContextInvalid(subApp, baseUri);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    let child = <HomeContext.Provider value={!hasInvalidSubAppContext}>{children}</HomeContext.Provider>;

    if (shouldLoadData) {
      child = <SubAppDataLoader baseUri={hasInvalidSubAppContext ? baseUri : subApp.baseUri}>{child}</SubAppDataLoader>;
    }

    if (hasInvalidSubAppContext) {
      child = (
        <SubAppProvider baseUri={baseUri} subApp={Config.SUB_APP_NAME}>
          {child}
        </SubAppProvider>
      );
    }

    return child;
    //@@viewOff:render
  },
});

//viewOn:helpers
function isSubAppContextInvalid(subApp, baseUri) {
  const propsBaseUri = Plus4U5.Common.Url.parse(baseUri);
  const contextBaseUri = Plus4U5.Common.Url.parse(subApp.baseUri);
  const baseUrisNotSame = baseUri && subApp && subApp.baseUri && propsBaseUri.workspace !== contextBaseUri.workspace;
  return !subApp || !subApp?.baseUri || baseUrisNotSame;
}
//viewOff:helpers

//viewOn:exports
export { SubAppContextResolver };
export default SubAppContextResolver;
//viewOff:exports
