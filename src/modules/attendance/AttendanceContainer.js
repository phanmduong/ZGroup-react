import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as    attendanceActions from '../attendance/attendanceActions';
import ListClassComponent from './ListClassComponent';
import Search from '../../components/common/Search';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Select from './SelectGen';
import Loading from "../../components/common/Loading";

class AttendanceContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: "",
            page: 1,
            showModalLesson: false,
            showModalDetailLesson: false,
            selectedLessonId: 1,
            selectedClass: {
                id: 0,
                course: {
                    icon_url: "",
                },
            },
            gens: [
                {
                    key: 0,
                    value: 'Tất cả'
                },
            ],
            bases: [
                {
                    key: 0,
                    value: 'Tất cả'
                },
            ],
            selectBaseId: '',
            selectGenId: '',
        };
        this.genid = null;
        this.baseid = null;
        this.classesSearchChange = this.classesSearchChange.bind(this);
        this.loadClasses = this.loadClasses.bind(this);
        this.closeModalLesson = this.closeModalLesson.bind(this);
        this.openModalLesson = this.openModalLesson.bind(this);
        this.openModalDetailLesson = this.openModalDetailLesson.bind(this);
        this.closeModalDetailLesson = this.closeModalDetailLesson.bind(this);
        this.takeAttendance = this.takeAttendance.bind(this);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeGen = this.onChangeGen.bind(this);
    }

    componentWillMount() {
        this.props.attendanceActions.loadGensData();
        // this.props.attendanceActions.loadBasesData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingGens !== this.props.isLoadingGens && !nextProps.isLoadingGens) {
            let gens = _.sortBy(nextProps.gens, [function (o) {
                return parseInt(o.name);
            }]);
            gens = _.reverse(gens);
            this.setState({
                gens: [...gens],
                selectGenId: nextProps.currentGen.id
            });
            this.genid = nextProps.currentGen.id;
            this.loadClasses(1, '', '', nextProps.selectedBaseId, nextProps.currentGen.id);
        }
        // if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
        //     let bases = this.getBases(nextProps.bases);
        //     this.setState({
        //         bases: bases,
        //         selectBaseId: nextProps.bases[0].id
        //     });
        //     this.baseid = nextProps.bases[0].id;
        //
        //     if (this.genid)
        //         this.loadClasses(1, '', '', nextProps.bases[0].id, this.genid);
        // }
        if (nextProps.selectedBaseId !== this.props.selectedBaseId) {
            this.loadClasses(1, this.state.query, '', nextProps.selectedBaseId, this.state.selectGenId);
            this.setState({selectedBaseId: nextProps.selectedBaseId});
        }
    }

    loadClasses(page = 1, query = '', teacherid, baseid, genid) {
        this.setState({page});
        this.props.attendanceActions.loadClasses(query, page, teacherid, baseid === 0 ? '' : baseid, genid);
    }

    classesSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.loadClasses(1, value, '', this.state.selectBaseId, this.state.selectGenId);
        }.bind(this), 500);
    }

    openModalLesson(index) {
        this.setState({
            showModalLesson: true,
            selectedClass: this.props.data.classes[index]
        });
        this.props.attendanceActions.loadClassLessonModal(this.props.data.classes[index].id);
    }

    closeModalLesson() {
        this.setState({showModalLesson: false});
    }

    openModalDetailLesson(id) {
        this.setState({
            showModalDetailLesson: true,
            selectedLessonId: id
        });
        this.props.attendanceActions.loadLessonDetailModal(this.state.selectedClass.id, id);
    }

    closeModalDetailLesson() {
        this.setState({showModalDetailLesson: false});
        this.props.attendanceActions.loadClassLessonModal(this.state.selectedClass.id);
    }

    takeAttendance(classid, lessonid, studentid, index) {

        if (!this.props.isTakingAttendance) {
            this.props.attendanceActions.takeAttendance(classid, lessonid, studentid, index);
        }
    }

    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        return [{
            key: 0,
            value: 'Tất cả'
        }, ...baseData];
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        this.loadClasses(1, this.state.query, '', value, this.state.selectGenId);
    }

    onChangeGen(value) {
        this.setState({selectGenId: value});
        this.loadClasses(1, this.state.query, '', this.state.selectBaseId, value);
    }

    render() {
        return (

            <div className="container-fluid">
                <div>
                    {this.props.isLoadingBases || this.props.isLoadingGens
                        ?
                        <Loading/>
                        :

                        <div>
                            <div className="card" mask="purple">
                                <img className="img-absolute"/>

                                <div className="card-content">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="flex-row flex">
                                                <h2 className="card-title">
                                                    <strong>Điểm danh</strong>
                                                </h2>
                                            </div>
                                            <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                                <Search
                                                    onChange={this.classesSearchChange}
                                                    value={this.state.query}
                                                    placeholder="Tìm kiếm lớp học"
                                                    className="round-white-seacrh"
                                                />
                                                <Select
                                                    options={this.state.gens}
                                                    onChange={this.onChangeGen}
                                                    value={this.state.selectGenId}
                                                    defaultMessage="Chọn khóa học"
                                                    name="gens"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{marginTop: 15}}>

                                {this.props.isLoading || this.props.isLoadingGens ? <Loading/> :
                                    <div>
                                        <ListClassComponent
                                            classes={this.props.data.classes}
                                            isLoading={this.props.isLoading}
                                            searchByTeacher={this.loadClasses}
                                            openModalLesson={this.openModalLesson}
                                        />
                                        <div className="row">
                                            <div style={{textAlign: 'right'}}>
                                                <div className="card-content">

                                                    <br/>
                                                    <div className="row">
                                                        <div
                                                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                                            style={{textAlign: 'right'}}>
                                                            <b style={{marginRight: '15px'}}>
                                                                Hiển thị kêt quả
                                                                từ {this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0}
                                                                - {this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount}/{this.props.totalCount}</b><br/>
                                                            <ul className="pagination pagination-primary">
                                                                <li className={(this.props.currentPage === 1) ? 'disabled' : ''}>
                                                                    <a onClick={() => {
                                                                        if (this.props.currentPage !== 1) this.loadClasses(1, this.state.query, '', this.state.selectBaseId, this.state.selectGenId);
                                                                    }}> Đầu</a>
                                                                </li>
                                                                <li className={(this.props.currentPage - 1 <= 0) ? 'disabled' : ''}>
                                                                    <a
                                                                        onClick={() => {
                                                                            if (this.props.currentPage - 1 > 0)
                                                                                this.loadClasses(this.state.page - 1, this.state.query, '', this.state.selectBaseId, this.state.selectGenId);
                                                                        }}> Trước</a>
                                                                </li>
                                                                {_.range(1, (this.props.data.paginator ? this.props.data.paginator.total_pages : 0) + 1).map(page => {
                                                                    if (Number(this.state.page) === page) {
                                                                        return (
                                                                            <li key={page}
                                                                                className="active">
                                                                                <a onClick={() => this.loadClasses(page, this.state.query, '', this.state.selectBaseId, this.state.selectGenId)}>
                                                                                    {page}
                                                                                </a>
                                                                            </li>
                                                                        );
                                                                    } else {
                                                                        return (
                                                                            <li key={page}>
                                                                                <a onClick={() => this.loadClasses(page, this.state.query, '', this.state.selectBaseId, this.state.selectGenId)}>
                                                                                    {page}
                                                                                </a>
                                                                            </li>
                                                                        );
                                                                    }

                                                                })}
                                                                <li className={(this.props.currentPage + 1 > this.props.totalPages) ? 'disabled' : ''}>
                                                                    <a onClick={() => {
                                                                        if (this.props.currentPage + 1 <= this.props.totalPages)
                                                                            this.loadClasses(this.props.currentPage + 1, this.state.query, '', this.state.selectBaseId, this.state.selectGenId);
                                                                    }}>Tiếp </a>
                                                                </li>
                                                                <li className={((this.props.currentPage === this.props.totalPages)) ? 'disabled' : ''}>
                                                                    <a onClick={() => {
                                                                        if (this.props.currentPage !== this.props.totalPages)
                                                                            this.loadClasses(this.props.totalPages, this.state.query, '', this.state.selectBaseId, this.state.selectGenId);
                                                                    }}>Cuối </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>

            </div>


        );
    }

}

