/**
 * Filter class, used to generate JSON Query Strings.
 */
import { observable } from "mobx";

class Filter {
  static DELIM = "_";
  @observable filterList = [];

  /**
   * Toggle Filter State
   * Example:  gender, female.
   * @param {AtributeName} name
   * @param {AttributeValue} value
   */
  toggleFilterState(name, value) {
    let key = name + Filter.DELIM + value;
    if (this.filterList.includes(key)) {
      const index = this.filterList.indexOf(key);
      this.filterList.splice(index, 1);
    } else {
      this.filterList.push(key);
    }
  }

  /**
   * Gets the Query String.
   * Example query string:  cases[(gender in ["male", "female"]) and (cancerType in ["BRCA"])]
   */
  getQueryString() {
    let filterMap = this.generateFilterMap();
    let queryString = "";
    let queryList = [];
    for (let name of filterMap.keys()) {
      let subQueryString = "(";
      subQueryString = subQueryString.concat(name + " in [");
      let valueSet = filterMap.get(name);
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

  generateFilterMap() {
    let filterMap = new Map();
    for (let i = 0; i < this.filterList.length; i++) {
      let key = this.filterList.get(i);
      let parts = key.split(Filter.DELIM);
      let name = parts[0];
      let value = parts[1];
      if (filterMap.has(name)) {
        let attributeList = filterMap.get(name);
        attributeList.add(value);
      } else {
        let attributeList = new Set();
        attributeList.add(value);
        filterMap.set(name, attributeList);
      }
    }
    return filterMap;
  }
}

export default Filter;
