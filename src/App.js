import React, {Component} from 'react';
import DataTable from './DataTable';
import TableHeaderColumn from './TableHeaderColumn'
const TABLE_DATA = [
  {
    _id: 1,
    name: 'Frozen yogurt',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 2,
    name: 'Ice cream sandwich',
    calories: '19',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 3,
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 4,
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 5,
    name: 'Ice cream sandwich',
    calories: '99',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 6,
    name: 'Ice cream sandwich',
    calories: '169',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 7,
    name: 'Ice cream sandwich',
    calories: '129',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 8,
    name: 'Ice cream sandwich',
    calories: '159',
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 9  ,
    name: 'Ice cream sandwich',
    calories: '109',
    fat: '6.0',
    carbs: '24',
    
  },
  
];

class App extends Component {
  
   render() {
    return (
      <DataTable
        data={TABLE_DATA}
        rowId = {"_id"}
        isCheckboxEnable={true}
        isPaginationEnable={true}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5,10,20,50]}
        isSortEnable={true}
        columnorderBy={'name'}
        isFilterbarEnable={true}
      >
        <TableHeaderColumn dataField="name"
          label = 'name'
          dataFormat={(name, lead) => (
            <div>test</div>
          )}>
          </TableHeaderColumn>
        <TableHeaderColumn dataField="calories" label="calories"/>
        <TableHeaderColumn dataField="fat" label="fat"/>
        <TableHeaderColumn dataField="carbs" label="carbs"/>
      </DataTable>
    );
  }
}

export default App