import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from "./ProjectItem";
import ProjectDetailModalContainer from "./ProjectDetailModalContainer";

class ListProject extends React.Component {
    constructor(props, context) {
        super(props, context);
    }


    render() {
        return (
            <div className="row">
                <ProjectDetailModalContainer/>
                {this.props.projects.map((project) => <ProjectItem key={project.id} project={project}/>)}
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