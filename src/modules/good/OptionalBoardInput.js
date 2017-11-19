import React from 'react';
import PropTypes from 'prop-types';
import Select from "react-select";

class OptionalBoardInput extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {board, processes, process, boards} = this.props;
        return (
            <div className="row">
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Bảng đích</label>
                        <Select
                            onChange={this.props.handleSelectBoard}
                            options={boards}
                            placeholder="Lựa chọn bảng đích"
                            value={board}
                        />
                    </div>
                </div>
                <div className="col-sm-6">
                    <div className="form-group">
                        <label>Quy trình</label>
                        <Select
                            onChange={this.props.handleSelectProcess}
                            options={processes}
                            placeholder="Lựa chọn quy trình"
                            value={process}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

OptionalBoardInput.propTypes = {
    process: PropTypes.object,
    board: PropTypes.object,
    index: PropTypes.number,
    handleSelectProcess: PropTypes.func.isRequired,
    handleSelectBoard: PropTypes.func.isRequired,
    processes: PropTypes.array.isRequired,
    boards: PropTypes.array.isRequired
};

export default OptionalBoardInput;