import React from 'react';
import { observer } from 'mobx-react';
import SlidePicker from './SlidePicker';
import ImagePanel from './ImagePanel';
import Grid from '@material-ui/core/Grid';

class ImageBrowser extends React.Component {

  render() {
    return (
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={3}>
            <div className="leftColumn">
              <div>
                <h3>Melanoma Pre-Cancer Atlas (HTAN):  Patient 1</h3>
                Data served from <a href="https://www.cycif.org/data/pca-2019/">Cycif.org</a>.
              </div>
              <br />
              t-CyCIF analysis of biopsy from Patient 1 that contains examplars of early melanoma progression.
              <br /><br />
              <SlidePicker appState={this.props.appState} />
            </div>
          </Grid>
          <Grid item xs={9}>
            <ImagePanel appState={this.props.appState} />
          </Grid>
        </Grid>
    );
  }

};

export default ImageBrowser;
