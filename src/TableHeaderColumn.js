import React from 'react';
import PropTypes from 'prop-types';

class TableHeaderColumn extends React.Component{
    constructor(props) {
        super(props)
    }
}

TableHeaderColumn.propTypes = {
    dataField: PropTypes.string.isRequired,
    dataFormat: PropTypes.func,
    label: PropTypes.string.isRequired
}

export default TableHeaderColumn