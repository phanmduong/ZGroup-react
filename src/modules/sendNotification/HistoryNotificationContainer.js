import React from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import PropTypes from 'prop-types';
import Search from "../../components/common/Search";
import {Modal} from "react-bootstrap";
import SendNotificationContainer from "./SendNotificationContainer";

class HistoryNotificationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    closeModal() {
        this.setState({showModal: false});
    }

    openModal() {
        this.setState({
            showModal: true,
        });
    }

    componentWillMount() {

    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Gửi Notification</h4>
                            <div className="row">
                                <div className="col-md-2">
                                    <button className="btn btn-rose" onClick={() => this.openModal()}>
                                        Gửi
                                    </button>
                                </div>
                                <div className="col-md-10">
                                    <Search
                                        onChange={this.notificationTypesSearchChange}
                                        value={this.state.query}
                                        placeholder="Tìm kiếm notification"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Gửi notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <SendNotificationContainer/>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
//
// HistoryNotificationContainer.propTypes = {
//
// };
//
// function mapStateToProps(state) {
//     return {};
// }
//
// function mapDispatchToProps(dispatch) {
//     return {};
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(HistoryNotificationContainer);
export default HistoryNotificationContainer;