import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import ListGoodsInOverlay from './ListGoodsInOverlay';
import TooltipButton from '../../../components/common/TooltipButton';
import PropTypes from 'prop-types';


class AddGoodOverlay extends React.Component{
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


    render(){
        return(
            <div style={{position: "relative", display: "flex"}}>
                {
                    this.props.status === "completed_order" ?

                    <TooltipButton text="Không chỉnh sửa khi ở trạng thái hoàn thành" placement="top">
                        <button
                            className="btn btn-sm btn-round btn-success disabled">
                        <span>
                        <i className="material-icons">card_giftcard</i> Chọn Hàng hóa
                        </span>

                        </button>
                    </TooltipButton>

                :
                    <a
                        className="btn btn-sm btn-round btn-success"
                        onClick={() => this.toggle()}>
                        <span>
                        <i className="material-icons">card_giftcard</i> Chọn Hàng hóa
                        </span>

                    </a>
                }

                <Overlay
                    rootClose={true}
                    show={this.state.isShowModal}
                    onHide={() => this.setState({isShowModal: false})}
                    placement="top"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <ListGoodsInOverlay
                        toggle={this.toggle}
                    />
                </Overlay>
            </div>
        );
    }
}

AddGoodOverlay.propTypes = {
  status : PropTypes.string,
};

export default AddGoodOverlay;

