import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as blogTypeAction from "./blogTypeAction";
import * as helper from "../../helpers/helper";
import Loading from "../../components/common/Loading";

class AddEditBlogTypeModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.upBlogType = this.upBlogType.bind(this);
        this.saveBlogTypeModal = this.saveBlogTypeModal.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isSaving !== this.props.isSaving && !nextProps.isSaving) {
            this.props.blogTypeAction.loadAllBlogType(1);
        }
    }
    upBlogType(e) {
        const field = e.target.name;
        let blogType = {
            ...this.props.blogTypeModal,
            [field]: e.target.value
        };
        this.props.blogTypeAction.handleBlogTypeModal(blogType);
    }
    saveBlogTypeModal(){
        const blogType = {...this.props.blogTypeModal};
        if (helper.isEmptyInput(blogType.name)) helper.showErrorNotification("Bạn cần nhập Tên loại bài viết");

         else {
             if(!blogType.id) {
                 this.props.blogTypeAction.saveBlogType(blogType);
             }
            else this.props.blogTypeAction.editBlogType(blogType);
        }
    }
    render() {
        return (
            <Modal
                show={this.props.addEditBlogTypeModal}
                onHide={() => this.props.blogTypeAction.showBlogTypeModal()}>
                <a
                    onClick={() => this.props.blogTypeAction.showBlogTypeModal()}
                    id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Quản lý loại bài viết</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="label-control">Tên loại bài viết</label>
                                <textarea
                                       name="name"
                                       className="form-control"
                                       value={this.props.blogTypeModal.name}
                                       onChange={this.upBlogType}
                                />
                                <span className="material-input"/>
                            </div>

                            <br/><br/>
                            {
                                this.props.isUpdatingEditModal ? (
                                    <Loading/>
                                ) : (
                                    <div>
                                        <button type="button"
                                                className="btn btn-success btn-round" data-dismiss="modal"
                                                onClick={this.saveBlogTypeModal}
                                        >
                                            <i className="material-icons">check</i> Xác nhận
                                        </button>
                                        <button type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={() => this.props.blogTypeAction.showBlogTypeModal()}
                                        >
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

AddEditBlogTypeModal.propTypes = {
    addEditBlogTypeModal: PropTypes.bool.isRequired,
    blogTypeAction: PropTypes.object.isRequired,
    blogTypeModal: PropTypes.object.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isUpdatingEditModal: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        addEditBlogTypeModal: state.blogType.addEditBlogTypeModal,
        blogTypeModal: state.blogType.blogTypeModal,
        isSaving: state.blogType.isSaving,
        isUpdatingEditModal: state.blogType.isUpdatingEditModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogTypeAction: bindActionCreators(blogTypeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditBlogTypeModal);