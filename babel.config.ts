module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    puglins: [
      [
        "module-resolver",
        {
          root: ["*./src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "@": "./src",
          },
        },
      ],
    ],
  };
};
