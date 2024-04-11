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
      const container = util.findInReactTree(
        res,
        (c: Types.ReactTree) =>
          c?.props?.className?.includes("channelTextArea") && Array.isArray(c?.props?.children),
      ) as Types.ReactTree;
      const [textValue, setTextValue] = React.useState(text);
      const [shouldShow, setShouldShow] = React.useState(false);
      React.useEffect(() => {
        setTextValue(text);
      }, [text]);
      React.useEffect(() => {
        setShouldShow(
          Boolean(
            channel.isDM() ||
              channel.isGroupDM() ||
              PermissionStore.canBasicChannel(DiscordConstants.Permissions.SEND_MESSAGES, channel),
          ),
        );
      }, [channel.id]);
      if (!shouldShow || !container || container?.props?.children.some((c) => c?.key === "wpm"))
        return res;
      container?.props?.children.push(<WPMCounter textValue={textValue} key="wpm" />);
      return res;
    },
  );
};
