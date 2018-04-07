import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import *as labelManageAction from "./labelManageAction";
import LabelManageComponent from "./LabelManageComponent";
import EditCategoryModal from "./EditCategoryModal";
import {confirm} from "../../helpers/helper";

class LabelManageContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showEditCategoryModal = this.showEditCategoryModal.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    componentWillMount() {
        this.props.labelManageAction.loadAllLabels();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isSavingCategory !== this.props.isSavingCategory && !nextProps.isSavingCategory){
            this.props.labelManageAction.loadAllLabels();
        }
    }

    showEditCategoryModal(category) {
        this.props.labelManageAction.showEditCategoryModal();
        this.props.labelManageAction.handleEditCategoryModal(category);
    }

    deleteCategory(category) {
        confirm("error", "Xóa loại khóa học", "Bạn có chắc muốn xóa loại khóa học này", () => {
            this.props.labelManageAction.deleteCategory(category);
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="content">
                    <div className="content">
                        <div className="container-fluid">
                            <div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between"
                                        }}>
                                            <div>
                                                <button onClick={() => this.showEditCategoryModal({})}
                                                        rel="tooltip" data-placement="top" title=""
                                                        className="btn btn-rose btn-round">
                                                    Thêm loại khóa học
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <h4 className="card-title">
                                                        <strong>&#160; Quản lý khóa học</strong>
                                                    </h4>
                                                    <br/>
                                                    {
                                                        this.props.isLoading ? <Loading/> :
                                                            (
                                                                <LabelManageComponent
                                                                    courseCategories={this.props.courseCategories}
                                                                    showEditCategoryModal={this.showEditCategoryModal}
                                                                    deleteCategory={this.deleteCategory}
                                                                />
                                                            )
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
                <footer className="footer">
                    <div className="container-fluid">
                        <nav className="pull-left">
                            <ul>
                                <li>
                                    <a href="#">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Company
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Portfolio
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Blog
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </footer>
                <EditCategoryModal/>
            </div>
        );
    }
}

LabelManageContainer.propTypes = {
    labelManageAction: PropTypes.object.isRequired,
    courseCategories: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSavingCategory: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        courseCategories: state.labelManage.courseCategories,
        isLoading: state.labelManage.isLoading,
        isSavingCategory: state.labelManage.isSavingCategory
    };
}

function mapDispatchToProps(dispatch) {
    return {
        labelManageAction: bindActionCreators(labelManageAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelManageContainer);
