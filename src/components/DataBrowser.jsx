import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
          Data Grid
        </Grid>
      </Grid>
    );
  }

  handleChange(event) {
    let filter = this.props.appState.filter;
    console.log("Event Target Value:  " + event.target.value);
    console.log("Event Target Checked:  " + event.target.checked);
    let parts = event.target.value.split("_");
    console.log(parts[0] + " " + parts[1]);
    //filter.toggleFilterState(parts[0], parts[1]);
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
        let key = attributeName + "_" + attributeValue;
        jsx.push(
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                checked={filter.getFilterState(attributeName, attributeValue)}
                value={key}
                onChange={this.handleChange}
              />
            }
            label={labelMap.get(attributeValue)}
          />
        );
      }
    }
    return jsx;
  }
}

export default DataBrowser;
