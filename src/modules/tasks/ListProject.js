import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import FormInputSelect from "../../components/common/FormInputSelect";

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
                        <th>Trạng thái</th>
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
                                <td>
                                    <FormInputSelect
                                        isNotForm={true}
                                        placeholder="Vui lòng chọn 1 trạng thái"
                                        name="status"
                                        data={[
                                            {id: 'open', name: 'mở'},
                                            {id: 'close', name: 'đóng'}
                                        ]}
                                        value={project.status}
                                        updateFormData={(event) => this.props.changeProjectStatus(project, event.target.value)}
                                    />
                                </td>
                                <td>
                                    <Link to={'/project/edit/' + project.id} type="button" rel="tooltip"
                                          className="text-rose">
                                        <i className="material-icons">edit</i>
                                    </Link>
                                </td>
                                <td>
                                    <a onClick={() => this.props.deleteProject(project)} type="button"
                                       rel="tooltip" className="text-danger">
                                        <i className="material-icons">delete</i>
                                    </a>
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
    projects: PropTypes.array.isRequired,
    changeProjectStatus: PropTypes.func.isRequired
};

export default ListProject;