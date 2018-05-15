import React from 'react';
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
            <div style={{position: "relative", display: "flex"}}>
                <a
                    className="btn btn-xs btn-main btn-success"
                    onClick={() => this.toggle()}>
                        <span>
                        <i className="material-icons">card_giftcard</i> Chọn Hàng hóa
                        </span>
                </a>
                <Overlay
                    rootClose={true}
                    show={this.state.isShowModal}
                    onHide={() => this.setState({isShowModal: false})}
                    placement="top"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <ListGoods
                        toggle={this.toggle}
                    />
                </Overlay>
            </div>

        );
    }
}

AddGoodOverlay.propTypes = {
};

export default AddGoodOverlay;
