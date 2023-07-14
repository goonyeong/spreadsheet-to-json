const path = require("path");

module.exports = {
  options: {
    defaultLng: "ko",
    lngs: ["ko", "en"],
    resource: {
      loadPath: path.join(__dirname, "./locales/{{lng}}/{{ns}}.json"),
      savePath: path.join(__dirname, "./locales/{{lng}}/{{ns}}.json"),
    },
    keySeparator: false,
    nsSeparator: false,
  },
};
