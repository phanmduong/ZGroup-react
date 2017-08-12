import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import FormInputSelect from "../../components/common/FormInputSelect";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";

class ListProject extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-rose">
                        <th>Tên dự án</th>
                        <th>Mô tả</th>
                        <th>Người thêm</th>
                        <th>Thêm vào lúc</th>
                        <th>Người sửa gần nhất</th>
                        <th>Sửa gần nhất</th>
                        <th>Trạng thái</th>
                        <th>
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.projects.map(project => {
                        return (
                            <tr key={project.id}>
                                <td>
                                    <Link className="btn btn-rose btn-sm btn-main"
                                          to={"project/" + project.id + "/boards"}>
                                        {project.title}
                                    </Link>
                                </td>
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
                                    <ButtonGroupAction
                                        delete={this.props.deleteProject}
                                        editUrl={'/project/' + project.id + "/edit"}
                                        object={project}
                                    />
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