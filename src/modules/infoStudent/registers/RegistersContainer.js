/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';

class RegistersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.studentActions.loadRegisters(this.props.params.studentId);
    }

    render() {
        return (
            <div className="tab-pane active">

                {this.props.isLoadingRegisters ? <Loading/>
                    :
                    <ul className="timeline timeline-simple">
                        {
                            this.props.registers.map(function (register, index) {
                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            <img className="circle" src={register.class.avatar_url} alt=""/>
                                        </div>
                                        <div className="timeline-panel">
                                            <h4>
                                                <b>{register.class.name}</b>
                                            </h4>
                                            <div className="timeline-body">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    <b>&nbsp; &nbsp; {register.class.study_time} </b>
                                                </div>
                                                <div className="flex-row-center">
                                                    <i className="material-icons">home</i>&nbsp; &nbsp;
                                                    {register.class.room + ' - ' + register.class.base}
                                                </div>
                                                <div className="flex-row-center">
                                                    <i className="material-icons">date_range</i>&nbsp; &nbsp; {register.class.description}
                                                </div>
                                            </div>
                                            <div className="timeline-heading margintop-10">
                                                <div className="flex-row-center">
                                                    {
                                                        register.saler &&
                                                        <button className="btn btn-xs"
                                                                style={{backgroundColor: '#' + register.saler.color}}
                                                        >
                                                            {helper.getShortName(register.saler.name)}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    }
                                                    {
                                                        register.campaign &&
                                                        <button className="btn btn-xs"
                                                                style={{backgroundColor: '#' + register.campaign.color}}
                                                        >
                                                            {helper.getShortName(register.campaign.name)}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                    }

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

function mapStateToProps(state) {
    return {
        registers: state.infoStudent.registers,
        isLoadingRegisters: state.infoStudent.isLoadingRegisters
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistersContainer);
