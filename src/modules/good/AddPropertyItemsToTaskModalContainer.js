import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ListGroup, Modal} from "react-bootstrap";
import * as goodActions from '../good/goodActions';
import Loading from "../../components/common/Loading";
import Select from "react-select";
import OptionalProcessInput from "./OptionalProcessInput";
import {showErrorMessage} from "../../helpers/helper";

class AddPropertyItemsToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.state = {
            value: [],
            currentBoard: {},
            targetBoard: {},
            optionalBoards: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
        this.addBoardInput = this.addBoardInput.bind(this);
        this.removeBoardInput = this.removeBoardInput.bind(this);
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
        if (!this.props.showModal && nextProps.showModal && nextProps.task) {
            this.props.goodActions.loadAllGoodPropertyItems(nextProps.type, nextProps.task.id)
                .then((optionalBoards) => {
                    this.setState({
                        optionalBoards
                    });
                });
        }
    }

    close() {
        this.props.goodActions.closeAddPropertyItemModal();
    }

    handleSelectChange(value) {
        this.setState({value});
    }

    save() {
        let isValid = true;
        this.state.optionalBoards.forEach((optionalBoard) => {
            if (!optionalBoard.board || !optionalBoard.process) {
                isValid = false;
            }
        });

        if (isValid) {
            this.state.optionalBoards.forEach((optionalBoard) => {
                const count = this.state.optionalBoards.filter((item) => {
                    return item.board.id === optionalBoard.board.id && item.process.id === optionalBoard.process.id;
                }).length;
                if (count > 1) {
                    isValid = false;
                    showErrorMessage("Lỗi", "Bạn không thể thêm 2 bảng đích và quy trình trùng nhau");
                }

            });

            if (isValid) {
                this.props.goodActions.addPropertyItemsToTask(
                    this.state.optionalBoards,
                    this.state.value, this.props.task,
                    this.state.currentBoard, this.state.targetBoard);
            }

        } else {
            showErrorMessage("Lỗi", "Bạn cần thêm đủ bảng và quy trình vào những bảng đích đã thêm");
        }

    }

    addBoardInput() {
        this.setState({
            optionalBoards: [
                ...this.state.optionalBoards,
                {}
            ]
        });
    }

    removeBoardInput(index) {
        this.setState({
            optionalBoards: [...this.state.optionalBoards.slice(0, index), ...this.state.optionalBoards.slice(index + 1)]
        });
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
                                <ListGroup>
                                    {
                                        this.state.optionalBoards && this.state.optionalBoards.map((optionalBoard, index) => {
                                            return (
                                                <OptionalProcessInput
                                                    key={index}
                                                    remove={() => this.removeBoardInput(index)}
                                                    optionalBoard={optionalBoard}
                                                    processes={this.props.processes}
                                                    boards={this.props.boards}/>
                                            );
                                        })
                                    }
                                </ListGroup>

                                <Button
                                    onClick={this.addBoardInput}
                                    className="btn btn-simple">
                                    + Thêm quy trình tuỳ chọn
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
        processes: state.good.attachPropertyItem.processes.map((process) => {
            return {
                ...process,
                value: process.title,
                label: process.title
            };
        }),
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