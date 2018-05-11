import React from "react";
import BlogFilmComponent from "./BlogFilmComponent";
import Search from "../../../components/common/Search";
import TooltipButton from "../../../components/common/TooltipButton";
import AddEditBlogModal from "./AddEditBlogModal";
import  * as blogFilmAction from "./blogFilmAction";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class BlogFilmContainer extends React.Component {
    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="flex-row flex">
                                <h4 className="card-title">
                                    <strong>Danh sách bài viết</strong>
                                </h4>
                                <div>
                                    <TooltipButton
                                        placement="top"
                                        text="Thêm bài viết">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => {this.props.blogFilmAction.showAddEditBlogFilmModal();}}>
                                            <strong>+</strong>
                                        </button>
                                    </TooltipButton>
                                </div>
                            </div>
                            <Search
                                onChange={()=>{}}
                                value={""}
                                placeholder="Nhập tên bài viết hoặc nội dung để tìm kiếm"
                            />
                            <br/>
                        </div>
                        <BlogFilmComponent/>

                    </div>
                </div>
                <AddEditBlogModal/>
            </div>
        );
    }
}
BlogFilmContainer.propTypes = {
    blogFilmAction: PropTypes.object.isRequired,
};
function mapStateToProps() {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogFilmAction: bindActionCreators(blogFilmAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(BlogFilmContainer);