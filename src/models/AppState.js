import { observable } from "mobx";
import L from "leaflet";
var json1 = require("../data/slides.json");
var json2 = require("../data/cases.json");
var json3 = require("../data/labels.json");

/**
 * Encapsulate all State Variables for the Application.
 */
export default class AppState {
  @observable slidesJson;
  @observable slideIndex = 0;
  @observable showMetaDataBrowser = false;

  constructor() {
    this.slidesJson = json1;
    this.casesJson = json2;
    this.labelsJson = json3;
    this.initLabels(this.labelsJson.labels);
    this.initFilters(this.casesJson.cases);
    this.initMap();
  }

  /**
   * Init all the Labels.
   */
  initLabels(jsonList) {
    let labels = new Map();
    for (let currentIndex in jsonList) {
      let currentItem = jsonList[currentIndex];
      labels[currentItem.id] = currentItem.label;
    }
    this.labels = labels;
  }

  /**
   * Takes a JSON List and automatically generates:
   * 1.  List of Attribute Names
   * 2.  List of Permissible Attribute Values for each Attribute Name
   */
  initFilters(jsonList) {
    let attributeNames = new Set();
    let attributeValues = new Map();
    for (let currentIndex in jsonList) {
      let currentItem = jsonList[currentIndex];
      for (let key in currentItem) {
        attributeNames.add(key);
        let currentValue = currentItem[key];
        if (key in attributeValues) {
          let currentAttributeSet = attributeValues[key];
          currentAttributeSet.add(currentValue);
        } else {
          let currentAttributeSet = new Set();
          currentAttributeSet.add(currentValue);
          attributeValues[key] = currentAttributeSet;
        }
      }
    }
    // Remove the ID
    attributeNames.delete("id");
    this.attributeNames = attributeNames;
    this.attributeValues = attributeValues;
  }

  initMap() {
    var slideUrl = this.getSlideUrl(this.slideIndex);
    this.layer = L.tileLayer(slideUrl, {
      crs: L.CRS.Simple,
      noWrap: true,
      zoomReverse: true,
      minNativeZoom: 0,
      maxNativeZoom: 4,
      minZoom: 0,
      maxZoom: 4,
      attribution: "Ethan Cerami"
    });
  }

  getLayer() {
    return this.layer;
  }

  getSlideJson() {
    return this.slidesJson;
  }

  getSlideIndex() {
    return this.slideIndex;
  }

  setSlideIndex(index) {
    this.slideIndex = index;
    var slideUrl = this.getSlideUrl(this.slideIndex);
    this.layer.setUrl(slideUrl);
  }

  getSlideUrl(index) {
    var prefix = "https://s3.amazonaws.com/www.cycif.org/pca2019/";
    var fileNamePattern = "/{z}_{x}_{y}.jpg";
    return prefix + this.slidesJson.slides[index].url + fileNamePattern;
  }
}
