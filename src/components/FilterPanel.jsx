import React from 'react';
import { observer } from 'mobx-react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GenomicFilterPanel from './GenomicFilterPanel';

@observer
class FilterPanel extends React.Component {

    // constructor(props) {
    //     super(props);
    //     //this.selectFruit = this.selectFruit.bind(this);
    // }

    // selectFruit(event) {
    //     console.log("Fruit Selected! " + event.target.value);
    //     this.props.appState.selectedFruit = event.target.value;
    // }

    render() {
        return (
            <div>
                <br/>
        <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            >
            <Typography variant="h6">Genomics</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <GenomicFilterPanel appState={this.props.appState} />
            </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
            >
            <Typography variant="h6">Clinical</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
        );
    }
};

export default FilterPanel;
