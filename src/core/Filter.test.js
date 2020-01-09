import Filter from "./Filter";

test("Very that Query Strings are Created Correctly", () => {
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
