import React from 'react';
import { ResponsiveBar } from '@nivo/bar'

class TreatmentPanel extends React.Component {
    data = [
        {
          "year": "2016",
          "treatment 1": 48,
          "treatment 2": 12,
          "treatment 3": 20,
          "treatment 4": 20,
        },
        {
          "year": "2017",
          "treatment 1": 38,
          "treatment 2": 22,
          "treatment 3": 20,
          "treatment 4": 20,
        },
        {
          "year": "2018",
          "treatment 1": 18,
          "treatment 2": 22,
          "treatment 3": 20,
          "treatment 4": 40,
        },
        {
          "year": "2019",
          "treatment 1": 8,
          "treatment 2": 22,
          "treatment 3": 20,
          "treatment 4": 50,
        }
      ]

    render() {
        return (
            <div className="chart">
                <ResponsiveBar
                data={this.data}
                keys={[ 'treatment 1', 'treatment 2', 'treatment 3', 'treatment 4' ]}
                groupMode="stacked"
                indexBy="year"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'nivo' }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Year',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Treatment (Percentage)',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                    }
                    ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                />
            </div>
        );
    }
};

export default TreatmentPanel;