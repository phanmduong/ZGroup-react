import React from 'react';
import FormInputText from '../../../components/common/FormInputText';
import { Modal } from "react-bootstrap";
import store from '../editor/BlogEditorStore';
import { createCategory } from '../apis/blogApi';
import { observer } from 'mobx-react';
import { showErrorMessage } from '../../../helpers/helper';

@observer
class AddCategoryModal extends React.Component {

    state = {
        category: {},
        isCreatingCategory: false
    }

    closeAddCategoryModal = () => {
        store.toggleAddCategoryModal(false);
    }

    updateFormCategory = (event) => {
        const field = event.target.name;
        let data = { ...this.state.category };
        data[field] = event.target.value;
        this.setState({
            category: data
        });
    }

    createCategory = async (e) => {
        e.preventDefault();
        const {category} = this.state;
        this.setState({
            isCreatingCategory: true
        });
        if ($("#form-category").valid()) {            
            const res = await createCategory(category);
            if (res.data.status) {
                store.toggleAddCategoryModal(false);
                store.categories = [
                    res.data.data.category,
                    ...store.categories                    
                ];
            } else {
                showErrorMessage("Có lỗi xảy ra");                
            }    
        }
        this.setState({
            isCreatingCategory: false,
            category: {}
        });
    }

    render() {
        return (
            <Modal
                show={store.showAddCategoryModal}
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
                            value={this.state.category.name}
                        />
                        <div className="modal-footer">
                            {this.state.isCreatingCategory ?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin " /> Thêm
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
                            <button type="button" className="btn"
                                onClick={() => {
                                    this.closeAddCategoryModal();
                                }}
                            >Huỷ
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddCategoryModal;
