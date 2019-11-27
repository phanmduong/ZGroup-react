import React from 'react';
import PropTypes from 'prop-types';
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {connect} from "react-redux";
import * as studentActions from "../studentActions";
import {bindActionCreators} from "redux";

// import {showNotification} from "../../../../helpers/helper";

class ExtraRegisterOverlay extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.initState = {
            show: false,
            isLoading: false,
            callStatus: 1,
            page: 1,
            note: '',
            appointmentPayment: '',
            dateTest: ''
        };
        this.state = this.initState;
    }

    toggle = () => {
        this.setState({show: !this.state.show});
    };

    changeCallStatus = (callStatus) => {
        this.setState({callStatus});
    };

    close = () => {
        this.setState(this.initState);
    };

    changeCallStatusStudent = () => {
        let {studentId} = this.props;
        let {callStatus, note, appointmentPayment, dateTest} = this.state;
        this.props.studentActions.changeCallStatusStudent(
            callStatus,
            studentId,
            note,
            appointmentPayment,
            dateTest,
            this.close
        );
    };

    render() {
        let {isChangingStatusCall} = this.props;
        return (

            <div style={{position: "relative"}} className="">
                <button className="btn btn-register-action" mask="extra"
                        ref="target" onClick={this.toggle}
                        disabled={isChangingStatusCall}>
                    Khác
                    <i className="material-icons">arrow_drop_down</i>

                </button>
                <Overlay
                    rootClose={true}
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay overlay-call-register"  mask="extra" style={{
                        width: 200,
                        marginTop: 20,
                        left:'unset',
                        right:0
                    }}>

                        <div>
                            <button type="button"
                                    className="btn btn-white width-100 text-center"
                                    disabled={isChangingStatusCall}
                                    onClick={this.props.openModalChangePassword}>
                                Thay đổi mật khẩu
                            </button>
                        </div>
                    </div>
                </Overlay>
            </div>


        );
    }
}


ExtraRegisterOverlay.propTypes = {
    historyCalls: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isChangingStatusCall: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
        isChangingStatusCall: state.infoStudent.isChangingStatusCall,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExtraRegisterOverlay);
