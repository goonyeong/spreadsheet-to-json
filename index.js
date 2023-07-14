const { GoogleSpreadsheet } = require("google-spreadsheet");
//구글 sheet json 파일
const creds = require("./.credentials/weshlist-ac4665af974d.json");
const i18nextConfig = require("./i18next-scanner.config.js");

const lngs = i18nextConfig.options.lngs;
//구글 스프레드시트의 gid
const loadPath = i18nextConfig.options.resource.loadPath;
const localesPath = loadPath.replace("/{{lng}}/{{ns}}.json", "");
//번역이 필요없는 부분
const NOT_AVAILABLE_CELL = "N/A";
//스프레드시트에 들어갈 header 설정

const columnKeyToHeader = {
  key: "KEY",
  ko: "KO",
  en: "EN",
};

const docId = "1OyXol5d1-HgAkB-EYV5S8evLQ5lN2px6T0tOla_4hAU";

const sheets = [
  {
    fileName: "nftfi",
    sheetId: "0",
  },
];

async function loadSpreadsheet() {
  // spreadsheet key is the long id in the sheets URL
  const doc = new GoogleSpreadsheet(docId);

  // load directly from json file if not in secure environment
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets

  console.log("loadSpreadsheet");

  return doc;
}

module.exports = {
  loadSpreadsheet,
  localesPath,
  lngs,
  sheets,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
};
