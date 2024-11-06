import Types from "./types";

export default [
  {
    find: "this.getCooldownTextStyle()",
    replacements: [
      {
        match: /(channelId:.\.id}\))]/,
        replace: (_: string, prefix: string) =>
          `${prefix},replugged.plugins.getExports("dev.yofukashino.WordPerMinute")?._WPM?.(this.props)]`,
      },
      {
        match: /\((0===.\.length)/,
        replace: (_: string, suffix: string) => `(!this?.props?.channel?.id&&${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
