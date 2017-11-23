import React from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";
import {Button, ListGroupItem} from "react-bootstrap";

class OptionalBoardInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
    }


    handleSelectBoard(value) {
        this.props.selectBoard(value);
    }

    render() {
        const {board, boards} = this.props;
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
                                value={board}
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

OptionalBoardInput.propTypes = {
    board: PropTypes.object,
    remove: PropTypes.func.isRequired,
    selectBoard: PropTypes.func.isRequired,
    boards: PropTypes.array.isRequired
};


export default OptionalBoardInput;