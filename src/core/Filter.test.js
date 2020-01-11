import Filter from "./Filter";

test("Query String, Test 1", () => {
  let filter = new Filter();
  filter.toggleFilterState("gender", "male");
  filter.toggleFilterState("gender", "female");
  filter.toggleFilterState("cancerType", "LUAD");
  filter.toggleFilterState("cancerType", "BRCA");
  let filterMap = filter.generateFilterMap();
  expect(filterMap.has("gender")).toBeTruthy();
  let queryStr = filter.getQueryString();
  expect(queryStr).toBe(
    "(gender in ['male','female']) and (cancerType in ['LUAD','BRCA'])"
  );
});

test("Query String, Test 2", () => {
  let filter = new Filter();
  filter.toggleFilterState("gender", "male");
  filter.toggleFilterState("cancerType", "LUAD");
  filter.toggleFilterState("cancerType", "BRCA");
  let queryStr = filter.getQueryString();
  expect(queryStr).toBe(
    "(gender in ['male']) and (cancerType in ['LUAD','BRCA'])"
  );
});

test("Query String, Test 3", () => {
  let filter = new Filter();
  filter.toggleFilterState("gender", "male");
  filter.toggleFilterState("cancerType", "LUAD");
  filter.toggleFilterState("cancerType", "BRCA");
  filter.toggleFilterState("tissue", "lung");
  let queryStr = filter.getQueryString();
  expect(queryStr).toBe(
    "(gender in ['male']) and (cancerType in ['LUAD','BRCA']) and (tissue in ['lung'])"
  );
});
