import { React, constants as DiscordConstants, fluxHooks as FluxHooks } from "replugged/common";
import { Text } from "replugged/components";
import Modules from "../lib/requiredModules";
import Types from "../types";
export const WordsPerMinute = ({ channel }: { channel: Types.Channel }) => {
  const TextValue = FluxHooks.useStateFromStores(
    [Modules?.DraftStore],
    () => Modules.DraftStore.getDraft(channel.id, 0) as string,
  );
  const [shouldShow, setShouldShow] = React.useState(false);

  const [initialText, setInitialText] = React.useState<string>("");
  const [wpm, setWPM] = React.useState(0);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const updateWPM = () => {
    const words = TextValue.replace(initialText, "")
      .split(" ")
      .filter((word) => word !== "" && word !== " ");
    const elapsedTime = (new Date().getTime() - startTime) / 1000 / 60;
    const currentWPM = words.length / elapsedTime;

    setWPM(isFinite(currentWPM) ? Math.floor(currentWPM) : 0);
  };
  React.useEffect(() => {
    if (TextValue.trim().length > 0 && !startTime) {
      setInitialText(TextValue);
      setStartTime(new Date().getTime() - 1000);
    }

    if (TextValue.trim().length === 0 && startTime) {
      setStartTime(null);
      setWPM(0);
    }

    if (startTime != null) {
      updateWPM();
    }
    const interval = setInterval(() => {
      if (startTime != null) {
        updateWPM();
      }
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [TextValue, startTime]);
  React.useEffect(() => {
    setShouldShow(
      Boolean(
        channel.isDM() ||
          channel.isGroupDM() ||
          Modules.PermissionStore.canBasicChannel(
            DiscordConstants.Permissions.SEND_MESSAGES,
            channel,
          ),
      ),
    );
  }, [channel.id]);
  return (
    shouldShow && (
      <div className="wpm-counter">
        <Text.Eyebrow>WPM: {isFinite(wpm) ? Math.floor(wpm) : 0}</Text.Eyebrow>
      </div>
    )
  );
};

export default (
  props: {
    channel: Types.Channel;
  } & Record<string, unknown>,
) => Modules?.PermissionStore && Modules?.DraftStore && <WordsPerMinute {...props} />;
