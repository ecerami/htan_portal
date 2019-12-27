import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey'
import { observer } from 'mobx-react';

@observer
class GroupStatsPanel extends React.Component {
    data =
    {
        "nodes": [
          {
            "id": "Cancer Type",
          },
          {
            "id": "Mutation Matches",
          },
          {
            "id": "Mutation No Matches",
          },          
          {
            "id": "TMB Matches",
          },
          {
            "id": "TMB No Matches",
          },
          {
            "id": "Clinical Matches",
          },
          {
            "id": "Clinical No Matches",
          },
        ],
        "links": [
          {
            "source": "Cancer Type",
            "target": "Mutation Matches",
            "value": 300
          },
          {
            "source": "Cancer Type",
            "target": "Mutation No Matches",
            "value": 400
          },          
          {
            "source": "Mutation Matches",
            "target": "TMB Matches",
            "value": 90
          },
          {
            "source": "Mutation Matches",
            "target": "TMB No Matches",
            "value": 210
          },          
          {
            "source": "TMB Matches",
            "target": "Clinical Matches",
            "value": 45
          },
          {
            "source": "TMB Matches",
            "target": "Clinical No Matches",
            "value": 45
          },
        ]
      }
      

    render() {
        return (
            <div className="chart">
                <br/>Number of matching patients:  {this.props.appState.getNumMatchingPatients()}
                <ResponsiveSankey
                        layout="vertical"
                        data={this.data}
                        margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
                        align="start"
                        colors={{ scheme: 'category10' }}
                        nodeOpacity={1}
                        nodeThickness={63}
                        nodeInnerPadding={3}
                        nodeSpacing={56}
                        nodeBorderWidth={0}
                        nodeBorderColor={{ from: 'color', modifiers: [ [ 'darker', 0.8 ] ] }}
                        linkOpacity={0.5}
                        linkHoverOthersOpacity={0.1}
                        enableLinkGradient={true}
                        labelPosition="outside"
                        labelOrientation="horizontal"
                        labelPadding={16}
                        labelTextColor="black"
                        animate={true}
                        motionStiffness={140}
                        motionDamping={13}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                translateX: 130,
                                itemWidth: 100,
                                itemHeight: 14,
                                itemDirection: 'right-to-left',
                                itemsSpacing: 2,
                                itemTextColor: 'black',
                                symbolSize: 14,
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                    }
                                ]
                            }
                        ]}
                />
            </div>
        );
    }
};

export default GroupStatsPanel;