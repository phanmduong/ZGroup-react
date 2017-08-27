import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";

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
                <button className="btn btn-default"
                        ref="target" onClick={this.toggle}>
                    <i className="material-icons">people</i> Thành viên
                </button>
                <Overlay
                    show={this.state.show}
                    onHide={() => this.setState({show: false})}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <AddMemberPopoverContainer/>
                </Overlay>
            </div>
        );
    }
}


AddMemberOverlayContainer.propTypes = {
    card: PropTypes.object.isRequired
};

export default AddMemberOverlayContainer;
