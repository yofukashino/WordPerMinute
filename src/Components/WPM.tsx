import { React, constants, fluxDispatcher } from "replugged/common";
import { Text } from "replugged/components";
import { DraftStore, PermissionStore } from "@lib/RequiredModules";

import type Types from "@Types";

export const WordsPerMinute = React.memo(({ channel }: { channel: Types.Channel }) => {
  const [TextValue, setTextValue] = React.useState<string>(DraftStore.getDraft?.(channel.id, 0));
  const [initialText, setInitialText] = React.useState<string>("");
  const [shouldShow, setShouldShow] = React.useState<boolean>(false);
  const [startTime, setStartTime] = React.useState<number | null>(null);
  const [wpm, setWPM] = React.useState<number>(0);

  const updateTextValue: Types.ActionHandler = React.useCallback(
    ({ channelId, draftType, draft }: { channelId: string; draftType: number; draft: string }) => {
      if (channelId === channel.id && draftType === 0) setTextValue(draft);
    },
    [],
  );

  const updateWPM = React.useCallback(() => {
    const words = TextValue.replace(initialText, "")
      .split(" ")
      .filter((word) => word !== "" && word !== " ");

    const elapsedTime = (new Date().getTime() - startTime) / 1000 / 60;
    const currentWPM = words.length / elapsedTime;

    setWPM(isFinite(currentWPM) ? Math.floor(currentWPM) : 0);
  }, [TextValue]);

  React.useEffect(() => {
    fluxDispatcher.subscribe("DRAFT_CHANGE", updateTextValue);
    fluxDispatcher.subscribe("DRAFT_SAVE", updateTextValue);
    return () => {
      fluxDispatcher.unsubscribe("DRAFT_CHANGE", updateTextValue);
      fluxDispatcher.unsubscribe("DRAFT_SAVE", updateTextValue);
    };
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (startTime != null) updateWPM();
    }, 1000);

    if (TextValue.trim().length > 0 && !startTime) {
      setInitialText(TextValue);
      setStartTime(new Date().getTime() - 1000);
      return;
    }

    if (TextValue.trim().length === 0 && startTime) {
      setStartTime(null);
      setWPM(0);
      return;
    }

    if (startTime != null) updateWPM();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [TextValue, startTime]);

  React.useEffect(() => {
    const isDM = channel.isDM();
    const isGroupDM = channel.isGroupDM();
    const canSendMessages = PermissionStore.canBasicChannel?.(
      constants.Permissions.SEND_MESSAGES,
      channel,
    );
    setShouldShow(isDM || isGroupDM || canSendMessages);
  }, [channel.id]);

  if (!shouldShow) return;

  return (
    <div className="wpm-counter">
      <Text variant="eyebrow">WPM: {isFinite(wpm) ? Math.floor(wpm) : 0}</Text>
    </div>
  );
});

export const _WPM = (
  props: {
    channel: Types.Channel;
  } & Record<string, unknown>,
): React.ReactElement => <WordsPerMinute {...props} />;
