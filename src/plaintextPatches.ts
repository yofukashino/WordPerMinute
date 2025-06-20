import Types from "./types";

export default [
  {
    find: ".typingDots,",
    replacements: [
      {
        match: /(channelId:.\.id}\))]/,
        replace: (_: string, prefix: string) =>
          `${prefix},replugged.plugins.getExports("dev.yofukashino.WordPerMinute")?._WPM?.(arguments[0])]`,
      },
      {
        match: /\((0===.\.length)/,
        replace: (_: string, suffix: string) => `(!arguments?.[0]?.channel?.id&&${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
