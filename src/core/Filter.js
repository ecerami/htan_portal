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
      this.filterList.push(key)
    }
  }

  /**
   * Gets the Query String.
   * Example query string:  cases[(gender in ["male", "female"]) and (cancerType in ["BRCA"])]
   */
  getQueryString() {
    // TODO:  Convert the Array to a Map of Sets...
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
