import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey'
import { observer } from 'mobx-react';

@observer
class GroupStatsPanel extends React.Component {

  render() {
    return (
      <div className="chart">
        <br />Number of matching patients:  {this.props.appState.getNumMatchingPatients()}
        <ResponsiveSankey
          layout="vertical"
          data={this.props.appState.getMatchesJson()}
          margin={{ top: 40, right: 160, bottom: 40, left: 50 }}
          align="start"
          colors={{ scheme: 'category10' }}
          nodeOpacity={1}
          nodeThickness={63}
          nodeInnerPadding={3}
          nodeSpacing={56}
          nodeBorderWidth={0}
          nodeBorderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
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