import React from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";
import {Button, ListGroupItem} from "react-bootstrap";

class OptionalProcessInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelectProcess = this.handleSelectProcess.bind(this);
    }


    handleSelectProcess(value) {
        this.props.selectProcess(value);
    }

    render() {
        const {process, processes} = this.props;
        return (
            <ListGroupItem>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Quy trình</label>
                            <Select
                                onChange={this.handleSelectProcess}
                                options={processes}
                                placeholder="Lựa chọn quy trình"
                                value={process}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12" style={{display: "flex", flexDirection: "row-reverse"}}>
                        <Button onClick={this.props.remove} className="btn btn-danger">
                            <i className="material-icons">delete</i>
                            Xoá
                        </Button>
                    </div>
                </div>
            </ListGroupItem>
        );
    }
}

OptionalProcessInput.propTypes = {
    process: PropTypes.object,
    remove: PropTypes.func.isRequired,
    selectProcess: PropTypes.func.isRequired,
    processes: PropTypes.array.isRequired
};

export default OptionalProcessInput;