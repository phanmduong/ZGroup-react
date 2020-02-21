import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import {HISTORY_CARE_TYPES} from "../../../constants/constants";
import CreateRegisterHistoryCareOverlay from "../overlays/CreateRegisterHistoryCareOverlay";
import {isEmptyInput} from "../../../helpers/helper";

class HistoryCareContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

    }

    componentWillMount() {
        this.loadHistoryCares();
    }

    loadHistoryCares = () => {
        this.props.studentActions.loadStudentCareHistory(this.studentId);

    };

    render() {
        return (
            <div className="tab-pane active">
                {this.props.isLoading ? <Loading/> :
                    <ul className="timeline timeline-simple">
                        <li className="timeline-inverted">
                            <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                <i className="material-icons">add</i>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <div className="flex flex-align-items-center margin-top-5">
                                        <CreateRegisterHistoryCareOverlay
                                            className="btn btn-actions"
                                        />
                                    </div>
                                </div>
                                <div className="timeline-body margin-vertical-30"/>
                            </div>
                        </li>

                        {this.props.historyCares.map((log, index) => {
                            let type = HISTORY_CARE_TYPES.OBJECT_OPTIONS[log.type];
                            return (
                                <li className="timeline-inverted" key={index}>
                                    <div className={"timeline-badge "} style={{backgroundColor: type.color}}>
                                        <i className="material-icons">{type.icon}</i>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="">

                                            <h4><b>{type.name}</b></h4>
                                            <div className="timeline-body">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;{log.date}
                                                    {log.creator && ' - Người nhập:'}
                                                    {log.creator && <b>&nbsp;&nbsp;{ log.creator.name }</b>}
                                                </div>
                                                {!isEmptyInput(log.title) && <div className="flex-row-center">
                                                    <i className="material-icons">info</i>
                                                    &nbsp; &nbsp;Tiêu đề:&nbsp;{log.title}
                                                </div>}
                                                {!isEmptyInput(log.note) && <div className="flex-row-center">
                                                    <i className="material-icons">description</i>
                                                    &nbsp; &nbsp;Nội dung:&nbsp;{log.note}

                                                </div>}
                                                {type.status && <div className="flex-row-center">
                                                    <i className="material-icons">info</i>
                                                    &nbsp; &nbsp;Trạng thái:&nbsp;Thành công

                                                </div>}
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            );
                        })}

                    </ul>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        historyCares: state.infoStudent.historyCare.historyCares,
        isLoading: state.infoStudent.historyCare.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCareContainer);
