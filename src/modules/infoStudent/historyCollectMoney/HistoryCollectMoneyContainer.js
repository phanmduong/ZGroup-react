/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import * as studentActions from "../studentActions";
import Loading from "../../../components/common/Loading";
import {dotNumber} from "../../../helpers/helper";

class HistoryCollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.studentActions.loadHistoryCollectMoney(this.props.params.studentId);
    }

    render() {
        return (
            <div className="tab-pane active">

                {this.props.isLoadingHistoryCollectMoney ? <Loading/>
                    :
                    <ul className="timeline timeline-simple">
                        {
                            this.props.historyCollectMoney.map(function (register, index) {
                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            <img className="circle" src={register.class.icon_url} alt=""/>
                                        </div>
                                        <div className="timeline-panel">
                                            <h4>
                                                <b>{register.class.name}</b>
                                            </h4>
                                            <div className="timeline-body">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    <b>&nbsp; &nbsp; {register.paid_time} </b>
                                                </div>
                                                <div className="flex-row-center">
                                                    <i className="material-icons">create</i>&nbsp; &nbsp;
                                                    Ghi chú: {register.note}
                                                </div>
                                                {
                                                    register.collector &&
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">account_box
                                                        </i>&nbsp; &nbsp; Người thu: {register.collector.name}
                                                    </div>
                                                }
                                            </div>
                                            <div className="timeline-heading margintop-10">
                                                <div className="flex-row-center">
                                                    <button className="btn btn-xs btn-rose"
                                                            style={{width: '70px'}}
                                                    >
                                                        {dotNumber(register.money)}
                                                        <div className="ripple-container"/>
                                                    </button>
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                }

            </div>
        );
    }
}

HistoryCollectMoneyContainer.propTypes = {
    historyCollectMoney: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingHistoryCollectMoney: PropTypes.bool.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCollectMoney: state.infoStudent.historyCollectMoney,
        isLoadingHistoryCollectMoney: state.infoStudent.isLoadingHistoryCollectMoney,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HistoryCollectMoneyContainer);
