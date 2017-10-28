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
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentWillMount() {
        this.props.categoriesActions.loadCategories();
    }

    openAddCategoryModalContainer(id, parent_id, name, isEdit) {
        this.props.categoriesActions.openAddCategoryModalContainer(id, parent_id, name, isEdit);
    }

    deleteCategory(id) {
        this.props.categoriesActions.deleteCategory(id);
    }


    render() {
        return (
            <div>

                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon"
                             data-background-color="rose">
                            <i className="material-icons">announcement</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách nhóm</h4>


                            <div className="panel-group" role="tablist"
                                 aria-multiselectable="true">

                                {/*     ADD PARENT GROUP    */}
                                <table className="col-md-12">
                                    <tbody>
                                    <tr>
                                        <td>
                                            <div className="panel-heading" role="tab" style={{
                                                marginTop: "40px",
                                                marginBottom: '20px',
                                            }}>
                                                <a onClick={() => {
                                                    this.openAddCategoryModalContainer('', 0, '', false);
                                                }}>
                                                    <button rel="tooltip" data-placement="top" title=""
                                                            data-oriinal-title="Remove item"
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                padding: "0px"
                                                            }}
                                                            className="btn btn-round btn-sm btn-success">
                                                        <i style={{"float ": " none!important"}}
                                                           className="material-icons">add</i>
                                                    </button>
                                                    <span
                                                        style={{paddingLeft: "10px"}}><strong>Thêm nhóm cha</strong></span>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                                {/*     LIST PARENT GROUP   */}
                                {this.props.isLoading || this.props.isSaving ? <Loading/> :
                                    this.props.categoriesList.map((category) => {
                                        if (category.parent_id === 0)
                                            return (
                                                <div key={category.id} className="panel panel-default" >
                                                    <div className="panel-heading" role="tab" >
                                                        <table className="col-md-15" width="100%">
                                                            <tbody >
                                                            <a role="button" data-toggle="collapse"
                                                               href={"#collapseOne" + category.id}
                                                               aria-controls={"collapseOne" + category.id}
                                                               className="collapsed"
                                                            style={{ position : 'relative' , display : 'block'}}
                                                            >
                                                                <tr className="panel-title" >

                                                                    <td className="col-md-3">
                                                                        <button rel="tooltip"
                                                                                data-placement="top"
                                                                                style={{
                                                                                    width: "20px",
                                                                                    height: "20px",
                                                                                    padding: "0px"
                                                                                }}
                                                                                className="btn btn-round btn-sm btn-info"
                                                                                onClick={(e) => {
                                                                                    this.openAddCategoryModalContainer(category.id, category.parent_id, category.name, true);
                                                                                    e.preventDefault();
                                                                                }}
                                                                        >
                                                                            <i style={{"float": "none!important"}}
                                                                               className="material-icons">mode_edit</i>
                                                                        </button>
                                                                        <button rel="tooltip"
                                                                                data-placement="top"
                                                                                style={{
                                                                                    width: "20px",
                                                                                    height: "20px",
                                                                                    padding: "0px"
                                                                                }}
                                                                                className="btn btn-round btn-sm btn-danger"
                                                                                onClick={() => {
                                                                                    this.deleteCategory(category.id);
                                                                                }}
                                                                        >
                                                                            <i style={{"float": "none!important"}}
                                                                               className="material-icons">close</i>
                                                                        </button>
                                                                    </td>

                                                                    {category.name}
                                                                    <i className="material-icons"
                                                                       style={{position : 'absolute' , right  : '0'}}>keyboard_arrow_down</i>
                                                                </tr>
                                                            </a>

                                                            </tbody>
                                                        </table>


                                                    </div>


                                                    <div id={"collapseOne" + category.id}
                                                         className="panel-collapse collapse "
                                                         aria-multiselectable="true"
                                                         role="tabpanel"
                                                         aria-labelledby={"headingOne " + category.id}
                                                         aria-expanded="true"
                                                    >

                                                        <ListChildProduct
                                                            parent_id={category.id}
                                                            openAddCategoryModalContainer={this.openAddCategoryModalContainer}
                                                            deleteCategory={this.deleteCategory}
                                                            categoriesList={this.props.categoriesList}
                                                            isLoading={this.props.isLoading}
                                                        />
                                                    </div>
                                                </div>

                                            );
                                    })


                                }
                                <AddCategoryModalContainer/>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

CategoriesContainer.propTypes = {
    categoriesActions: PropTypes.object,
    categories: PropTypes.object,
    categoriesList: PropTypes.array,
    isLoading: PropTypes.bool,
    error: PropTypes.bool,
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