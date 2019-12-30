import React from "react";
import AppState from './models/AppState';
import SlidePicker from './components/SlidePicker';
import ImagePanel from './components/ImagePanel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

/**
 * HTAN App
 */
class HTANApp extends React.Component {

  /**
   * Constructor to initiate state
   */
  constructor(props) {
    super(props);
    this.appState = new AppState();
  }

  /**
   * Render Component
   */
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Multiplex Image Browser
          </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={3}>
            <div className="leftColumn">
              <div>
              <h3>Melanoma Pre-Cancer Atlas (HTAN):  Patient 1</h3>
              Data served from <a href="https://www.cycif.org/data/pca-2019/">Cycif.org</a>.
              </div>
              <br/>
              t-CyCIF analysis of biopsy from Patient 1 that contains examplars of early melanoma progression.
              <br/><br/>
              <SlidePicker appState={this.appState}/>
            </div>
          </Grid>
          <Grid item xs={9}>
            <ImagePanel appState={this.appState}/>
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default HTANApp;
