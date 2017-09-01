import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../taskActions';
import ListProject from "./ListProject";
import {Link} from "react-router";
import Loading from "../../../components/common/Loading";
import {confirm} from "../../../helpers/helper";
import _ from 'lodash';
import Search from "../../../components/common/Search";

class ProjectListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
    }


    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Dự án</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to="/project/create" className="btn btn-rose">
                                    Thêm dự án
                                </Link>
                            </div>

                            <Search
                                onChange={this.projectsSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                            />

                            {this.props.isLoadingProjects ? <Loading/> :
                                <ListProject
                                    changeProjectStatus={this.changeProjectStatus}
                                    deleteProject={this.deleteProject}
                                    projects={this.props.projects}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProjectListContainer.propTypes = {
    taskActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListContainer);