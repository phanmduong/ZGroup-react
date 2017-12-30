import React from 'react';
// import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import ListGroupCustomers from './ListGroupCustomers';
import propTypes from 'prop-types';


class AddGroupCustomerOverlay extends React.Component {
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
        let groupCustomer = this.props.groupCustomer;
        return (
            <div style={{position: "relative"}}>


                <a onClick={() => this.toggle()}
                        className="btn btn-xs btn-main btn-rose">
                    {groupCustomer && groupCustomer.name ?
                        <div style={{ alignItems : "center"}}>
                            {groupCustomer.name}
                        </div>
                        :
                        <span>
                        <i className="material-icons">group</i>Chọn nhóm khách hàng
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
                    <ListGroupCustomers
                        toggle={this.toggle}
                    />
                </Overlay>
            </div>

        );
    }
}

AddGroupCustomerOverlay.propTypes = {
    groupCustomer: propTypes.object,
};
export default AddGroupCustomerOverlay;
