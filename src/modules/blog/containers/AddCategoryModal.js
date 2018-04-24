import React                from 'react';
import PropTypes            from 'prop-types';

import {connect}            from "react-redux";
import * as blogActions     from "../actions/blogActions";
import {bindActionCreators} from "redux";

import FormInputText        from '../../../components/common/FormInputText';
import {Modal}              from "react-bootstrap";

class AddCategoryModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeAddCategoryModal  = this.closeAddCategoryModal.bind(this);
        this.updateFormCategory     = this.updateFormCategory.bind(this);
        this.createCategory         = this.createCategory.bind(this);
    }
    closeAddCategoryModal() {
        this.props.blogActions.closeAddCategoryModal();
    }
    updateFormCategory(event) {
        const field = event.target.name;
        let data = {...this.props.category};
        data[field] = event.target.value;
        this.props.blogActions.updateFormCategory(data);
    }
    createCategory(e) {
        if ($("#form-category").valid()) {
            this.props.blogActions.createCategory(this.props.category,this.closeAddCategoryModal);
        }
        e.preventDefault();
    }


    render() {
        return (
            <Modal
                show={this.props.isOpenCategoryModal}
                bsSize="sm"
                bsStyle="primary"
                onHide={this.closeAddCategoryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">Thêm nhóm bài viết</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-category">
                        <FormInputText
                            label="Tên nhóm bài viết"
                            required
                            name="name"
                            updateFormData={this.updateFormCategory}
                            value={this.props.category.name}
                        />
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger btn-simple"
                                    onClick={() => {
                                        this.closeAddCategoryModal();
                                    }}
                            >Huỷ
                            </button>
                            {this.props.isCreatingCategory ?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin "/>Đang thêm
                                    </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-rose"
                                            onClick={(e) => {
                                                this.createCategory(e);
                                            }}>Thêm
                                    </button>
                                )
                            }
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

AddCategoryModal.propTypes = {
    category:           PropTypes.object.isRequired,
    isCreatingCategory: PropTypes.bool.isRequired,
    blogActions:        PropTypes.object.isRequired,
    isOpenCategoryModal:PropTypes.bool.isRequired,

};
function mapStateToProps(state) {
    return {
        isOpenCategoryModal:state.blog.isOpenCategoryModal,
        category:           state.blog.category,
        isCreatingCategory: state.blog.isCreatingCategory,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModal);
