import { observable } from "mobx";
import L from 'leaflet';
var json = require('./slides.json');

/**
 * Encapsulate all State Variables for the Application.
 */
export default class AppState {
    @observable slidesJson;
    @observable slideIndex = 0;
    
    constructor() {
        this.slidesJson = json;
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
          attribution: 'Ethan Cerami'
        })
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