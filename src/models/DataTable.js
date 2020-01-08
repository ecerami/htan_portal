/**
 * Encapsulates Data Table.
 * Can be filtered and rendered.
 */
class DataTable {
  /**
   * Constructor
   * @param {JSON Data} dataList
   * @param {JSON Labels} labelList
   */
  constructor(dataList, labelList) {
    this.initLabels(labelList);
    this.initFilters(dataList);
  }

  /**
   * Takes a JSON List and automatically generates:
   * 1.  List of Attribute Names
   * 2.  List of Permissible Attribute Values for each Attribute Name
   */
  initFilters(dataList) {
    this.attributeNames = {};
    this.attributeValues = {};
    for (let i = 0; i < dataList.length; i++) {
      let currentItem = dataList[i];
      for (let key in currentItem) {
        let currentValue = currentItem[key];
        this.attributeNames[key] = true;
        if (key in this.attributeValues) {
          let currentAttributeSet = this.attributeValues[key];
          currentAttributeSet[currentValue] = true;
        } else {
          let currentAttributeSet = {};
          currentAttributeSet[currentValue] = true;
          this.attributeValues[key] = currentAttributeSet;
        }
      }
    }

    // TODO:  Convert attributeNames to a regular array
    // TODO:  Convert members of attributeValues to a regular array
  }

  getLabelMap() {
    return this.labelMap;
  }

  getAttributeNameMap() {
    return this.attributeNames;
  }

  getAttributeValueMap() {
    return this.attributeValues;
  }

  /**
   * Init all the Labels.
   */
  initLabels(labelList) {
    this.labelMap = {};
    for (let currentIndex in labelList) {
      let currentItem = labelList[currentIndex];
      this.labelMap[currentItem.id] = currentItem.label;
    }
  }
}

export default DataTable;
