import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';

class AddCategoryModal extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <form id="form-category">
                <FormInputText
                    label="Tên nhóm bài viết"
                    required
                    name="name"
                    updateFormData={this.props.updateFormCategory}
                    value={this.props.category.name}
                />
                <div className="modal-footer">
                    <button type="button" className="btn btn-danger btn-simple"
                            onClick={() => {
                                this.props.closeAddCategoryModal();
                            }}
                    >Huỷ
                    </button>
                    {this.props.category.isCreating ?
                        (
                            <button type="button" className="btn btn-rose disabled">
                                <i className="fa fa-spinner fa-spin "/>Đang thêm
                            </button>
                        )
                        :
                        (
                            <button type="button" className="btn btn-rose"
                                    onClick={(e) => {
                                        this.props.createCategory();
                                        e.preventDefault();
                                        this.props.closeAddCategoryModal();
                                    }}>Thêm
                            </button>
                        )
                    }
                </div>
            </form>
        );
    }
}

AddCategoryModal.propTypes = {
    category: PropTypes.object.isRequired,
    updateFormCategory: PropTypes.func.isRequired,
    createCategory: PropTypes.func.isRequired,
    closeAddCategoryModal: PropTypes.func.isRequired,
};


export default AddCategoryModal;