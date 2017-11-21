import React from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";
import {Button, ListGroupItem} from "react-bootstrap";

class OptionalBoardInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
        this.handleSelectProcess = this.handleSelectProcess.bind(this);
    }

    handleSelectBoard(value) {
        this.props.optionalBoard.board = value;
        this.forceUpdate();
    }

    handleSelectProcess(value) {
        this.props.optionalBoard.process = value;
        this.forceUpdate();
    }

    render() {
        const {optionalBoard, processes, boards} = this.props;
        return (
            <ListGroupItem>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Bảng đích</label>
                            <Select
                                onChange={this.handleSelectBoard}
                                options={boards}
                                placeholder="Lựa chọn bảng đích"
                                value={optionalBoard.board}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Quy trình</label>
                            <Select
                                onChange={this.handleSelectProcess}
                                options={processes}
                                placeholder="Lựa chọn quy trình"
                                value={optionalBoard.process}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12">
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

OptionalBoardInput.propTypes = {
    optionalBoard: PropTypes.object,
    remove: PropTypes.func.isRequired,
    processes: PropTypes.array.isRequired,
    boards: PropTypes.array.isRequired
};

export default OptionalBoardInput;