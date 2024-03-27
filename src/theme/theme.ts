export const theme = () => {
  return {
    colors: {
      primary: "#006FEE",
      onPrimary: "rgb(255, 255, 255)",
      primaryContainer: "#99C7FB",
      onPrimaryContainer: "#001731",

      secondary: "#7828C8",
      onSecondary: "rgb(255, 255, 255)",
      secondaryContainer: "#C9A9E9",
      onSecondaryContainer: "#180828",

      tertiary: "rgb(128, 81, 88)",
      onTertiary: "rgb(255, 255, 255)",
      tertiaryContainer: "rgb(255, 217, 221)",
      onTertiaryContainer: "rgb(50, 16, 23)",

      error: "#F31260",
      onError: "rgb(255, 255, 255)",
      errorContainer: "#FAA0BF",
      onErrorContainer: "#310413",

      background: "#FFFFFF",
      onBackground: "#000000",

      // ? TODO : change color to match the design
      surface: "rgb(255, 251, 255)",
      onSurface: "rgb(29, 27, 30)",
      surfaceVariant: "rgb(233, 223, 235)",
      onSurfaceVariant: "rgb(74, 69, 78)",

      outline: "rgb(124, 117, 126)",
      outlineVariant: "rgb(204, 196, 206)",

      shadow: "rgb(0, 0, 0)",
      scrim: "rgb(0, 0, 0)",
      inverseSurface: "rgb(50, 47, 51)",
      inverseOnSurface: "rgb(245, 239, 244)",
      inversePrimary: "rgb(220, 184, 255)",
      elevation: {
        level0: "transparent",
        level1: "rgb(248, 242, 251)",
        level2: "rgb(244, 236, 248)",
        level3: "rgb(240, 231, 246)",
        level4: "rgb(239, 229, 245)",
        level5: "rgb(236, 226, 243)",
      },
      surfaceDisabled: "rgba(29, 27, 30, 0.12)",
      onSurfaceDisabled: "rgba(29, 27, 30, 0.38)",
      backdrop: "rgba(51, 47, 55, 0.4)",
    },
  };
};
