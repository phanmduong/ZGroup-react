import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router";

class ProjectItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {project} = this.props;
        return (
            <div className="col-md-4 col-sm-6 col-lg-3">
                <Link to={"project/" + project.id + "/boards"}
                      style={{width: "100%", background: "white", color: "#455a64", textAlign: "left"}}
                      className="btn btn-default btn-lg">
                    <div style={{position: "absolute", top: "20px", right: "15px"}}>
                        <div className="board-action">
                            <a style={{color: "#455a64"}}>
                                <i className="material-icons" style={{fontSize: "18px"}}>edit</i>
                            </a>
                        </div>
                    </div>
                    <div className="row" style={{fontSize: "16px", fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> {project.title}
                    </div>
                    <div className="row"
                         style={{height: "5px", marginTop: "10px", marginBottom: "10px", background: project.color}}>
                    </div>
                    <div className="row" style={{textTransform: "none", marginBottom: "10px"}}>
                        Mô tả dự án<br/>
                        {project.board_count} bảng | {project.card_count} thẻ | {project.members.length} thành viên<br/>
                    </div>
                    <div className="row" style={{display: "flex", flexFlow: "row-reverse wrap"}}>
                        {
                            project.members.map((member) => {
                                return (
                                    <div style={{padding: "2px 0px"}}>
                                        <div style={{
                                            width: "25px",
                                            marginRight: "5px",
                                            height: "25px",
                                            backgroundPosition: "center center",
                                            backgroundSize: "cover",
                                            borderRadius: "4px",
                                            backgroundImage: `url('${member.avatar_url}')`
                                        }}>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="ripple-container">
                    </div>
                </Link>
            </div>
        );
    }
}

ProjectItem.propTypes = {
    project: PropTypes.object.isRequired
};

export default ProjectItem;