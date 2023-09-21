module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@helper": "./helper",
            "@features": "./features",
            "@assets": "./assets",
            "@constants": "./constants",
          },
        },
      ],
    ],
  };
};
