import DataTable from "./DataTable";
let cases = require("../data/cases.json");
let labels = require("../data/labels.json");

test("Very that Labels Are Imported Correctly", () => {
  let table = new DataTable(cases.cases, labels.labels);
  let labelMap = table.getLabelMap();
  expect(labelMap.size).toBe(7);
  expect(labelMap.has("gender")).toBe(true);
  expect(labelMap.get("gender")).toBe("Gender");
  expect(labelMap.get("BRCA")).toBe("Breast Cancer");
});

test("Very that Filter are Imported Correctly", () => {
  let table = new DataTable(cases.cases, labels.labels);
  let attributeNameSet = table.getAttributeNameSet();
  let attributeValueMap = table.getAttributeValueMap();
  expect(attributeNameSet.has("gender")).toBe(true);
  let genderSet = attributeValueMap.get("gender");
  expect(genderSet.size).toBe(2);
  expect(genderSet.has("male")).toBe(true);
  expect(genderSet.has("female")).toBe(true);

  let cancerTypeSet = attributeValueMap.get("cancerType");
  expect(cancerTypeSet.size).toBe(3);
  expect(cancerTypeSet.has("BRCA")).toBe(true);
  expect(cancerTypeSet.has("LUAD")).toBe(true);
});
