/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@whitespace/storybook-addon-html",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
  ],
  staticDirs: ["../snippets", "../assets", "../sections"],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
    source: {
      type: "html",
    },
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.liquid$/,
      use: "liquidjs-loader",
    });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{
        loader: require.resolve('ts-loader'),
      }],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
export default config;