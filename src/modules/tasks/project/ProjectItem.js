import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import * as taskActions from '../taskActions';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class ProjectItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onEditClick = this.onEditClick.bind(this);
    }

    onEditClick(event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.taskActions.openProjectDetailModal(this.props.project);
    }

    render() {
        const {project} = this.props;
        const isAdmin = project.members.filter(member => member.is_admin && member.id === this.props.user.id).length > 0;
        return (
            <div className="col-md-4 col-sm-6">
                <Link to={"project/" + project.id + "/boards"}
                      style={{width: "100%", background: "white", color: "#455a64", textAlign: "left"}}
                      className="btn btn-default btn-lg">
                    {
                        isAdmin && (
                            <div style={{position: "absolute", top: "20px", right: "15px"}}>
                                <div className="board-action">
                                    <a style={{color: "#455a64"}} onClick={this.onEditClick}>
                                        <i className="material-icons" style={{fontSize: "18px"}}>edit</i>
                                    </a>
                                </div>
                            </div>
                        )
                    }

                    <div className="row" style={{fontSize: "16px", fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> {project.title.length > 20 ? project.title.slice(0, 17) + "..." : project.title}
                    </div>
                    <div className="row"
                         style={{
                             height: "5px",
                             marginTop: "10px",
                             marginBottom: "10px",
                             background: project.color ? project.color : "#d9d9d9"
                         }}/>
                    <div className="row" style={{textTransform: "none", marginBottom: "10px"}}>
                        {project.description}<br/>
                        {project.board_count} bảng | {project.card_count} thẻ
                        | {project.members ? project.members.length : 0} thành viên<br/>
                    </div>
                    <div onClick={(event) => {
                        if (isAdmin) {
                            event.preventDefault();
                            event.stopPropagation();
                            this.onEditClick(event);
                        }
                    }} className="row"
                         style={{display: "flex", flexFlow: "row-reverse wrap", height: "29px"}}>
                        {
                            project.members.length > 5 && (
                                <div key={-1} style={{padding: "2px 0px"}}>
                                    <div style={{
                                        width: "25px",
                                        marginRight: "5px",
                                        height: "25px",
                                        lineHeight: "25px",
                                        textAlign: "center",
                                        backgroundColor: "#d9d9d9",
                                        borderRadius: "4px"
                                    }}>
                                        <i className="material-icons">add</i>
                                    </div>
                                </div>
                            )
                        }
                        {
                            project.members && project.members.slice(0, 4).map((member) => {
                                return (
                                    <div key={member.id} style={{padding: "2px 0px"}}>
                                        <div style={{
                                            width: "25px",
                                            marginRight: "5px",
                                            height: "25px",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                            borderRadius: "4px",
                                            backgroundImage: `url('${member.avatar_url}')`
                                        }}/>
                                    </div>
                                );
                            })
                        }

                    </div>
                    <div className="ripple-container"/>
                </Link>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        projects: state.task.project.projects,
        isLoadingProjects: state.task.project.isLoadingProjects,
        currentPage: state.task.project.currentPage,
        user: state.login.user,
        totalPages: state.task.project.totalPages
    };
}


ProjectItem.propTypes = {
    project: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    taskActions: PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectItem);