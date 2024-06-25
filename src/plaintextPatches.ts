import Types from "./types";

export default [
  {
    find: ".Messages.SEVERAL_USERS_TYPING",
    replacements: [
      {
        match: /(channelId:.\.id}\))]/,
        replace: (_: string, prefix: string) =>
          `${prefix},replugged.plugins.getExports("dev.yofukashino.WordPerMinute")?._WPM?.(this.props)]`,
      },
      {
        match: /\((0===.\.length)/,
        replace: (_: string, suffix: string) => `(!true&&${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
