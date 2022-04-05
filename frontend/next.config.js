module.exports = {
  webpack: (config, options) => {
    Object.assign(config.resolve.alias, {
      abstracts: "styles/abstracts",
    });
    return config;
  },
}