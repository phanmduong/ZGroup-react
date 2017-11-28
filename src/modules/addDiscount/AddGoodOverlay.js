import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import ListGoods from './ListGoods';
import Avatar from "../../components/common/Avatar";


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
        let good = this.props.good ;
        return (
            <div style={{position: "relative"}}>
                <a className="btn btn-simple card-detail-btn-action"
                   ref="target" onClick={() => this.toggle()}>

                    {good.name ?
                        <div style={{display: "flex"}}>
                            <Avatar size={30} url={good.avatar_url}/>
                            {good.name}
                        </div>
                        :
                        <span>
                        <i className="material-icons">card_giftcard</i> Chọn Hàng hóa
                        </span>
                    }

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
AddGoodOverlay.PropTypes = {
  good : PropTypes.object,
};

export default AddGoodOverlay;
