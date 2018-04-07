import React from 'react';
import PropTypes from "prop-types";

class LabelManageComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (

            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>Tên loại khóa học</th>
                        <th>Mô tả ngắn</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.courseCategories && this.props.courseCategories.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {category.name}
                                    </td>
                                    <td>
                                        {category.short_description || 'Không có mô tả'}
                                    </td>
                                    <td>
                                        <div className="btn-group-action">
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"
                                               onClick={() => this.props.showEditCategoryModal(category)}
                                            >
                                                <i className="material-icons">edit</i>
                                            </a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"
                                               onClick={() => this.props.deleteCategory(category)}>
                                                <i className="material-icons">delete</i>
                                            </a>
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

LabelManageComponent.propTypes = {
    courseCategories: PropTypes.array.isRequired,
    showEditCategoryModal: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired
};

export default LabelManageComponent;