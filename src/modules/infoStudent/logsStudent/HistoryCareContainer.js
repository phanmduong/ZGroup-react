import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import {HISTORY_CARE_TYPES} from "../../../constants/constants";
import CreateRegisterHistoryCareOverlay from "../overlays/CreateRegisterHistoryCareOverlay";
import {isEmptyInput} from "../../../helpers/helper";
import EmptyData from "../../../components/common/EmptyData";
import _ from "lodash";
import {getValueFromKey} from "../../../helpers/entity/object";

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
        this.props.studentActions.loadHistoryCalls(this.studentId);
    };

    historyCares = () => {
        let historyCares = [
            ...this.props.historyCares,
            ...this.props.historyCalls.map(hc => {
                return {
                    id:hc.id,
                    type:'tele_call',
                    date:hc.created_at,
                    created_at:hc.created_at,
                    creator:hc.caller,
                    title:'',
                    status:hc.call_status,
                    note:hc.note,
                };
            }),
        ];
        const sortedArray = _.orderBy(historyCares,
            [function (item) {
                return getValueFromKey(item, "created_at");
            }], ["desc"]);
        return sortedArray;
    }

    render() {
        let historyCares = this.historyCares();
        console.log(historyCares)
        return (
            <div className="tab-pane active">
                {(this.props.isLoading || this.props.isLoadingHistoryCalls) ? <Loading/> :
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

                        {historyCares.map((log, index) => {
                            let type = HISTORY_CARE_TYPES.OBJECT_OPTIONS[log.type];
                            return (
                                <li className="timeline-inverted" key={index}>
                                    <div className={"timeline-badge "} style={{backgroundColor: log.status == 'failed' ? '#f44336' : type.color}}>
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
                                                    {log.creator && <b>&nbsp;&nbsp;{log.creator.name}</b>}
                                                </div>
                                                {!isEmptyInput(log.title) && <div className="">
                                                    <i className="material-icons font-size-14px">info</i>
                                                    &nbsp; &nbsp;Tiêu đề:&nbsp;{log.title}
                                                </div>}
                                                {!isEmptyInput(log.note) && <div className="">
                                                    <i className="material-icons font-size-14px">description</i>
                                                    &nbsp; &nbsp;Nội dung:&nbsp;
                                                    {//eslint-disable-next-line
                                                    }<span dangerouslySetInnerHTML={{__html: log.note}}/>

                                                </div>}
                                                {log.status && <div className="flex-row-center">
                                                    <i className="material-icons">info</i>
                                                    &nbsp; &nbsp;Trạng thái:&nbsp;{log.status !='failed' ? 'Thành công' : "Thất bại"}

                                                </div>}
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                        {historyCares.length == 0 && <EmptyData/>}

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
        historyCalls: state.infoStudent.historyCalls,
        isLoadingHistoryCalls: state.infoStudent.isLoadingHistoryCalls,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCareContainer);
