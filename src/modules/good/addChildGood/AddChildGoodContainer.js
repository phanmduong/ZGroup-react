import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import Select from "react-select";
import * as addChildGoodActions from "./addChildGoodActions";
import Loading from "../../../components/common/Loading";
import { isEmptyInput, showNotification } from "../../../helpers/helper";

class AddChildGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.taskChange = this.taskChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.saveChildGood = this.saveChildGood.bind(this);
    }

    state = {
        barcodeType: "new"
    };

    close() {
        this.props.addChildGoodActions.showAddChildGoodModal(false);
    }

    taskChange(taskOption) {
        let value = 0;
        if (taskOption) {
            value = taskOption.value;
        }
        this.props.addChildGoodActions.updateTaskId(value);
    }

    inputChange(event) {
        let good = { ...this.props.good };
        good[event.target.name] = event.target.value;
        this.props.addChildGoodActions.updateChildGoodForm(good);
    }

    saveChildGood() {
        const { good, taskId } = this.props;
        const { barcodeType } = this.state;
        if (
            isEmptyInput(good.name) ||
            isEmptyInput(good.code) ||
            isEmptyInput(taskId) ||
            taskId === 0
        ) {
            showNotification(
                "Bạn vui lòng nhập đủ tất cả các mục",
                "top",
                "right",
                "warning"
            );
        } else {
            this.props.addChildGoodActions.saveChildGood({
                ...good,
                taskId: taskId,
                barcodeType
            });
        }
    }

    render() {
        //console.log(this.props);
        let tasks = [];
        //if(this.props.tasks) tasks = this.props.tasks;
        if(this.props.taskLists && this.props.taskLists[0])
        tasks = this.props.taskLists[0].tasks;
        return (
            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo sản phẩm con</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        name="name"
                        label="Tên"
                        disabled={true}
                        updateFormData={this.inputChange}
                        value={this.props.good.name || ""}
                    />
                    <FormInputText
                        name="code"
                        disabled={true}
                        updateFormData={this.inputChange}
                        label="Mã sản phẩm"
                        value={this.props.good.code || ""}
                    />

                    <FormInputText
                        name="version"
                        label="Phiên bản"
                        updateFormData={this.inputChange}
                        value={this.props.good.version || ""}
                    />

                    <div className="form-group">
                        <label>Barcode</label>
                        <Select
                            name="barcode"
                            value={this.state.barcodeType}
                            options={[
                                {
                                    label: "Lấy từ sản phẩm mẹ",
                                    value: "parent"
                                },
                                {
                                    label: "Lấy barcode mới",
                                    value: "new"
                                }
                            ]}
                            onChange={({ value }) =>
                                this.setState({ barcodeType: value })
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Bảng xuất phát</label>
                        <Select
                            name="board-id"
                            value={this.props.taskId}
                            options={
                                tasks
                                    ? tasks.map(task => {
                                          return {
                                              ...task,
                                              value: task.id,
                                              label: task.title
                                          };
                                      })
                                    : []
                            }
                            onChange={this.taskChange}
                        />
                    </div>
                    {this.props.isSaving ? (
                        <Loading />
                    ) : (
                        <div>
                            <Button
                                disabled={
                                    !this.props.good.version ||
                                    !this.props.taskId
                                }
                                onClick={this.saveChildGood}
                                className="btn btn-rose"
                            >
                                Lưu
                            </Button>

                            <Button onClick={this.close}>Đóng</Button>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}

AddChildGoodContainer.propTypes = {
    tasks: PropTypes.array,
    taskLists: PropTypes.array,
    good: PropTypes.object.isRequired,
    addChildGoodActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    taskId: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    isSaving: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        good: state.task.addChildGood.good,
        tasks: state.task.cardDetail.card.tasks,
        taskLists: state.task.cardDetail.card.taskLists,
        showModal: state.task.addChildGood.showModal,
        taskId: state.task.addChildGood.taskId,
        isSaving: state.task.addChildGood.isSaving
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addChildGoodActions: bindActionCreators(addChildGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(
    AddChildGoodContainer
);
