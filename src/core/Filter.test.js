import Filter from "./Filter";

test("Query String, Test 1", () => {
  let filter = new Filter();
  filter.addFilter("gender", "male");
  filter.addFilter("gender", "female");
  filter.addFilter("cancerType", "LUAD");
  filter.addFilter("cancerType", "BRCA");
  let queryStr = filter.getQueryString();
  expect(queryStr).toBe(
    "(gender in ['male','female']) and (cancerType in ['LUAD','BRCA'])"
  );
});

test("Query String, Test 2", () => {
  let filter = new Filter();
  filter.addFilter("gender", "male");
  filter.addFilter("cancerType", "LUAD");
  filter.addFilter("cancerType", "BRCA");
  let queryStr = filter.getQueryString();
  expect(queryStr).toBe(
    "(gender in ['male']) and (cancerType in ['LUAD','BRCA'])"
  );
});

test("Query String, Test 3", () => {
  let filter = new Filter();
  filter.addFilter("gender", "male");
  filter.addFilter("cancerType", "LUAD");
  filter.addFilter("cancerType", "BRCA");
  filter.addFilter("tissue", "lung");
  let queryStr = filter.getQueryString();
  expect(queryStr).toBe(
    "(gender in ['male']) and (cancerType in ['LUAD','BRCA']) and (tissue in ['lung'])"
  );
});