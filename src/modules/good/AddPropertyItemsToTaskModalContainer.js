import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, ListGroup, Modal} from "react-bootstrap";
import * as goodActions from '../good/goodActions';
import Loading from "../../components/common/Loading";
import Select from "react-select";
import {showErrorMessage} from "../../helpers/helper";
import OptionalBoardInput from "./OptionalBoardInput";

class AddPropertyItemsToTaskModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.state = {
            value: [],
            currentBoard: {},
            targetBoard: {},
            selectedBoards: [{}, {}]
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
        this.addBoardInput = this.addBoardInput.bind(this);
        this.removeBoardInput = this.removeBoardInput.bind(this);
        this.handleSelectBoard = this.handleSelectBoard.bind(this);
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
                .then((selectedBoards) => {
                    this.setState({
                        selectedBoards
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
        this.state.selectedBoards.forEach((process) => {
            if (!process.value) {
                isValid = false;
            }
        });

        if (isValid) {
            this.state.selectedBoards.forEach((process) => {
                const count = this.state.selectedBoards.filter((item) => {
                    return item.id === process.id && item.id === process.id;
                }).length;
                if (count > 1) {
                    isValid = false;
                    showErrorMessage("Lỗi", "Bạn không thể thêm 2 quy trình trùng nhau");
                }
            });

            if (isValid) {
                this.props.goodActions.addPropertyItemsToTask(
                    this.state.selectedBoards,
                    this.state.value, this.props.task,
                    this.state.currentBoard, this.state.targetBoard);
            }

        } else {
            showErrorMessage("Lỗi", "Bạn cần lựa chọn quy trình cho những ô quy trình tuỳ chọn đã thêm");
        }

    }

    addBoardInput() {
        this.setState({
            selectedBoards: [
                ...this.state.selectedBoards,
                {}
            ]
        });
    }

    removeBoardInput(index) {
        this.setState({
            selectedBoards: [...this.state.selectedBoards.slice(0, index), ...this.state.selectedBoards.slice(index + 1)]
        });
    }

    handleSelectBoard(index) {
        return function (process) {
            this.setState({
                selectedBoards: [...this.state.selectedBoards.slice(0, index), {...process}, ...this.state.selectedBoards.slice(index + 1)]
            });
        }.bind(this);
    }

    render() {
        const {showModal} = this.props;
        const {value} = this.state;
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
                                <ListGroup>
                                    {
                                        this.state.selectedBoards && this.state.selectedBoards.map((board, index) => {
                                            return (
                                                <OptionalBoardInput
                                                    selectBoard={this.handleSelectBoard(index)}
                                                    key={index}
                                                    board={board}
                                                    remove={() => this.removeBoardInput(index)}
                                                    boards={this.props.boards}/>
                                            );
                                        })
                                    }
                                </ListGroup>

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
    boards: PropTypes.array.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {

    return {
        showModal: state.good.attachPropertyItem.showModal,
        task: state.good.attachPropertyItem.task,
        selectedBoards: state.good.attachPropertyItem.selectedBoards,
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