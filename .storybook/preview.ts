import "../assets/base.css";

const customViewports = {
  desktop: {
    name: "Desktop - 1440px",
    styles: {
      width: "1440px",
      height: "1024px",
    },
  },
  mobile: {
    name: "Mobile - 480px",
    styles: {
      width: "479px",
      height: "800px",
    },
  },
  tablet: {
    name: "Tablet - 768px",
    styles: {
      width: "768px",
      height: "1024px",
    },
  },
};

const preview = {
  parameters: {
    viewport: { viewports: { ...customViewports } },
    layout: "fullscreen",
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export default preview;