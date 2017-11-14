import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import keycode from 'keycode';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import SearchIcon from 'material-ui-icons/Search'
import FilterListIcon from 'material-ui-icons/FilterList'
import TextField from 'material-ui/TextField';
class DataTable extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            selected:[],
            order: 'asc',
            orderBy: 'name',
            filterShowFlag:false,
            filterValue:''
        }
    }

    componentWillMount()
    {
        let keys = [];
        let labels = [];
        this.props.children.map(child=>{
            keys.push(child.props.dataField)
            labels.push(child.props.label)
        })
        const data = this.props.data.sort((a, b) => (a[this.props.columnorderBy] < b[this.props.columnorderBy] ? -1 : 1))
        this.setState({
            columnsKey: keys,
            headerLabels: labels,
            page: this.props.page,
            rowsPerPage: this.props.rowsPerPage,
            rowsPerPageOptions: this.props.rowsPerPageOptions,
            data: data,
            orderBy: this.props.columnorderBy,
            rowId: this.props.rowId,
            isSortEnable: this.props.isSortEnable,
            isCheckboxEnable:this.props.isCheckboxEnable,
            isPaginationEnable:this.props.isPaginationEnable,
            isFilterbarEnable:this.props.isFilterbarEnable
        })
        
    }
    handleSelectAllClick(checked){
        if (checked) {
          this.setState({ selected: this.state.data.map(n => n[this.state.rowId]) });
          return;
        }
        this.setState({ selected: [] });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
          this.handleRowClick(event, id);
        }
      };
    
    handleRowClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
    
        this.setState({ selected: newSelected });
    }
    handleChangePage = (event, page) => {
        this.setState({ page });
      };
    
    handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
    };
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleRequestSort = (event, property) => {
        if(property == undefined)
        {
            return;
        }
        const orderBy = property;
        let order = 'asc';

        if (this.state.orderBy === property && this.state.order === 'asc') {
            order = 'desc';
        }

        const data =
            order === 'desc'
            ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({ data, order, orderBy });
        
    };
    handleFilterClick()
    {
        this.setState({filterShowFlag: !this.state.filterShowFlag})
    }

    handleFilterChange = event =>{
        console.log('')
        const filterVal = event.target.value
        const filterData = this.props.data
        const columnsKey = this.state.columnsKey
        const data = []
        for(let i = 0; i < filterData.length; i++)
        {
            for(let j = 0; j < columnsKey.length; j ++)
            {
                if(filterData[i][columnsKey[j]].toLowerCase().indexOf(filterVal.toLowerCase()) != -1)
                {
                    data.push(filterData[i])
                    break;
                }
            }
        }

        this.setState({
            filterValue:filterVal,
            data:data
        })

    }
    render()
    {
        const {data, rowId, selected, columnsKey, page, rowsPerPage, rowsPerPageOptions, headerLabels, filterValue, filterShowFlag, order, orderBy, isSortEnable, isCheckboxEnable, isFilterbarEnable, isPaginationEnable} = this.state
        return(
            <div>
            {isFilterbarEnable&&
                <Paper>
                <Toolbar>
                    <div style={{flex: '0 0 auto'}}>
                        {filterShowFlag?<SearchIcon />
                        :<Typography type="title">Filter</Typography>
                        }
                    </div>
                    {filterShowFlag?
                        <TextField
                            style={{flex: '1 1 100%', marginLeft: 10}}
                            value={filterValue}
                            onChange={event => this.handleFilterChange(event)}
                            
                            />
                        :<div style={{flex: '1 1 100%'}} />}
                    <div>
                        <IconButton
                            color={filterShowFlag?"primary":""}
                            aria-label="Filter list"
                            onClick={this.handleFilterClick.bind(this)}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </div>
                </Toolbar>
                </Paper>
            }
            <Table>
                <TableHead>
                    <TableRow>
                        {isCheckboxEnable&&
                            <TableCell padding="checkbox">
                                <Checkbox
                                indeterminate={selected.length > 0 && selected.length < data.length}
                                checked={selected.length > 0}
                                onClick={this.handleSelectAllClick.bind(this, selected.length === data.length ? false: true)}
                                />
                            </TableCell>
                        }
                        {headerLabels.map(label => {
                            return(
                                <TableCell>
                                    {isSortEnable?<TableSortLabel
                                        active={orderBy === label}
                                        direction={order}
                                        onClick={event => this.handleRequestSort(event, label)}
                                    >
                                        {label}
                                    </TableSortLabel>
                                    :label}
                                    
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(rowData=>{
                        const isSelected = this.isSelected(rowData[rowId]);
                        return (
                            <TableRow
                                hover
                                onClick={event => this.handleRowClick(event, rowData[rowId])}
                                onKeyDown={event => this.handleKeyDown(event, rowData[rowId])}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={rowData[rowId]}
                                selected={isSelected}
                            >
                                {isCheckboxEnable&&
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isSelected} />
                                    </TableCell>
                                }
                                {columnsKey.map(key=>{
                                    return (
                                        <TableCell>{rowData[key]}</TableCell>
                                    )
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
                {isPaginationEnable&&
                    <TableFooter>
                        <TableRow>
                        <TablePagination
                            count={data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            rowsPerPageOptions = {rowsPerPageOptions}
                        />
                        </TableRow>
                    </TableFooter>
                }
            </Table>
            </div>
        )
    }
}


DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    rowId: PropTypes.string,  
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
    columnorderBy:PropTypes.string,
    isSortEnable: PropTypes.bool,
    isPaginationEnable: PropTypes.bool,
    isCheckboxEnable: PropTypes.bool,
    isFilterbarEnable: PropTypes.bool,
}

export default DataTable