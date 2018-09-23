import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as labelManageAction from './labelManageAction';
import Loading from "../../components/common/Loading";
import {isEmptyInput, showErrorNotification} from "../../helpers/helper";

class EditCategoryModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.saveCategoryModal = this.saveCategoryModal.bind(this);
    }

    updateFormData(e) {
        const field = e.target.name;
        let category = {
            ...this.props.categoryEditing,
            [field]: e.target.value
        };
        this.props.labelManageAction.handleEditCategoryModal(category);
    }

    saveCategoryModal() {
        const category = this.props.categoryEditing;
        if (isEmptyInput(category.name)) showErrorNotification("Bạn cần nhập Tên loại khóa học");
        else this.props.labelManageAction.saveCategoryModal(category);
    }

    render() {
        let category = this.props.categoryEditing;
        return (
            <Modal show={this.props.editCategoryModal}
                   onHide={() => this.props.labelManageAction.showEditCategoryModal()}>
                <a onClick={() => this.props.labelManageAction.showEditCategoryModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thông tin loại khóa học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="label-control">Tên loại</label>
                                <input type="text"
                                       name="name"
                                       className="form-control"
                                       value={category.name || ''}
                                       onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Mô tả ngắn</label>
                                <textarea type="text"
                                          name="short_description"
                                          placeholder="Mô tả loại khóa học"
                                          className="form-control"
                                          value={category.short_description || ''}
                                          onChange={this.updateFormData}/>
                                <span className="material-input"/>
                            </div>
                            <br/><br/>
                            {
                                this.props.isSavingCategory ? <Loading/> : (
                                    <div>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-success btn-round" data-dismiss="modal"
                                                onClick={() => this.saveCategoryModal()}>
                                            <i className="material-icons">check</i> Xác nhận
                                        </button>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={() => this.props.labelManageAction.showEditCategoryModal()}>
                                            <i className="material-icons">close</i> Huỷ
                                        </button>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

EditCategoryModal.propTypes = {
    labelManageAction: PropTypes.object.isRequired,
    categoryEditing: PropTypes.object.isRequired,
    editCategoryModal: PropTypes.bool,
    isSavingCategory: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        editCategoryModal: state.labelManage.editCategoryModal,
        categoryEditing: state.labelManage.categoryEditing,
        isSavingCategory: state.labelManage.isSavingCategory
    };
}

function mapDispatchToProps(dispatch) {
    return {
        labelManageAction: bindActionCreators(labelManageAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCategoryModal);