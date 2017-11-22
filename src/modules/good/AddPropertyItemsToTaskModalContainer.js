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
            selectedProcesses: []
        };
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.save = this.save.bind(this);
        this.addProcessInput = this.addProcessInput.bind(this);
        this.removeProcessInput = this.removeProcessInput.bind(this);
        this.handleSelectProcess = this.handleSelectProcess.bind(this);
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
                .then((selectedProcesses) => {
                    this.setState({
                        selectedProcesses
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
        this.state.selectedProcesses.forEach((process) => {
            if (!process.value) {
                isValid = false;
            }
        });

        if (isValid) {
            this.state.selectedProcesses.forEach((process) => {
                const count = this.state.selectedProcesses.filter((item) => {
                    return item.id === process.id && item.id === process.id;
                }).length;
                if (count > 1) {
                    isValid = false;
                    showErrorMessage("Lỗi", "Bạn không thể thêm 2 quy trình trùng nhau");
                }
            });

            if (isValid) {
                this.props.goodActions.addPropertyItemsToTask(
                    this.state.selectedProcesses,
                    this.state.value, this.props.task,
                    this.state.currentBoard, this.state.targetBoard);
            }

        } else {
            showErrorMessage("Lỗi", "Bạn cần lựa chọn quy trình cho những ô quy trình tuỳ chọn đã thêm");
        }

    }

    addProcessInput() {
        this.setState({
            selectedProcesses: [
                ...this.state.selectedProcesses,
                {}
            ]
        });
    }

    removeProcessInput(index) {
        this.setState({
            selectedProcesses: [...this.state.selectedProcesses.slice(0, index), ...this.state.selectedProcesses.slice(index + 1)]
        });
    }

    handleSelectProcess(index) {
        return function (process) {
            this.setState({
                selectedProcesses: [...this.state.selectedProcesses.slice(0, index), {...process}, ...this.state.selectedProcesses.slice(index + 1)]
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
                                        this.state.selectedProcesses && this.state.selectedProcesses.map((process, index) => {
                                            return (
                                                <OptionalProcessInput
                                                    key={index}
                                                    process={process}
                                                    selectProcess={this.handleSelectProcess(index)}
                                                    remove={() => this.removeProcessInput(index)}
                                                    processes={this.props.processes}/>
                                            );
                                        })
                                    }
                                </ListGroup>

                                <Button
                                    onClick={this.addProcessInput}
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
    processes: PropTypes.array.isRequired,
    boards: PropTypes.array.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {

    return {
        showModal: state.good.attachPropertyItem.showModal,
        task: state.good.attachPropertyItem.task,
        processes: state.good.attachPropertyItem.processes.map((process) => {
            return {
                ...process,
                value: process.id,
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