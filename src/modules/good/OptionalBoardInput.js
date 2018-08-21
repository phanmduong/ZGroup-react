import React from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";
import {ListGroupItem} from "react-bootstrap";

class OptionalBoardInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
    }


    handleSelectBoard(value) {
        this.props.selectBoard(value);
    }

    render() {
        const {boards} = this.props;
        return (
            <ListGroupItem>
                <div className="row" style={{position: "relative"}}>
                    <button type="button" style={{position: "absolute", top: 0, right: 5}}
                            className="close">
                        <span
                            aria-hidden="true">x</span><span className="sr-only">Close</span>
                    </button>

                    <div className="col-sm-12">
                        <div className="form-group">
                            <label>Bảng đích</label>
                            <Select
                                onChange={this.handleSelectBoard}
                                options={boards}
                                placeholder="Lựa chọn bảng đích"
                            />
                        </div>
                    </div>

                </div>
            </ListGroupItem>
        );
    }
}

OptionalBoardInput.propTypes = {
    selectBoard: PropTypes.func.isRequired,
    boards: PropTypes.array.isRequired
};


export default OptionalBoardInput;