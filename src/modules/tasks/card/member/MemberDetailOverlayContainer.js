import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as taskActions from '../../taskActions';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import MemberPopover from "./MemberPopover";
import Avatar from "../../../../components/common/Avatar";

class MemberDetailOverlayContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.assignMember = this.assignMember.bind(this);
        this.state = {
            show: false
        };
    }

    assignMember() {
        this.props.taskActions.assignMember(this.props.card, this.props.member);
    }

    toggle(event) {
        event.stopPropagation();
        this.setState({show: !this.state.show});
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <a ref="target" onClick={this.toggle}>
                    <Avatar key={this.props.member.id} url={this.props.member.avatar_url} size={30}/>
                </a>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <MemberPopover assignMember={this.assignMember} member={this.props.member} toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}

MemberDetailOverlayContainer.propTypes = {
    taskActions: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired
};

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberDetailOverlayContainer);