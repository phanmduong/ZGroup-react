import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import FormInputText from "../../../../components/common/FormInputText";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Loading from "../../../../components/common/Loading";
import * as taskActions from '../../taskActions';
import Avatar from "../../../../components/common/Avatar";

class AddMemberPopoverContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.state = {
            query: ""
        };
        this.toggleAssign = this.toggleAssign.bind(this);
    }

    componentWillMount() {
        this.props.taskActions.clearMembers();
    }

    onSearchChange(event) {
        const value = event.target.value;
        this.setState({query: value});
        if (this.loadMemberTimeout) {
            clearTimeout(this.loadMemberTimeout);
        }
        this.loadMemberTimeout = setTimeout(function () {
            this.props.taskActions.loadMembers(value, this.props.card.id);
        }.bind(this), 500);
    }

    toggleAssign(member) {
        this.props.taskActions.assignMember(this.props.card, member);
    }

    render() {
        return (
            <div className="kt-overlay" style={{
                width: "350px",
                marginLeft: -80,
            }}>
                <button
                    onClick={this.props.toggle}
                    type="button" className="close"
                    style={{color: '#5a5a5a'}}>
                    <span aria-hidden="true">×</span>
                    <span className="sr-only">Close</span>
                </button>
                <h5>Thành viên</h5>
                <FormInputText
                    autoComplete="off"
                    label="Tên/Email"
                    name="value"
                    value={this.state.query}
                    updateFormData={this.onSearchChange}/>
                {
                    this.props.isLoading ?
                        <Loading/> : (
                            <ListGroup>
                                {this.props.members.map((m) =>
                                    (
                                        <ListGroupItem
                                            key={m.id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.toggleAssign(m);
                                            }}>

                                            <div style={{
                                                display: "flex", justifyContent: "space-between",
                                                lineHeight: "30px"
                                            }}>
                                                <div style={{display: "flex"}}>
                                                    <Avatar size={30} url={m.avatar_url}/>{m.name}
                                                </div>
                                                {
                                                    m.added && <i className="material-icons">done</i>
                                                }
                                            </div>
                                        </ListGroupItem>
                                    )
                                )}
                            </ListGroup>
                        )
                }

            </div>
        );
    }
}

AddMemberPopoverContainer.propTypes = {
    toggle: PropTypes.func.isRequired,
    members: PropTypes.array.isRequired,
    taskActions: PropTypes.object.isRequired,
    search: PropTypes.string.isRequired,
    card: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        members: state.task.addMember.members,
        isLoading: state.task.addMember.isLoading,
        search: state.task.addMember.search
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMemberPopoverContainer);