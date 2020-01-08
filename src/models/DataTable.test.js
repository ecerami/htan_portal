import DataTable from "./DataTable";
let cases = require("./cases.json");
let labels = require("./labels.json");

test("Very that Labels Are Imported Correctly", () => {
  let table = new DataTable(cases.cases, labels.labels);
  let labelMap = table.getLabelMap();
  let labelKeys = Object.keys(labelMap);
  expect(labelKeys.length).toBe(7);
  expect(labelKeys).toContain("gender");
  expect(labelMap["gender"]).toEqual("Gender");
  expect(labelKeys).toContain("BRCA");
  expect(labelMap["BRCA"]).toEqual("Breast Cancer");
});

test("Very that Filter are Imported Correctly", () => {
  let table = new DataTable(cases.cases, labels.labels);
  let attributeNameMap = table.getAttributeNameMap();
  expect(attributeNameMap["gender"]).toBe(true);
});
