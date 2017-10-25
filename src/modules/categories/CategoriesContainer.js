import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import AddCategoryModalContainer from './AddCategoryModalContainer';
import ListChildProduct from "./ListChildProduct";
import * as categoriesActions from './categoriesActions';
import Loading from "../../components/common/Loading";


class CategoriesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.openAddCategoryModalContainer = this.openAddCategoryModalContainer.bind(this);
    }

    componentWillMount() {
        this.props.categoriesActions.loadCategories();
    }

    openAddCategoryModalContainer(parent_id, name, isEdit) {
        this.props.categoriesActions.openAddCategoryModalContainer(parent_id, name, isEdit);
    }

    deleteCategory(id) {
        this.props.categoriesActions.deleteCategory(id);
    }


    render() {
        return (
            <div>
                <div className="wrapper">
                    <div className="main-panel">
                        <div className="content">
                            <AddCategoryModalContainer/>
                            <div className="keetool-content">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header card-header-icon" data-background-color="rose"><i
                                            className="material-icons">announcement</i></div>
                                        <div className="card-content">
                                            <h4 className="card-title">Danh sách nhóm</h4>


                                            <div className="panel-group" id="accordion" role="tablist"
                                                 aria-multiselectable="true">

                                                {/*     ADD PARENT GROUP    */}

                                                <div className="panel panel-default" style={{paddingTop: "10px"}}>
                                                    <div className="panel-heading" role="tab" id="headingFour">
                                                        <div className="col-md-2">
                                                            <a onClick={() => {
                                                                this.openAddCategoryModalContainer(0, '', false);
                                                            }} className="btn btn-rose">
                                                                Thêm nhóm cha
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/*     LIST PARENT GROUP   */}
                                                {this.props.isLoading || this.props.isSaving ? <Loading/> :
                                                    this.props.categoriesList.map((category) => {
                                                        if (category.parent_id === 0)
                                                            return (
                                                                <div className="panel panel-default">
                                                                    <div className="panel-heading" role="tab"
                                                                         id="headingOne">

                                                                        <button rel="tooltip" data-placement="top"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                className="btn btn-round btn-sm btn-info"
                                                                                style={{
                                                                                    "width": "20px",
                                                                                    height: "20px",
                                                                                    "padding": "0"
                                                                                }}
                                                                                onClick={(e) => {
                                                                                    this.openAddCategoryModalContainer(0, category.name, true);
                                                                                    e.preventDefault();
                                                                                }}
                                                                        >
                                                                            <i style={{"float": "none!important"}}
                                                                               className="material-icons">mode_edit</i>
                                                                        </button>
                                                                        <button rel="tooltip" data-placement="top"
                                                                                title=""
                                                                                data-original-title="Remove item"
                                                                                className="btn btn-round btn-sm btn-danger"
                                                                                style={{
                                                                                    "width": "20px",
                                                                                    "height": "20px",
                                                                                    "padding": "0"
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.deleteCategory(category.id);
                                                                                }}
                                                                        >
                                                                            <i style={{"float": "none!important"}}
                                                                               className="material-icons">close</i>
                                                                        </button>
                                                                        <a role="button" data-toggle="collapse"
                                                                           data-parent="#accordion"
                                                                           href={"#collapseOne" + category.id}
                                                                           aria-expanded="false"
                                                                           aria-controls={"collapseOne" + category.id}
                                                                           className="collapsed">
                                                                            <h4 className="panel-title">

                                                                                {category.name}
                                                                                <i className="material-icons">keyboard_arrow_down</i>
                                                                            </h4>
                                                                        </a>
                                                                    </div>


                                                                    <div id={"collapseOne" + category.id}
                                                                         className="panel-collapse collaps "
                                                                         role="tabpanel"
                                                                         aria-labelledby="headingOne"
                                                                         aria-expanded="false"
                                                                         style={{"height": "0px"}}>

                                                                        <ListChildProduct
                                                                            parent_id={category.id}
                                                                            openAddCategoryModalContainer={this.openAddCategoryModalContainer}
                                                                            deleteCategory={this.deleteCategory}
                                                                            categoriesList={this.props.categoriesList}
                                                                        />
                                                                    </div>
                                                                </div>

                                                            );
                                                    })


                                                }


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CategoriesContainer.propTypes = {
    categoriesActions: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    categoriesList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoading: state.categories.isLoading,
        categoriesList: state.categories.categoriesList,
        error: state.categories.error,
        isSaving: state.categories.addCategoriesModal.isSaving,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoriesActions: bindActionCreators(categoriesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer);