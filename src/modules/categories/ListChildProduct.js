import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as categoriesActions from './categoriesActions';
import * as helper from '../../helpers/helper';
import ListChildProductSecond from './ListChildProductSecond';


class ListChildProduct extends React.Component {
    constructor(props) {
        super(props);
        this.openAddCategoryModalContainer = this.openAddCategoryModalContainer.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    openAddCategoryModalContainer(id, parent_id, name, isEdit) {
        this.props.categoriesActions.openAddCategoryModalContainer(id, parent_id, name, isEdit);
    }

    deleteCategory(id, name) {
        helper.confirm("error", "Xoá", "Bạn có chắc chắn muốn xóa " + name,
            function () {
                this.props.categoriesActions.deleteCategory(id);
            }.bind(this));
    }

    render() {
        let count = this.props.categoriesList.reduce((tmp, category) => {
            if (category.id === this.props.parent_id) return tmp += 1;
        }, 0);
        return (
            <div style={{paddingLeft: "20px"}}>


                {/*     LIST CHILD GROUP    */}
                {this.props.isLoading ?
                    <Loading/>
                    :
                    count !== 0 ?
                        this.props.categoriesList.map((category) => {
                                if (category.parent_id === this.props.parent_id)
                                    return (
                                        <div key={category.id} className="panel panel-default">
                                            <div className="panel-heading" role="tab">
                                                <div style={{position: 'relative', display: 'block', height: "20px"}}>
                                                    <div style={{position: 'absolute', left: 10, top: '-22px'}}>
                                                        <button rel="tooltip" data-placement="top" title=""
                                                                data-oriinal-title="Remove item"
                                                                style={{
                                                                    height: "21px",
                                                                    width: "21px",
                                                                    padding: "0px",
                                                                }}
                                                                className="btn btn-round btn-info"
                                                                onClick={(e) => {
                                                                    this.openAddCategoryModalContainer(category.id, category.parent_id, category.name, true);
                                                                    e.preventDefault();
                                                                }}
                                                        >
                                                            <i style={{
                                                                "float": "none!important", height: "14px",
                                                                fontSize: "15px",
                                                                width: "21px"
                                                            }}
                                                               className="material-icons">mode_edit</i>
                                                        </button>
                                                        <button rel="tooltip" data-placement="top" title=""
                                                                data-oriinal-title="Remove item"
                                                                style={{
                                                                    height: "21px",
                                                                    width: "21px",
                                                                    padding: "0px",
                                                                }}
                                                                className="btn btn-round btn-danger"
                                                                onClick={() => {
                                                                    this.deleteCategory(category.id, category.name);
                                                                }}
                                                        >
                                                            <i style={{
                                                                "float": "none!important",
                                                                fontSize: "16px",
                                                                width: "21px",
                                                                height: "14px"
                                                            }}
                                                               className="material-icons">close</i>
                                                        </button>
                                                    </div>
                                                    <a role="button" data-toggle="collapse"
                                                       href={"#collapseOne" + category.id}
                                                       aria-controls={"collapseOne" + category.id}
                                                       className="collapsed"
                                                       style={{paddingTop: "10px"}}
                                                    >
                                                        <div style={{position: 'absolute', left: 70, top: '-13px'}}>

                                                            {category.name}
                                                        </div>
                                                        <i className="material-icons"
                                                           style={{position: 'absolute', right: 0, top: '-13px'}}>keyboard_arrow_down</i>
                                                    </a>
                                                </div>

                                            </div>


                                            <div id={"collapseOne" + category.id}
                                                 className="panel-collapse collapse "
                                                 aria-multiselectable="true"
                                                 role="tabpanel"
                                                 aria-labelledby={"headingOne " + category.id}
                                                 aria-expanded="true"
                                            >

                                                <ListChildProductSecond
                                                    parent_id={category.id}
                                                    categoriesList={this.props.categoriesList}
                                                    isLoading={this.props.isLoading}
                                                    name={category.name}
                                                />
                                            </div>
                                        </div>

                                    );
                            }
                        )
                        : null

                }

                {/*     ADD CHILD GROUP     */}
                {this.props.name ?
                    <div style={{paddingTop: "15px"}}>
                        <a onClick={() => {
                            this.openAddCategoryModalContainer('', this.props.parent_id, '', false);
                        }}>
                            <button rel="tooltip" data-placement="top" title=""
                                    data-oriinal-title="Remove item"
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        padding: "0px"
                                    }}
                                    className="btn btn-round btn-success">
                                <i style={{"float ": " none!important"}} className="material-icons">add</i>
                            </button>
                            <span
                                style={{paddingLeft: "10px"}}><strong>Thêm nhóm con của {this.props.name} </strong></span>
                        </a>
                    </div>
                    : null

                }
            </div>

        );
    }
}

ListChildProduct.propTypes = {
    categoriesActions: PropTypes.object,
    categoriesList: PropTypes.array,
    parent_id: PropTypes.number,
    isLoading: PropTypes.bool,
    isSaving: PropTypes.bool,
    count: PropTypes.number,
    name: PropTypes.string,
};

function mapStateToProps(state) {
    return {
        isLoading: state.categories.isLoading,
        categoriesList: state.categories.categoriesList,
        error: state.categories.error,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoriesActions: bindActionCreators(categoriesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListChildProduct);