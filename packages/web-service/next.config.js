const prod = require("./next.config.prod");
const dev = require("./next.config.dev");

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

module.exports = (phase) => {
  const common = {
    poweredByHeader: false,
    distDir: "dist",
    reactStrictMode: true,
  };

  switch (phase) {
    case PHASE_PRODUCTION_BUILD:
      return { ...common, ...prod };
    case PHASE_DEVELOPMENT_SERVER:
    default:
      return { ...common, ...dev };
  }
};
