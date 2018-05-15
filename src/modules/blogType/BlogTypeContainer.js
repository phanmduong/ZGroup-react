import React from 'react';
import BlogTypeComponent from './BlogTypeComponent';
import Pagination from "../../components/common/Pagination";
import AddEditBlogTypeModal from "./AddEditBlogTypeModal";
import *as blogTypeAction from "./blogTypeAction";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {confirm} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import TooltipButton from "../../components/common/TooltipButton";
//import Search from "../../components/common/Search";



class BlogTypeContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1
        };
        this.loadOrders = this.loadOrders.bind(this);
        this.showEditBlogTypeModal2 = this.showEditBlogTypeModal2.bind(this);
        this.deleteBlogType = this.deleteBlogType.bind(this);
    }

    componentWillMount() {
        this.props.blogTypeAction.loadAllBlogType(1);
    }

    deleteBlogType(blogType) {
        confirm("error", "Xóa loại bài viết", "Bạn có chắc muốn xóa loại bài viết này", () => {
            this.props.blogTypeAction.deleteblogType(blogType);
        });
    }

    showEditBlogTypeModal2(blogType) {
        this.props.blogTypeAction.showBlogTypeModal();
        this.props.blogTypeAction.handleBlogTypeModal(blogType);
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.blogTypeAction.loadAllBlogType(page);
    }

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;
        return (
            <div className="wrapper">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="flex-row flex">
                                <h4 className="card-title">
                                    <strong>Danh sách loại bài viết</strong>
                                </h4>
                                <div>
                                    <TooltipButton
                                        placement="top"
                                        text="Thêm loại bài viết">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => this.showEditBlogTypeModal2({})}
                                        >
                                            <strong>+</strong>
                                        </button>
                                    </TooltipButton>
                                </div>
                            </div>

                            {/*<Search*/}
                            {/*onChange={() => {*/}
                            {/*}}*/}
                            {/*value=""*/}
                            {/*placeholder="Nhập để tìm kiếm"*/}
                            {/*/>*/}
                            <br/>
                        </div>
                        {
                            this.props.isLoading ? <Loading/> :


                                (
                                    <BlogTypeComponent
                                        blogTypes={this.props.blogTypes}
                                        showEditBlogTypeModal={this.showEditBlogTypeModal2}
                                        deleteBlogType={this.deleteBlogType}
                                    />
                                )
                        }

                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ {first}
                            - {end}/{this.props.totalCount}</b><br/>
                        <Pagination
                            totalPages={this.props.totalPages}
                            currentPage={this.props.currentPage}
                            loadDataPage={this.loadOrders}
                        />
                    </div>
                </div>
            <AddEditBlogTypeModal/>
            </div>
        );
    }
}

BlogTypeContainer.propTypes = {
    blogTypeAction: PropTypes.object.isRequired,
    blogTypes: PropTypes.array.isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        totalCount: state.blogType.totalCount,
        totalPages: state.blogType.totalPages,
        currentPage: state.blogType.currentPage,
        limit: state.blogType.limit,
        blogTypes: state.blogType.blogTypes,
        isLoading: state.blogType.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogTypeAction: bindActionCreators(blogTypeAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogTypeContainer);