/**
 * Filter class, used to generate JSON Query Strings.
 */
class Filter {
  filterMap = new Map();

  /**
   * Add a new categorical filter.
   * Example:  gender, female.
   * @param {AtributeName} name
   * @param {AttributeValue} value
   */
  addFilter(name, value) {
    let currentValueList = new Set();
    if (this.filterMap.has(name)) {
      currentValueList = this.filterMap.get(name);
    }
    currentValueList.add(value);
    this.filterMap.set(name, currentValueList);
  }

  /**
   * Gets the Query String.
   * Example query string:  cases[(gender in ["male", "female"]) and (cancerType in ["BRCA"])]
   */
  getQueryString() {
    let queryString = "";
    let queryList = [];
    for (let name of this.filterMap.keys()) {
      let subQueryString = "(";
      subQueryString = subQueryString.concat(name + " in [");
      let valueSet = this.filterMap.get(name);
      let valueList = [];
      for (let value of valueSet) {
        valueList.push("'" + value + "'");
      }
      subQueryString = subQueryString.concat(valueList.join());
      subQueryString = subQueryString.concat("])");
      queryList.push(subQueryString);
    }
    queryString = queryList.join(" and ");
    return queryString;
  }
}

export default Filter;
