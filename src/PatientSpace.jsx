import React from "react";
import PatientSpaceState from './models/PatientSpaceState';
import FilterPanel from './components/FilterPanel';
import ResultsPanel from './components/ResultsPanel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import BarChartIcon from '@material-ui/icons/BarChart';

/**
 * PatientSpace App
 */
class PatientSpace extends React.Component {

  /**
   * Constructor to initiate state
   */
  constructor(props) {
    super(props);
    this.appState = new PatientSpaceState();
  }

  /**
   * Render Component
   */
  render() {
    var divStyle = {
      marginLeft: 25,
      marginTop: 10
    }
    return (
      <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            PatientSpace
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className='section'>
          <FilterPanel appState={this.appState}/>
          </div>
        </Grid>
        <Grid item xs={8}>
          <div className='section' >
          <ResultsPanel appState={this.appState}/>
          </div>
        </Grid>
      </Grid>
      </div>
    );
  }

}

export default PatientSpace;
