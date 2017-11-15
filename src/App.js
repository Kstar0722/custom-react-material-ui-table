import React, {Component} from 'react';
import DataTable from './DataTable';
import TableHeaderColumn from './TableHeaderColumn'
import Button from 'material-ui/Button'
const TABLE_DATA = [
  {
    _id: 1,
    name: 'frozen yogurt',
    calories: 1,
    fat: ['6.0', '0,4'],
    carbs: '24',
    
  }, {
    _id: 2,
    name: 'bdasss sdf ',
    calories: 2,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 3,
    name: 'wer erew',
    calories: 3,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 4,
    name: 'khjktyh',
    calories: 159,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 5,
    name: 'xcvbcv',
    calories: 99,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 6,
    name: 'adfasdf',
    calories: 169,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 7,
    name: 'yuyiuyiuy',
    calories: 129,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 8,
    name: 'ioiooh',
    calories: 179,
    fat: '6.0',
    carbs: '24',
    
  }, {
    _id: 9  ,
    name: 'oiouuyo',
    calories: 109,
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
        rowsPerPage={10}
        rowsPerPageOptions={[10,20,50]}
        isSortEnable={true}
        defaultOrderBy={'name'}
        isFilterbarEnable={true}
      >
        <TableHeaderColumn 
          dataField="name"
          label = 'Name'
          dataType = "string"
          subElement={(name, rowData) => (
            <Button raised color='primary'>{rowData.name}</Button>
          )}>
          </TableHeaderColumn>
        <TableHeaderColumn dataField="calories" dataType="number" label="calories"/>
        <TableHeaderColumn dataField="fat" label="Fat"/>
        <TableHeaderColumn dataField="carbs" label="carbs"/>
      </DataTable>
    );
  }
}

export default App