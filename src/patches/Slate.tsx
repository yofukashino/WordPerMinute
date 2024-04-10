import { util } from "replugged";
import { constants as DiscordConstants, React } from "replugged/common";
import { PluginInjector } from "../index";
import { PermissionStore, Slate } from "../lib/requiredModules";
import Types from "../types";
import WPMCounter from "../Components/WPMCounter";
export default (): void => {
  PluginInjector.after(
    Slate.type,
    "render",
    ([{ textValue: text, channel }]: [Types.SlateArgs], res: Types.ReactTree) => {
      if (!PermissionStore.canBasicChannel(DiscordConstants.Permissions.SEND_MESSAGES, channel))
        return res;
      const container = util.findInReactTree(
        res,
        (c: Types.ReactTree) =>
          c?.props?.className?.includes("channelTextArea") && Array.isArray(c?.props?.children),
      ) as Types.ReactTree;
      const [textValue, setTextValue] = React.useState(text);
      React.useEffect(() => {
        setTextValue(text);
      }, [text]);
      if (!container || container?.props?.children.some((c) => c?.key === "wpm")) return res;
      container?.props?.children.push(<WPMCounter textValue={textValue} key="wpm" />);
      return res;
    },
  );
};
