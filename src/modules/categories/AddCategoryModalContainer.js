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
            name : '',
            parent_id : this.props.parent_id,
        };
        this.close = this.close.bind(this);
    }
    close(){
        this.props.categoriesActions.closeAddCategoryModalContainer();
    }
    addCategory(){
        this.props.categoriesActions.addCategory(this.state.name , this.props.parent_id , this.close);
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
                                        <input type="text" className="form-control"
                                               onChange={(e) => {this.setState({name : e.target.value});
                                               e.preventDefault();
                                        }} />
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
                        {this.props.isSaving ?
                            (
                                <button
                                    className="btn btn-fill btn-rose disabled"
                                >
                                    <i className="fa fa-spinner fa-spin"/>
                                    Đang cập nhật
                                    {/*{this.props.edit ? ' Đang cập nhật' : ' Đang thêm'}*/}
                                </button>
                            )
                            :
                            (
                                <button
                                    className="btn btn-fill btn-rose"
                                    onClick={(e) => {this.addCategory() ; e.preventDefault();}}
                                    // this.props.edit ? this.editClass : this.createClass
                                >
                                    Cập nhật
                                    {/*{this.props.edit ? 'Cập nhật' : 'Thêm'}*/}
                                </button>
                            )
                        }
                        <button rel="tooltip" data-placement="top" title="" data-original-title="Remove item" type="button" className="btn btn-danger btn-round" data-dismiss="modal" onClick={() => this.close()}><i className="material-icons">close</i> Huỷ
                        </button>
                    </form>
                </Modal.Footer>
            </Modal>
        );
    }
}
AddCategoryModalContainer.propTypes = {
    categoriesActions: PropTypes.object.isRequired,
    isShowModal : PropTypes.bool.isRequired,
    isSaving : PropTypes.bool.isRequired,
    parent_id : PropTypes.number.isRequired,
};
function mapStateToProps(state) {
    return{
        isShowModal : state.categories.addCategoriesModal.isShowModal,
        isSaving : state.categories.addCategoriesModal.isSaving,
        parent_id : state.categories.addCategoriesModal.parent_id,
    };
}
function mapDispatchToProps(dispatch) {
    return{
        categoriesActions : bindActionCreators(categoriesActions , dispatch)
    };
}
export default connect (mapStateToProps , mapDispatchToProps )(AddCategoryModalContainer);