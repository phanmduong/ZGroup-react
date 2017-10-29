import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import AddCategoryModalContainer from './AddCategoryModalContainer';
import ListChildProduct from "./ListChildProduct";
import * as categoriesActions from './categoriesActions';


class CategoriesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openAddCategoryModalContainer = this.openAddCategoryModalContainer.bind(this);
    }

    componentWillMount() {
        this.props.categoriesActions.loadCategories();
    }

    openAddCategoryModalContainer(id, parent_id, name, isEdit) {
        this.props.categoriesActions.openAddCategoryModalContainer(id, parent_id, name, isEdit);
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
                                    <ListChildProduct
                                        parent_id={0}
                                    />

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