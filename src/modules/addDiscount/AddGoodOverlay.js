import React from 'react';
// import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import ListGoods from './ListGoods';

class AddGoodOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isShowModal: false
        };
    }

    toggle() {
        this.setState({isShowModal: !this.state.isShowModal});
    }


    render() {
        return (
            <div style={{position: "relative"}}>
                <a className="btn btn-default card-detail-btn-action"
                   ref="target" onClick={() => this.toggle()}>
                    <i className="material-icons">people</i> Hàng hóa
                </a>
                <Overlay
                    rootClose={true}
                    show={this.state.isShowModal}
                    onHide={() => this.setState({isShowModal: false})}
                    placement="top"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <ListGoods
                        toggle = {this.toggle}
                    />
                </Overlay>
            </div>

        );
    }
}


export default AddGoodOverlay;
