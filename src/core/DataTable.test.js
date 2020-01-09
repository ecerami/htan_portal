import DataTable from "./DataTable";
import Filter from "./Filter";
let cases = require("../data/test_cases.json");
let labels = require("../data/test_labels.json");

test("Verify that Labels Are Imported Correctly", () => {
  let table = new DataTable(cases, labels);
  let labelMap = table.getLabelMap();
  expect(labelMap.size).toBe(7);
  expect(labelMap.has("gender")).toBe(true);
  expect(labelMap.get("gender")).toBe("Gender");
  expect(labelMap.get("BRCA")).toBe("Breast Cancer");
});

test("Verify that Filters are Imported Correctly", () => {
  let table = new DataTable(cases, labels);
  let attributeNameSet = table.getAttributeNameSet();
  let attributeValueMap = table.getAttributeValueMap();
  expect(attributeNameSet.has("id")).toBe(false);
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

test("Test Filters, Take 1", () => {
  let filter = new Filter();
  filter.addFilter("gender", "female");
  filter.addFilter("cancerType", "LUAD");
  filter.addFilter("cancerType", "BRCA");
  let table = new DataTable(cases, labels);
  let filteredTable = table.filterTable(filter);
  expect(filteredTable.length).toBe(3);
});

test("Test Filters, Take 2", () => {
  let filter = new Filter();
  filter.addFilter("gender", "male");
  filter.addFilter("cancerType", "LUAD");
  filter.addFilter("cancerType", "BRCA");
  let table = new DataTable(cases, labels);
  let filteredTable = table.filterTable(filter);
  expect(filteredTable.length).toBe(6);
});