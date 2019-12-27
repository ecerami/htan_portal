import React from 'react';
import { observer } from 'mobx-react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

@observer
class GenomicFilterPanel extends React.Component {

    constructor(props) {
        super(props);
        this.handleTmbChange = this.handleTmbChange.bind(this);
        this.handleEgfrVariantChange = this.handleEgfrVariantChange.bind(this);
    }

    handleTmbChange(event) {
        this.props.appState.setTmbSelected(event.target.value);
    }

    handleEgfrVariantChange(event) {
        this.props.appState.setEgfrVariantSelected(event.target.value);
    }

    render() {
        return (
            <div>
            <Grid container spacing={2} alignItems="flex-start">
                <Grid item xs={2}>
                    <div className="form-label">EGFR</div>
                </Grid>
                <Grid item xs={10}>
                    <Select
                        id="variant-select"
                        value={this.props.appState.getEgfrVariantsSelected()}
                        onChange={this.handleEgfrVariantChange}
                        className='form-control'
                        >
                        <MenuItem value={0}>No Matching</MenuItem>
                        <MenuItem value={1}>Any variant</MenuItem>
                        <MenuItem value={2}>Any Tier 1 variant</MenuItem>
                        <MenuItem value={3}>Any Tier 1-2 variant</MenuItem>
                        </Select>
                </Grid>
                <Grid item xs={2}>
                    <div className="form-label">TMB</div>
                </Grid>
                <Grid item xs={10}>
                <Select
                    id="tmb-select"
                    value={this.props.appState.getTmbSelected()}
                    onChange={this.handleTmbChange}
                    className='form-control'
                    >
                    <MenuItem value={0}>Any</MenuItem>
                    <MenuItem value={1}>&gt; 5 mutations/MB</MenuItem>
                    <MenuItem value={2}>&gt; 10 mutations/MB</MenuItem>
                    <MenuItem value={3}>&gt; 15 mutations/MB</MenuItem>
                    <MenuItem value={4}>&gt; 20 mutations/MB</MenuItem>
                    </Select>
                </Grid>
            </Grid>
        </div>
        );
    }
};

export default GenomicFilterPanel;
