import React from "react";
import Grid from "@material-ui/core/Grid";
import DataGrid from './DataGrid'
import { observer } from 'mobx-react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Filter from "../core/Filter";

@observer
class DataBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    let filters = this.getFilters();
    return (
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={3}>
          <div className="leftColumn">
            <h3>Filters:</h3>
            {filters}
          </div>
        </Grid>
        <Grid item xs={9}>
          <DataGrid appState={this.props.appState}/>
        </Grid>
      </Grid>
    );
  }

  handleChange(event) {
    let filter = this.props.appState.filter;
    let parts = event.target.value.split(Filter.DELIM);
    filter.toggleFilterState(parts[0], parts[1]);
  }

  getFilters() {
    let jsx = [];
    let attributeNameSet = this.props.appState.dataTable.getAttributeNameSet();
    let attributeValueMap = this.props.appState.dataTable.getAttributeValueMap();
    let labelMap = this.props.appState.dataTable.getLabelMap();
    let filter = this.props.appState.filter;
    for (let attributeName of attributeNameSet.values()) {
      jsx.push(
        <h4 key={labelMap.get(attributeName)}>{labelMap.get(attributeName)}</h4>
      );
      let currentAttributeValues = attributeValueMap.get(attributeName);
      for (let attributeValue of currentAttributeValues) {
        let key = attributeName + Filter.DELIM + attributeValue;
        let checked = this.isChecked(filter, key);
        this.createCheckBox(jsx, key, checked, labelMap, attributeValue);
      }
    }
    return jsx;
  }

  createCheckBox(jsx, key, checked, labelMap, attributeValue) {
    jsx.push(<FormControlLabel key={key} control={<Checkbox checked={checked} value={key} onChange={this.handleChange} />} label={labelMap.get(attributeValue)} />);
  }

  isChecked(filter, key) {
    let checked = false;
    if (filter.filterList.includes(key)) {
      checked = true;
    }
    return checked;
  }
}

export default DataBrowser;