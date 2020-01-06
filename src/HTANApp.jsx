import React from "react";
import { observer } from 'mobx-react';
import AppState from './models/AppState';
import ImageBrowser from './components/ImageBrowser';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DataBrowser from "./components/DataBrowser";

/**
 * HTAN App
 */
@observer
class HTANApp extends React.Component {

  /**
   * Constructor to initiate state
   */
  constructor(props) {
    super(props);
    this.appState = new AppState();
    this.handleModeChange = this.handleModeChange.bind(this);
    this.imageBrowser = <ImageBrowser appState={this.appState}/>;
  }

  handleModeChange() {
    this.appState.showMetaDataBrowser = ! this.appState.showMetaDataBrowser;
  }

  /**
   * Render Component
   */
  render() {
    let mode = this.getMode();
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              HTAN Data Portal
           </Typography>
           <div className="switcher">
           <FormControlLabel
              control={
                <Switch value={this.appState.showImageBrowser}
                  onChange={this.handleModeChange}/>
              }
            label="Switch to Metadata Browser"
          />
          </div>
          </Toolbar>
        </AppBar>
        { mode }
      </div>
    );
  }

  getMode() {
    if (this.appState.showMetaDataBrowser===true) {
      return (<DataBrowser appState={this.appState}/>);
    } else {
      return (<ImageBrowser appState={this.appState}/>);
    }
  }

}

export default HTANApp;
