import React from "react";
import { observer } from 'mobx-react';

@observer
class DataGrid extends React.Component {

  render() {
    let filterList = this.getFilterList();

    return (
        <div>
          <h3>Data Grid</h3>
              { filterList } 
        </div>
    );
  }

  getFilterList() {
    let filterList = this.props.appState.filter.filterList;
    let str = "";
    for (let i=0; i<filterList.length; i++) {
        str = str + filterList[i];
    }
    return str;
  }
}

export default DataGrid;