import React from 'react';
import {observer} from 'mobx-react';
import ReactTable from "react-table-v6";

@observer
class Table extends React.Component {
    constructor(props, context) {
        super(props, context);

    }


    render() {
        const {columns, data} = this.props;
        return (
            <ReactTable
                data={data}
                columns={columns}/>

        );
    }
}


export default Table;