import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions from './categoriesActions';
import PropTypes from 'prop-types';
import Loading from '../../components/common/Loading';

class AddCategoryModalContainer extends React.Component{
    constructor(props, context){
        super(props, context);
        this.state = {
            isLoading: false,
            error: true,
            categories: [],
            isShowModal : true,
        };
        this.close = this.close.bind(this);
    }
    close(){
        this.props.categoriesActions.closeAddCategoryModalContainer();
    }
    render(){
        return(
            <Modal show = {this.props.isShowModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>
                        <strong>Add Category</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.isSaving ? <Loading/> :
                        (
                            <div>
                                <div className="modal-body">

                                    <div className="form-group label-floating is-empty">
                                        <label className="control-label">Tên nhóm</label>
                                        <input type="text" className="form-control" />
                                            <span className="material-input" />
                                            <span className="material-input" />
                                    </div>
                                </div>
                            </div>
                        )

                    }
                </Modal.Body>
                <Modal.Footer>
                    <form method="#" action="#">
                        <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item" type="button" className="btn btn-success btn-round" data-dismiss="modal"><i className="material-icons">check</i> Xác nhận
                        </button>
                        <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item" type="button" className="btn btn-danger btn-round" data-dismiss="modal" onClick={this.close}><i className="material-icons">close</i> Huỷ
                        </button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}
AddCategoryModalContainer.protoTypes = {
    categoriesActions: PropTypes.object.isRequired,
    isShowModal : PropTypes.bool.isRequired,
    isSaving : PropTypes.bool.isRequired,
};
function mapStateToProps(state) {
    return{
        isShowModal : state.categories.addCategoriesModal.isShowModal,
        isSaving : state.categories.addCategoriesModal.isSaving,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        categoriesActions : bindActionCreators(categoriesActions , dispatch)
    };
}
export default connect (mapStateToProps , mapDispatchToProps )(AddCategoryModalContainer);