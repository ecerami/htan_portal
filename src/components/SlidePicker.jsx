import React from 'react';
import { observer } from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

@observer
class SlidePicker extends React.Component {

    constructor(props) {
        super(props);
        this.handleSlideChange = this.handleSlideChange.bind(this);
    }

    handleSlideChange(event) {
        this.props.appState.setSlideIndex(event.target.value);
    }

    render() {
        var menuList = this.getMenuItems();
        var legend = this.getLegend();
        return (
            <div>
            <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                Channel Group
            </InputLabel>
            <Select
                id="slide-select"
                value={this.props.appState.getSlideIndex()}
                onChange={this.handleSlideChange}
                className='form-control'
            >
            {menuList};
            </Select>
            <div className="legend">
                <h4>Color Coding:</h4>
                { legend }
            </div>
            </div>
        );
    }

    getMenuItems() {
        var menuList = []
        for (var i=0; i<this.props.appState.getSlideJson().slides.length; i++) {
            var currentLabel = this.props.appState.getSlideJson().slides[i].label;
            var key = "slide_" + i;
            menuList.push(<MenuItem key={key} value={i}>{currentLabel}</MenuItem>)
        }
        return menuList;
    }

    getLegend() {
        var legendRows = this.getLegendRows();
        return (
            <div>
            { legendRows}
            </div>
        );
    }

    getLegendRows() {
        var slideIndex = this.props.appState.getSlideIndex();
        var markerList = this.props.appState.getSlideJson().slides[slideIndex].markers;
        var legendRows = []
        for (var i=0; i<markerList.length; i++) {
            var currentLabel = markerList[i].label;
            var currentColor = markerList[i].color;
            legendRows.push(this.getLegendRow(currentLabel, currentColor));
        }
        return legendRows;
    }

    getLegendRow(currentLabel, currentColor) {
        const boxStyle = {
            float: "left",
            backgroundColor: currentColor,
            width:20,
            height:20,
            paddingTop: 2,
            borderStyle: "solid",
            borderColor: "gray",
            borderWidth: 1
        };
        const divStyle = {
            clear: "left",
            margin: 10
        }
        const labelStyle = {
            marginLeft: 10
        }
        return (
            <div style={divStyle} key={currentLabel}>
            <span style={boxStyle}></span>
            <span style={labelStyle}>{currentLabel}</span>
            </div>
        )
    }
};

export default SlidePicker;
