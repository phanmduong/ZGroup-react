import React from 'react';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import ListCustomers from './ListCustomers';
import Avatar from "../../components/common/Avatar";
import PropTypes from 'prop-types';


class AddCustomerOverlay extends React.Component {
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
        let customer = this.props.customer;
        return (
            <div style={{position: "relative"}}>




                    <a onClick={() => this.toggle()}
                        className="btn btn-xs btn-main btn-warning">
                    {customer && customer.name ?
                        <div  style={{display: "flex",  alignItems : "center"}}>
                            <Avatar size={30} url={customer.avatar_url}/>
                            {customer.name}
                        </div>
                        :
                        <span>
                        <i className="material-icons">people</i> Chọn Khách hàng
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
                    <ListCustomers
                        toggle = {this.toggle}
                    />
                </Overlay>
            </div>

        );
    }
}

AddCustomerOverlay.propTypes = {
    customer : PropTypes.object,
};
export default AddCustomerOverlay;
