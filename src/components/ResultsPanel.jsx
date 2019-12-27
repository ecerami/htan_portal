import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TreatmentPanel from './TreatmentPanel';
import GroupStatsPanel from './GroupStatsPanel';

@observer
class ResultsPanel extends React.Component {
    @observable tabSelected = 0
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, newValue) {
        console.log("Tab Selected! " + newValue);
        this.tabSelected = newValue;
    }

    render() {
        return (
            <div>
                <Tabs value={this.tabSelected} onChange={this.handleChange}>
                    <Tab label="Group Stats" id="tab0"/>
                    <Tab label="Treatment Options" id="tab1" />
                    <Tab label="Survival" id="tab2"/>
                </Tabs>

                <div>
                { this.getPanel()}
                </div>

            </div>
        );
    }

    getPanel() {
        if (this.tabSelected === 0) {
            return (
                <GroupStatsPanel appState={this.props.appState}/>
            )
        }
        else if (this.tabSelected === 1) {
            return (
                <TreatmentPanel />
            )
        }
    }
};

export default ResultsPanel;
