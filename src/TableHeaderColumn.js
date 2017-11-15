import React from 'react';
import PropTypes from 'prop-types';

class TableHeaderColumn extends React.Component{
    constructor(props) {
        super(props)
    }
}

TableHeaderColumn.propTypes = {
    dataField: PropTypes.string,
    dataFormat: PropTypes.object,
    dataType: PropTypes.string,
    label: PropTypes.string.isRequired
}
TableHeaderColumn.defaultProps ={
    dataType: 'string',
    dataFormat: undefined,
    dataField: '',
    label: ''
}


export default TableHeaderColumn