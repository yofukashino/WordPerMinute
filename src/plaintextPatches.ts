import Types from "@Types";

export default [
  {
    find: ".typingDots,",
    replacements: [
      {
        match: /(channel:\i,isThreadCreation:\i}\))]/,
        replace: (_: string, prefix: string) => `${prefix},$exports?._WPM?.(arguments[0])]`,
      },
      {
        match: /\),(0===\i\.length)/,
        replace: (_: string, suffix: string) => `),!arguments?.[0]?.channel?.id&&${suffix}`,
      },
    ],
  },
] as Types.DefaultTypes.PlaintextPatch[];
