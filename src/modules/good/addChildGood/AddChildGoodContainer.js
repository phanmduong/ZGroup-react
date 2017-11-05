import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import Select from "react-select";
import * as addChildGoodActions from './addChildGoodActions';

class AddChildGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.boardChange = this.boardChange.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.saveChildGood = this.saveChildGood.bind(this);
    }


    close() {
        this.props.addChildGoodActions.showAddChildGoodModal(false);
    }

    boardChange(boardOption) {
        this.props.addChildGoodActions.updateBoardId(boardOption.value);
    }

    inputChange(event) {
        let good = {...this.props.good};
        good[event.target.name] = event.target.value;
        this.props.addChildGoodActions.updateChildGoodForm(good);
    }

    saveChildGood(){

    }

    render() {
        return (

            <Modal show={this.props.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Tạo sản phẩm con</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormInputText
                        name="name"
                        label="Tên"
                        updateFormData={this.inputChange}
                        value={this.props.good.name || ""}
                    />
                    <FormInputText
                        name="code"
                        updateFormData={this.inputChange}
                        label="Mã sản phẩm"
                        value={this.props.good.code || ""}
                    />
                    <div className="form-group">
                        <label>
                            Bảng xuất phát
                        </label>
                        <Select
                            name="board-id"
                            value={this.props.boardId}
                            options={this.props.boards.map((board) => {
                                return {
                                    ...board,
                                    value: board.id,
                                    label: board.title
                                };
                            })}
                            onChange={this.boardChange}
                        />
                    </div>

                    <Button className="btn btn-rose">
                        Lưu
                    </Button>

                    <Button onClick={this.close}>
                        Đóng
                    </Button>

                </Modal.Body>
            </Modal>
        );
    }
}

AddChildGoodContainer.propTypes = {
    boards: PropTypes.array.isRequired,
    good: PropTypes.object.isRequired,
    addChildGoodActions: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    boardId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        boards: state.task.boardList.boards,
        good: state.task.addChildGood.good,
        showModal: state.task.addChildGood.showModal,
        boardId: state.task.addChildGood.boardId
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addChildGoodActions: bindActionCreators(addChildGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddChildGoodContainer);