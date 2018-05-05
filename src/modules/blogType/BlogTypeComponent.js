import React from 'react';
import PropTypes from "prop-types";
import TooltipButton from "../../components/common/TooltipButton";


class BlogTypeComponent extends React.Component{
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (

            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>Tên loại bài viết</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.blogTypes && this.props.blogTypes.map((blogType, index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        {blogType.name}
                                    </td>
                                    <td>
                                        <div className="btn-group-action" style={{float:"right"}}>
                                            <TooltipButton
                                                placement="top"
                                                text="Sửa">
                                            <a style={{color: "#878787"}}
                                                onClick={() => this.props.showEditBlogTypeModal(blogType)}
                                            >
                                                <i className="material-icons">edit</i>
                                            </a>
                                            </TooltipButton>
                                            <TooltipButton
                                                placement="top"
                                                text="Xoá">
                                            <a style={{color: "#878787"}}
                                                onClick={() => this.props.deleteBlogType(blogType)}
                                            >
                                                <i className="material-icons">delete</i>
                                            </a>
                                            </TooltipButton>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}
BlogTypeComponent.propTypes = {
    blogTypes:PropTypes.array.isRequired,
    showEditBlogTypeModal:PropTypes.func.isRequired,
    deleteBlogType:PropTypes.func.isRequired
};
export default BlogTypeComponent;