import React from 'react';
import PropTypes from 'prop-types';

class ListProject extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-primary">
                        <th>Tên dự án</th>
                        <th>Mô tả</th>
                        <th>Người thêm</th>
                        <th>thêm vào lúc</th>
                        <th>Người sửa gần nhất</th>
                        <th>Sửa gần nhất</th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.projects.map(project => {
                        return (
                            <tr key={project.id}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.creator.name}</td>
                                <td>{project.created_at}</td>
                                <td>{project.editor.name}</td>
                                <td>{project.updated_at}</td>
                                <td className="td-actions text-right">
                                    <button type="button" rel="tooltip" className="btn btn-info btn-round">
                                        <i className="material-icons">person</i>
                                    </button>
                                    <button type="button" rel="tooltip" className="btn btn-success btn-round">
                                        <i className="material-icons">edit</i>
                                    </button>
                                    <button type="button" rel="tooltip" className="btn btn-danger btn-round">
                                        <i className="material-icons">close</i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListProject.propTypes = {
    deleteProject: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired
};

export default ListProject;