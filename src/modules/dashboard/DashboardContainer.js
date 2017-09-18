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
import {Modal} from 'react-bootstrap';
import ClassContainer from './ClassContainer';
import PropTypes from 'prop-types';
import TooltipButton from '../../components/common/TooltipButton';

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
            }
        };
        this.onChangeGen = this.onChangeGen.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.loadInitDashboard = this.loadInitDashboard.bind(this);
        this.changeClassStatus = this.changeClassStatus.bind(this);
        this.closeModalClass = this.closeModalClass.bind(this);
        this.openModalClass = this.openModalClass.bind(this);
        this.loadAttendanceShift = this.loadAttendanceShift.bind(this);
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

    loadDashboard(genId, baseId) {
        if (genId <= 0) return;
        if (baseId === 0) {
            this.props.dashboardActions.loadDashboardData(genId);
        }
        else {
            this.props.dashboardActions.loadDashboardData(genId, baseId);
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
            this.props.dashboardActions.loadAttendanceShifts(this.state.selectGenId, '', this.props.time + time);
        }
        else {
            this.props.dashboardActions.loadAttendanceShifts(this.state.selectGenId, this.state.selectBaseId, this.props.time + time);
        }

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
                                        disableRound
                                        value={this.state.selectGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-5">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={this.state.bases}
                                        disableRound
                                        value={this.state.selectBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                            </div>
                            <DashboardComponent
                                {...this.props}
                                baseId={this.state.selectBaseId}
                                loadDashboard={this.loadInitDashboard}
                                changeClassStatus={this.changeClassStatus}
                                openModalClass={this.openModalClass}
                                loadAttendanceShift={this.loadAttendanceShift}
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
    currentGen: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
    time: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
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
        dashboard: state.dashboard.dashboard,
        time: state.dashboard.time,
        date: state.dashboard.date,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(dashboardActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
