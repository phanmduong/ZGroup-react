import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions from './categoriesActions';
import PropTypes from 'prop-types';
import Loading from '../../components/common/Loading';

class AddCategoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
        };
        this.close = this.close.bind(this);
    }

    close() {
        this.props.categoriesActions.closeAddCategoryModalContainer();
    }

    addCategory() {
        this.props.categoriesActions.addCategory(this.state.name, this.props.parent_id, this.close);
    }

    editCategory() {
        this.props.categoriesActions.editCategory();
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
                    {this.props.isSaving ? <Loading/> :
                        (
                            <div>
                                {this.props.isEdit ?

                                    <div className="modal-body">

                                        <div className="form-group label-floating is-empty">
                                            <label>Sửa tên nhóm</label>
                                            <input type="text" className="form-control"
                                                   defaultValue={this.props.name}
                                                   onChange={(e) => {
                                                       this.setState({name: e.target.value});
                                                       e.preventDefault();
                                                   }}/>
                                            <span className="material-input"/>
                                            <span className="material-input"/>
                                        </div>
                                    </div>
                                    :
                                    <div className="modal-body">

                                        <div className="form-group label-floating is-empty">
                                            <label className="control-label">Tên nhóm</label>
                                            <input type="text" className="form-control"
                                                   onChange={(e) => {
                                                       this.setState({name: e.target.value});
                                                       e.preventDefault();
                                                   }}/>
                                            <span className="material-input"/>
                                            <span className="material-input"/>
                                        </div>
                                    </div>
                                }
                            </div>
                        )

                    }
                </Modal.Body>
                <Modal.Footer>
                    <form method="#" action="#">
                        {this.props.isSaving ?
                            (
                                <button
                                    className="btn btn-fill btn-rose disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/>
                                    {this.props.isEdit ? ' Đang cập nhật' : ' Đang thêm'}
                                </button>
                            )
                            :
                            (
                                <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item"
                                        type="button" className="btn btn-success " data-dismiss="modal"
                                        onClick={(e) => {
                                            if (this.props.isEdit) {
                                                this.editCategory();
                                                e.preventDefault();
                                            }
                                            else {
                                                this.addCategory();
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
                                type="button" className="btn btn-danger " data-dismiss="modal"
                                onClick={() => this.close()}><i className="material-icons">close</i> Huỷ
                        </button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}

AddCategoryModalContainer.propTypes = {
    categoriesActions: PropTypes.object.isRequired,
    isShowModal: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    parent_id: PropTypes.number.isRequired,
    name: PropTypes.string,
    isEdit: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isShowModal: state.categories.addCategoriesModal.isShowModal,
        isSaving: state.categories.addCategoriesModal.isSaving,
        parent_id: state.categories.addCategoriesModal.parent_id,
        name: state.categories.addCategoriesModal.name,
        isEdit: state.categories.addCategoriesModal.isEdit,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoriesActions: bindActionCreators(categoriesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryModalContainer);