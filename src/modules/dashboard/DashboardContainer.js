/**
 * Created by phanmduong on 9/3/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Select from '../../components/common/Select';
import Loading from '../../components/common/Loading';
import * as dashboardActions from './dashboardActions';
import DashboardComponent from './DashboardComponent';
import {Modal, Panel} from 'react-bootstrap';
import ClassContainer from './ClassContainer';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';
import FormInputDate from "../../components/common/FormInputDate";
import * as helper from '../../helpers/helper';

class DashboardContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectGenId: 0,
            selectBaseId: 0,
            gens: [],
            bases: [],
            showModalClass: false,
            classSelected: {
                name: ''
            },
            openFilter: false,
            filter: {
                startTime: '',
                endTime: '',
            }
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadInitDashboard = this.loadInitDashboard.bind(this);
        this.changeClassStatus = this.changeClassStatus.bind(this);
        this.closeModalClass = this.closeModalClass.bind(this);
        this.openModalClass = this.openModalClass.bind(this);
        this.loadAttendanceShift = this.loadAttendanceShift.bind(this);
        this.loadAttendanceClass = this.loadAttendanceClass.bind(this);
        this.updateFormFilter = this.updateFormFilter.bind(this);
        let relevants = ['A013a1','A013a1'];
        console.log(this.getRelevants(this.question, relevants));
    }

    componentWillMount() {
        this.props.dashboardActions.loadGensData();
        this.props.dashboardActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingGens !== this.props.isLoadingGens && !nextProps.isLoadingGens) {
            this.setState({
                gens: this.getGens(nextProps.gens),
                selectGenId: nextProps.currentGen.id
            });
        }
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
        }
    }

    getRelevants(questions, relevantIds) {
        let relevants = [];
        relevantIds.forEach(relevantId => {
            const question = questions.filter(question => (question.id == relevantId))[0];
            if (question) {
                const relevant = relevants.filter(relevant => (relevant.id == question.id))[0];
                if (relevant == undefined) {
                    relevants = [...relevants, question];
                }
            }
        })

        return relevants;
    }

    question = [
        {
            id: 'A013',
            type: 'checkbox',
            question: 'Ông/bà thường nhận tin tức từ những nguồn nào?',
            relevant_quest: [],
            answers: [
                {
                    answer: 'Tivi',
                    code: 0,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Báo chí',
                    code: 1,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Loa/đài',
                    code: 2,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Internet',
                    code: 3,
                    relevant_id: ['A013a2'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Người quen/bạn bè',
                    code: 4,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Hội họp',
                    code: 5,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Khác(xin nêu rõ)',
                    code: 6,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: true,
                },
                {
                    answer: 'Mạng xã hội',
                    code: 7,
                    relevant_id: ['A013a2'],
                    isDifferentAnwer: false,
                },
            ],
            show: true,
        },
        {
            id: 'A013a1',
            type: 'checkbox',
            question: 'Ông/bà thường nhận tin tức từ những nguồn nào?',
            relevant_quest: [],
            answers: [
                {
                    answer: 'Tivi',
                    code: 0,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Báo chí',
                    code: 1,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Loa/đài',
                    code: 2,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
            ],
            show: false,
        },
        {
            id: 'A013a2',
            type: 'checkbox',
            question: 'Ông/bà dsadsas?',
            relevant_quest: [],
            answers: [
                {
                    answer: 'Tivi',
                    code: 0,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Báo chí',
                    code: 1,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
                {
                    answer: 'Loa/đài',
                    code: 2,
                    relevant_id: ['A013a1'],
                    isDifferentAnwer: false,
                },
            ],
            show: false,
        },
    ]

    getGens(gens) {
        return gens.map(function (gen) {
            return {
                key: gen.id,
                value: 'Khóa ' + gen.name
            };
        });
    }

    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        this.setState({selectBaseId: 0});
        return [{
            key: 0,
            value: 'Tất cả'
        }, ...baseData];
    }

    loadInitDashboard() {
        this.loadDashboard(this.state.selectGenId, this.state.selectBaseId);
    }

    loadDashboard(genId, baseId, startTime, endTime) {
        if (genId <= 0) return;
        if (baseId === 0) {
            this.props.dashboardActions.loadDashboardData(genId, '', startTime, endTime);
        }
        else {
            this.props.dashboardActions.loadDashboardData(genId, baseId, startTime, endTime);
        }
    }

    onChangeGen(value) {
        this.setState({selectGenId: value});
        this.loadDashboard(value, this.state.selectBaseId);
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.loadDashboard(this.state.selectGenId, value);
    }

    changeClassStatus(classId) {
        this.props.dashboardActions.changeClassStatus(classId);
    }

    closeModalClass() {
        this.setState({showModalClass: false});
    }

    openModalClass(classData) {
        this.setState(
            {
                showModalClass: true,
                classSelected: classData
            }
        );
        this.props.dashboardActions.loadClass(classData.id);
    }

    loadAttendanceShift(time) {
        if (this.state.selectBaseId === 0) {
            this.props.dashboardActions.loadAttendanceShifts(this.state.selectGenId, '', this.props.timeShifts + time);
        }
        else {
            this.props.dashboardActions.loadAttendanceShifts(this.state.selectGenId, this.state.selectBaseId, this.props.timeShifts + time);
        }

    }

    loadAttendanceClass(time) {
        if (this.state.selectBaseId === 0) {
            this.props.dashboardActions.loadAttendanceClasses(this.state.selectGenId, '', this.props.timeClasses + time);
        }
        else {
            this.props.dashboardActions.loadAttendanceClasses(this.state.selectGenId, this.state.selectBaseId, this.props.timeClasses + time);
        }

    }

    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;

        if (!helper.isEmptyInput(filter.startTime) && !helper.isEmptyInput(filter.endTime)) {
            this.loadDashboard(this.state.selectGenId, this.state.selectBaseId, filter.startTime, filter.endTime);
        }
        this.setState({filter: filter});
    }

    render() {
        return (
            <div>

                {this.props.isLoadingGens || this.props.isLoadingBases ? <Loading/> :
                    (
                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={this.state.gens}
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-info btn-rose btn-round"
                                            style={{width: "100%"}}
                                            onClick={() => this.setState({openFilter: !this.state.openFilter})}>
                                        <i className="material-icons">filter_list</i>
                                        Lọc
                                    </button>
                                </div>
                            </div>
                            <Panel collapsible expanded={this.state.openFilter}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-content">
                                                <div className="tab-content">
                                                    <h4 className="card-title">
                                                        <strong>Bộ lọc</strong>
                                                    </h4>
                                                    <br/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Từ ngày"
                                                            name="startTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-start-time"
                                                            value={this.state.filter.startTime}
                                                            maxDate={this.state.filter.endTime}
                                                        />
                                                    </div>
                                                    <div className="col-md-3">
                                                        <FormInputDate
                                                            label="Đến ngày"
                                                            name="endTime"
                                                            updateFormData={this.updateFormFilter}
                                                            id="form-end-time"
                                                            value={this.state.filter.endTime}
                                                            minDate={this.state.filter.startTime}

                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Panel>
                            <DashboardComponent
                                {...this.props}
                                baseId={this.state.selectBaseId}
                                loadDashboard={this.loadInitDashboard}
                                changeClassStatus={this.changeClassStatus}
                                openModalClass={this.openModalClass}
                                loadAttendanceShift={this.loadAttendanceShift}
                                loadAttendanceClass={this.loadAttendanceClass}
                                bases={this.props.bases}
                            />
                            <Modal
                                show={this.state.showModalClass}
                                onHide={this.closeModalClass}
                                bsSize="large"
                            >
                                <Modal.Header closeButton>
                                    <h3>
                                        <strong>Thông tin lớp học {this.state.classSelected.name}</strong>
                                    </h3>
                                    <p>Lớp được tạo lúc <strong>
                                        <small>{this.state.classSelected.created_at}</small>
                                    </strong></p>
                                    <div className="flex flex-wrap">
                                        {
                                            this.state.classSelected.teacher &&
                                            <TooltipButton text="Giảng viên"
                                                           placement="top"
                                            >
                                                <button className="btn btn-sm"
                                                        style={{background: '#' + this.state.classSelected.teacher.color}}>
                                                    {this.state.classSelected.teacher.name}
                                                    <div className="ripple-container"/>
                                                </button>
                                            </TooltipButton>
                                        }
                                        {
                                            this.state.classSelected.teacher_assistant &&
                                            <TooltipButton text="Trơ giảng"
                                                           placement="top"
                                            >
                                                <button className="btn btn-sm"
                                                        style={{background: '#' + this.state.classSelected.teacher_assistant.color}}>
                                                    {this.state.classSelected.teacher_assistant.name}
                                                    <div className="ripple-container"/>
                                                </button>
                                            </TooltipButton>
                                        }
                                    </div>
                                </Modal.Header>
                                <Modal.Body>
                                    <ClassContainer/>
                                </Modal.Body>
                            </Modal>
                        </div>
                    )
                }
            </div>
        )
            ;
    }
}

DashboardContainer.propTypes = {
    gens: PropTypes.array.isRequired,
    dashboardActions: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    isLoadingGens: PropTypes.bool.isRequired,
    isLoadingBases: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingAttendanceShifts: PropTypes.bool.isRequired,
    isLoadingAttendanceClasses: PropTypes.bool.isRequired,
    currentGen: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    timeShifts: PropTypes.number.isRequired,
    dateShifts: PropTypes.string.isRequired,
    timeClasses: PropTypes.number.isRequired,
    dateClasses: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
    return {
        gens: state.dashboard.gens,
        isLoadingGens: state.dashboard.isLoadingGens,
        currentGen: state.dashboard.currentGen,
        bases: state.dashboard.bases,
        isLoadingBases: state.dashboard.isLoadingBases,
        isLoading: state.dashboard.isLoading,
        isLoadingAttendanceShifts: state.dashboard.isLoadingAttendanceShifts,
        isLoadingAttendanceClasses: state.dashboard.isLoadingAttendanceClasses,
        dashboard: state.dashboard.dashboard,
        timeShifts: state.dashboard.timeShifts,
        dateShifts: state.dashboard.dateShifts,
        timeClasses: state.dashboard.timeClasses,
        dateClasses: state.dashboard.dateClasses,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
