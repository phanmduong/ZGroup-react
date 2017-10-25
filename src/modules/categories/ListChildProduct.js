import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import AddCategoryModalContainer from './AddCategoryModalContainer';
import * as categoriesActions from './categoriesActions';
import Loading from "../../components/common/Loading";


class ListChildProduct extends React.Component {
    constructor(props){
        super(props);
        this.openAddCategoryModalContainer = this.openAddCategoryModalContainer.bind(this);
    }

    openAddCategoryModalContainer(parent_id){
        this.props.categoriesActions.openAddCategoryModalContainer(parent_id);
    }
    render(){
        return(
            <div>

                    <div className="panel-body">
                {/*     LIST CHILD GROUP    */}
                        {this.props.isSaving ? <Loading/> :
                            this.props.categoriesList.map((category) => {
                                if (category.parent_id === this.props.parent_id){
                                    return (
                                        <div className="panel-title">
                                            <p style={{"marginLeft": "20px"}}>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Remove item"
                                                        className="btn btn-round btn-sm btn-info"
                                                        style={{"width": "20px", height: "20px", padding: "0px"}}>
                                                    <i style={{"float": "none!important"}} className="material-icons"/>mode_edit
                                                </button>
                                                <button rel="tooltip" data-placement="top" title=""
                                                        data-original-title="Không xoá được"
                                                        className="btn btn-round btn-sm btn-default"
                                                        style={{"width": "20px", height: "20px", padding: "0px"}}>
                                                    <i style={{"float": "none!important"}} className="material-icons"/>close
                                                </button>
                                                <a style={{"cursor": "pointer"}}>{category.name}</a>
                                            </p>

                                        </div>

                                    );
                                }
                            })}


                {/*     ADD CHILD GROUP     */}
                    <AddCategoryModalContainer
                    />
                    <div className="panel panel-default">

                        <div className="panel-heading" role="tab" id="headingFour">
                            <a onClick={() => {this.openAddCategoryModalContainer(this.props.parent_id);}}>
                                <h4 className="panel-title">
                                    <button type="button" className="btn btn-rose btn-sm" data-toggle="modal"
                                            data-target="#addCategoryModal" >
                                        <i className="material-icons">control_point</i>
                                    </button>
                                    <p>Thêm nhóm con</p>
                                </h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

                );
    }
}

ListChildProduct.propTypes={
    categoriesActions: PropTypes.object.isRequired,
    categoriesList:PropTypes.array.isRequired,
    parent_id : PropTypes.number.isRequired,
    isSaving : PropTypes.bool.isRequired,

};

function mapStateToProps(state) {
    return {
        categoriesList : state.categories.categoriesList,
        isSaving : state.categories.addCategoriesModal.isSaving
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoriesActions: bindActionCreators(categoriesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChildProduct);