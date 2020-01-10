/**
 * Filter class, used to generate JSON Query Strings.
 */
import { observable, computed } from "mobx";

class Filter {
  @observable filterMap = new Map();

  /**
   * Toggle Filter State
   * Example:  gender, female.
   * @param {AtributeName} name
   * @param {AttributeValue} value
   */
  toggleFilterState(name, value) {
    if (this.getFilterState(name, value)) {
      let currentValueList = this.filterMap.get(name);
      currentValueList.delete(value);
    } else {
      let currentValueList = new Set();
      if (this.filterMap.has(name)) {
        currentValueList = this.filterMap.get(name);
      }
      currentValueList.add(value);
      this.filterMap.set(name, currentValueList);
    }
  }

  @computed getFilterState(name, value) {
    let returnValue = false;
    if (this.filterMap.has(name)) {
      let currentValueList = this.filterMap.get(name);
      returnValue = currentValueList.has(value);
    }
    console.log(
      "Checking filter state:  " + name + ", " + value + " --> " + returnValue
    );
    return returnValue;
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
