import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions from './categoriesActions';
import PropTypes from 'prop-types';


class AddCategoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {name : props.name} ;
        this.close = this.close.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    close() {
        this.props.categoriesActions.closeAddCategoryModalContainer();
    }

    addCategory() {
        this.props.categoriesActions.addCategory(this.state.name, this.props.parent_id, this.close);
    }

    editCategory() {
        this.props.categoriesActions.editCategory(this.props.id, this.state.name, this.close);
    }
    handleName(e){
        this.setState({name: e.target.value});
        e.preventDefault();
    }

    render() {
        return (
            <Modal show={this.props.isShowModal} onHide={this.close}>
                <Modal.Header>
                    {this.props.isEdit ?
                        <Modal.Title>
                            <strong>Edit Category</strong>
                        </Modal.Title>
                        :
                        <Modal.Title>
                            <strong> Nhóm </strong>
                        </Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                            <div>
                                {this.props.isEdit ?
                                    <div className="form-group label-floating is-empty">
                                        <label>Sửa tên nhóm</label>
                                        <input type="text" className="form-control"
                                               defaultValue={this.props.name}
                                               onChange={(e) => this.handleName(e)}/>
                                    </div>
                                    :
                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label">Tên nhóm</label>
                                        <input type="text" className="form-control"
                                               defaultValue= {this.props.name}
                                               onChange={(e) => this.handleName(e)}/>
                                    </div>
                                }
                            </div>
                </Modal.Body>


                <Modal.Footer>
                    <form>
                        {this.props.isSaving ?
                            (
                                <button
                                    className="btn btn-round btn-fill btn-success disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/>
                                    {! this.props.isEdit ? ' Đang thêm' : ' Đang cập nhật' }
                                </button>
                            )
                            :
                            (
                                <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                        type="button" className="btn btn-round btn-success "
                                        onClick={(e) => {
                                            if ( ! this.props.isEdit) {
                                                this.addCategory();
                                                e.preventDefault();
                                            }
                                            else {
                                                this.editCategory();
                                                e.preventDefault();
                                            }

                                        }
                                        }
                                ><i className="material-icons">check</i>
                                    {this.props.isEdit ? 'Cập nhật' : 'Thêm'}
                                </button>
                            )
                        }
                        <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                type="button" className="btn btn-round btn-danger " data-dismiss="modal"
                                onClick={() => this.close()}><i className="material-icons">close</i> Huỷ
                        </button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddCategoryModalContainer.propTypes = {
    categoriesActions: PropTypes.object,
    isShowModal: PropTypes.bool,
    isSaving: PropTypes.bool,
    parent_id: PropTypes.number,
    name: PropTypes.string,
    id: PropTypes.number,
    isEdit: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isShowModal: state.categories.addCategoriesModal.isShowModal,
        isSaving: state.categories.addCategoriesModal.isSaving,
        parent_id: state.categories.addCategoriesModal.parent_id,
        name: state.categories.addCategoriesModal.name,
        isEdit: state.categories.addCategoriesModal.isEdit,
        id: state.categories.addCategoriesModal.id,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoriesActions: bindActionCreators(categoriesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModalContainer);