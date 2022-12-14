const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-actions",
    "@storybook/addon-controls",
    "storybook-addon-styled-component-theme/dist/preset",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },

  //* alias (절대 경로)
  viteFinal: async (config, { configType }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
      stream: path.resolve(__dirname, "../node_modules/readable-stream"),
    };
    return config;
  },
};
