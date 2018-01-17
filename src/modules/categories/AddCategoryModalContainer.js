import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions from './categoriesActions';
import PropTypes from 'prop-types';



class AddCategoryModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.close = this.close.bind(this);
        this.activeModal = this.activeModal.bind(this);
        this.handleName = this.handleName.bind(this);
    }


    close() {
        this.props.categoriesActions.closeAddCategoryModalContainer();
    }



    activeModal(e){
        this.props.isEdit ?
            this.props.categoriesActions.editCategory(this.props.id, this.props.name, this.close) :
            this.props.categoriesActions.addCategory(this.props.name, this.props.parent_id, this.close);
        e.preventDefault();
    }
    handleName(e){
        let name = e.target.value ;
        e.preventDefault();
        this.props.categoriesActions.handleName(name);
    }

    render() {
        return (
            <Modal show={this.props.isShowModal} onHide={this.close}>
                <Modal.Header closeButton>
                    {
                        <Modal.Title>
                            <strong>{this.props.isEdit ? 'Chỉnh sửa' : 'Thêm'}</strong>
                        </Modal.Title>
                    }
                </Modal.Header>
                <Modal.Body>
                            <div>
                                    <div className="form-group label-floating is-empty">
                                        {this.props.isEdit ? <label>Sửa tên nhóm</label> : <label className="control-label">Tên nhóm</label> }

                                            <input type="text" className="form-control"
                                               defaultValue ={this.props.name}
                                               onChange={(e) => this.handleName(e)}/>
                                    </div>
                            </div>
                </Modal.Body>


                <Modal.Footer>
                    <form onSubmit={(e) => {this.activeModal(e);}}>

                        <div className="row">
                            <div className="col-md-7"/>
                            <div className="col-md-5">
                                {this.props.isSaving ?
                                    (
                                        <button
                                            className="btn btn-sm btn-success disabled"
                                        >
                                            <i className="fa fa-spinner fa-spin"/>
                                            {!this.props.isEdit ? ' Đang thêm' : ' Đang cập nhật'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-success btn-sm"
                                                onClick={(e) => {
                                                    this.activeModal(e);
                                                }}>
                                            <i className="material-icons">save</i>
                                            {this.props.isEdit ? 'Cập nhật' : 'Thêm'}
                                        </button>
                                    )
                                }

                                <button className="btn btn-sm btn-danger"
                                        onClick={(e) => {this.close(); e.preventDefault();}}
                                >
                                    <i className="material-icons">cancel</i> Huỷ
                                </button>
                            </div>
                        </div>





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