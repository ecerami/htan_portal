import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

class DataBrowser extends React.Component {

  render() {
    let filters = this.getFilters();
    return (
      <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={3}>
            <div className="leftColumn">
             <h3>Filters:</h3>
             { filters }
            </div>
          </Grid>
          <Grid item xs={9}>
            Data Grid
          </Grid>
        </Grid>
    );
  }

  handleChange() {

  }
  
  getFilters() {
    let jsx = [];
    let attributeNameSet = this.props.appState.dataTable.getAttributeNameSet();
    let attributeValueMap = this.props.appState.dataTable.getAttributeValueMap();
    let labelMap = this.props.appState.dataTable.getLabelMap();
    for (let attributeName of attributeNameSet.values()) {
      jsx.push(<h4 key={labelMap.get(attributeName)}>{labelMap.get(attributeName)}</h4>);
      let currentAttributeValues = attributeValueMap.get(attributeName);
      for (let value of currentAttributeValues) {
        jsx.push(
          <FormControlLabel
          key={labelMap.get(value)}
          control={
            <Checkbox checked={true} onChange={this.handleChange('antoine')} value="antoine" />
          }
          label={labelMap.get(value)}
        />)
      }
    }
    return jsx;
  }

};

export default DataBrowser;
