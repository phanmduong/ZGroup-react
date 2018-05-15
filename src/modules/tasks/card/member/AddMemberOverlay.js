import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import AddMemberPopoverContainer from "./AddMemberPopoverContainer";

class AddMemberOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: false
        };
    }

    toggle() {
        this.setState({show: !this.state.show});
    }


    render() {
        return (
            <div style={{position: "relative"}}>
                <button className="btn btn-default card-detail-btn-action"
                        ref="target" onClick={this.toggle}>
                    <i className="material-icons">people</i> Thành viên
                </button>
                <Overlay rootClose={true}
                         show={this.state.show}
                         onHide={() => this.setState({show: false})}
                         placement="left"
                         container={this}
                         target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <AddMemberPopoverContainer
                        card={this.props.card}
                        toggle={this.toggle}/>
                </Overlay>
            </div>
        );
    }
}


AddMemberOverlay.propTypes = {
    card: PropTypes.object.isRequired
};

export default AddMemberOverlay;
