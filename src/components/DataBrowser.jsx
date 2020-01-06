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
    let attributeNames = this.props.appState.attributeNames;
    let attributeValues = this.props.appState.attributeValues;
    let labels = this.props.appState.labels;
    for (let attributeName of attributeNames.values()) {
      jsx.push(<h4 key={labels[attributeName]}>{labels[attributeName]}</h4>);
      let currentAttributeValues = attributeValues[attributeName];
      for (let value of currentAttributeValues) {
        jsx.push(
          <FormControlLabel
          key={labels[value]}
          control={
            <Checkbox checked={true} onChange={this.handleChange('antoine')} value="antoine" />
          }
          label={labels[value]}
        />)
      }
    }
    return jsx;
  }

};

export default DataBrowser;