/**/

AttendanceContainer.propTypes = {
    isLoading: PropTypes.bool,
    isLoadingGens: PropTypes.bool,
    isLoadingBases: PropTypes.bool,
    isTakingAttendance: PropTypes.bool,
    isLoadingLessonClassModal: PropTypes.bool,
    isLoadingLessonDetailModal: PropTypes.bool,
    data: PropTypes.object,
    attendanceActions: PropTypes.object,
    currentGen: PropTypes.object,
    class: PropTypes.array,
    lesson: PropTypes.array,
    gens: PropTypes.array,
    bases: PropTypes.array,
    loadGensData: PropTypes.func,
    loadBasesData: PropTypes.func,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.attendance.isLoading,
        isLoadingGens: state.attendance.isLoadingGens,
        isLoadingBases: state.attendance.isLoadingBases,
        isTakingAttendance: state.attendance.isTakingAttendance,
        isLoadingLessonClassModal: state.attendance.isLoadingLessonClassModal,
        isLoadingLessonDetailModal: state.attendance.isLoadingLessonDetailModal,
        data: state.attendance.data,
        currentGen: state.attendance.currentGen,
        class: state.attendance.class,
        lesson: state.attendance.lesson,
        gens: state.attendance.gens,
        bases: state.attendance.bases,
        currentPage: state.attendance.currentPage,
        totalPages: state.attendance.totalPages,
        totalCount: state.attendance.totalCount,
        limit: state.attendance.limit,
        selectedBaseId: state.global.selectedBaseId,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceContainer);
