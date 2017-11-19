import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import * as goodActions from '../good/goodActions';
import Loading from "../../components/common/Loading";
import Select from "react-select";
import OptionalBoardInput from "./OptionalBoardInput";

class AddPropertyItemsToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.state = {
            value: [],
            currentBoard: {},
            targetBoard: {}
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
        this.handleSelectCurrentBoard = this.handleSelectCurrentBoard.bind(this);
        this.handleSelectTargetBoard = this.handleSelectTargetBoard.bind(this);
        this.addBoardInput = this.addBoardInput.bind(this);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
        this.handleSelectProcess = this.handleSelectProcess.bind();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.task.id && nextProps.task.id != this.props.task.id) {
            this.setState({
                value: nextProps.task.good_property_items ? nextProps.task.good_property_items.map((item) => {
                    return {
                        ...item,
                        label: item.name,
                        value: item.id
                    };
                }) : [],
                currentBoard: nextProps.task.current_board,
                targetBoard: nextProps.task.target_board
            });
        }
        if (!this.props.showModal && nextProps.showModal) {
            this.props.goodActions.loadAllGoodPropertyItems(nextProps.type);
        }
    }

    close() {
        this.props.goodActions.closeAddPropertyItemModal();
    }

    handleSelectChange(value) {
        this.setState({value});
    }

    handleSelectCurrentBoard(currentBoard) {
        this.setState({currentBoard});
    }

    handleSelectTargetBoard(targetBoard) {
        this.setState({targetBoard});
    }

    save() {
        this.props.goodActions.addPropertyItemsToTask(this.state.value, this.props.task,
            this.state.currentBoard, this.state.targetBoard);
    }

    handleSelectProcess() {

    }

    handleSelectBoard() {

    }

    addBoardInput() {
        this.props.goodActions.addOptionalBoard();
    }

    render() {
        const {showModal} = this.props;
        const {value, currentBoard, targetBoard} = this.state;
        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Thuộc tính cần nhập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.props.isLoading ? <Loading/> : (
                            <div>
                                <div className="form-group">
                                    <label>Thuộc tính cần nhập</label>
                                    <Select
                                        closeOnSelect={false}
                                        multi={true}
                                        onChange={this.handleSelectChange}
                                        options={this.props.goodPropertyItems}
                                        placeholder="Lựa chọn thuộc tính"
                                        value={value}
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label>Bảng hiện tại mặc định</label>
                                        <p>{currentBoard.title}</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <label>Bảng đích mặc định</label>
                                        <p>{targetBoard.title}</p>
                                    </div>
                                </div>

                                {
                                    this.props.optionalBoards && this.props.optionalBoards.map((board, index) => {
                                        return (
                                            <OptionalBoardInput
                                                key={index}
                                                index={index}
                                                process={board.process}
                                                board={board.board}
                                                handleSelectProcess={this.handleSelectProcess}
                                                handleSelectBoard={this.handleSelectBoard}
                                                processes={this.props.processes}
                                                boards={this.props.boards}/>
                                        );
                                    })
                                }

                                <Button
                                    onClick={this.addBoardInput}
                                    className="btn btn-simple">
                                    + Thêm bảng đích
                                </Button>

                            </div>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.save}
                        disabled={this.props.isSaving}
                        className="btn btn-rose">
                        {
                            this.props.isSaving ? (
                                <span><i className="fa fa-spinner fa-spin" aria-hidden="true"/> Đang lưu</span>
                            ) : <span>Lưu</span>
                        }

                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddPropertyItemsToTaskModalContainer.propTypes = {
    showModal: PropTypes.bool.isRequired,
    type: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    task: PropTypes.object.isRequired,
    goodPropertyItems: PropTypes.array.isRequired,
    optionalBoards: PropTypes.array.isRequired,
    processes: PropTypes.array.isRequired,
    boards: PropTypes.array.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        showModal: state.good.attachPropertyItem.showModal,
        task: state.good.attachPropertyItem.task,
        optionalBoards: state.good.attachPropertyItem.optionalBoards,
        processes: state.good.attachPropertyItem.processes,
        isLoading: state.good.attachPropertyItem.isLoading,
        isSaving: state.good.attachPropertyItem.isSaving,
        boards: state.good.attachPropertyItem.boards,
        goodPropertyItems: state.good.attachPropertyItem.goodPropertyItems
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPropertyItemsToTaskModalContainer);