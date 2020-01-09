import jsonata from "jsonata";

/**
 * Encapsulates a Data Table.
 * Can be filtered and rendered.
 */
class DataTable {
  /**
   * Constructor
   * @param {JSON Data} dataList
   * @param {JSON Labels} labelList
   */
  constructor(dataList, labelList) {
    this.dataRoot = Object.keys(dataList)[0];
    this.dataList = dataList;
    this.initLabels(labelList.labels);
    this.initFilters(dataList[this.dataRoot]);
  }

  /**
   * Gets the Label Map.
   * Example:  BRCA --> Breast Cancer
   */
  getLabelMap() {
    return this.labelMap;
  }

  /**
   * Gets the List of all Attribute Names.
   * Example:  gender, cancerType, etc.
   */
  getAttributeNameSet() {
    return this.attributeNameSet;
  }

  /**
   * Gets the Attribute Value Map.
   * Example:  gender --> (male, female).
   */
  getAttributeValueMap() {
    return this.attributeValueMap;
  }

  filterTable (filter) {
    let queryString = filter.getQueryString();
    queryString = this.dataRoot + " [" + queryString + "]";
    let expression = jsonata(queryString);
    let result = expression.evaluate(this.dataList);
    return result;
  }

  /**
   * Takes a JSON List and automatically generates:
   * 1.  List of Attribute Names
   * 2.  List of Permissible Attribute Values for each Attribute Name
   */
  initFilters(dataList) {
    this.attributeNameSet = new Set();
    this.attributeValueMap = new Map();
    for (let i = 0; i < dataList.length; i++) {
      let currentItem = dataList[i];
      for (let key in currentItem) {
        let currentValue = currentItem[key];
        this.attributeNameSet.add(key);
        if (this.attributeValueMap.has(key)) {
          let currentAttributeSet = this.attributeValueMap.get(key);
          currentAttributeSet.add(currentValue);
        } else {
          let currentAttributeSet = new Set();
          currentAttributeSet.add(currentValue);
          this.attributeValueMap.set(key, currentAttributeSet);
        }
      }
    }
  }

  /**
   * Init all the Labels.
   */
  initLabels(labelList) {
    this.labelMap = new Map();
    for (let currentIndex in labelList) {
      let currentItem = labelList[currentIndex];
      this.labelMap.set(currentItem.id, currentItem.label);
    }
  }
}

export default DataTable;
