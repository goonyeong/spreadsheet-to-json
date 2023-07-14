const fs = require("fs");

const {
  loadSpreadsheet,
  localesPath,
  lngs,
  sheets,
  columnKeyToHeader,
  NOT_AVAILABLE_CELL,
} = require("./index");

// 스프레드시트 -> json
async function fetchTranslationsFromSheetToJson(doc, sheetId) {
  const sheet = doc.sheetsById[sheetId];

  if (!sheet) {
    return {};
  }

  const lngsMap = {};
  const rows = await sheet.getRows();

  rows.forEach((row) => {
    const key = row[columnKeyToHeader.key];
    if (key === undefined) return;

    lngs.forEach((lng) => {
      const translation = row[columnKeyToHeader[lng]];

      if (translation === NOT_AVAILABLE_CELL) {
        return;
      }

      if (!lngsMap[lng]) {
        lngsMap[lng] = {};
      }

      lngsMap[lng][key] = translation || ""; // prevent to remove undefined value like ({"key": undefined})
    });
  });

  return lngsMap;
}

//json 파일 업데이트
async function updateJsonFromSheet(fileName, sheetId) {
  const doc = await loadSpreadsheet();

  const lngsMap = await fetchTranslationsFromSheetToJson(doc, sheetId);
  console.log(
    `!!!${fileName}!!! json form data :::::::: -----------------------------------------`,
    lngsMap
  );

  fs.readdir(localesPath, (error, lngs) => {
    if (error) {
      throw error;
    }

    // 언어 별로,
    lngs.forEach((lng) => {
      const localeJsonFilePath = `${localesPath}/${lng}/${fileName}.json`;

      const jsonString = JSON.stringify(lngsMap[lng], null, 2);

      fs.writeFile(localeJsonFilePath, jsonString, "utf8", (err) => {
        if (err) {
          throw err;
        }
      });
    });
  });
}

(async function () {
  sheets.map(async (sheet) => {
    await updateJsonFromSheet(sheet.fileName, sheet.sheetId);
  });
})();
