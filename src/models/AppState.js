import { observable } from "mobx";
import L from "leaflet";
import DataTable from '../core/DataTable';
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
    this.dataTable = new DataTable(this.casesJson, this.labelsJson);
    this.initMap();
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
