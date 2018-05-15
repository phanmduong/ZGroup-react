import React from 'react';
import Loading from '../../components/common/Loading';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as    attendanceActions from '../attendance/attendanceActions';
import * as helper from '../../helpers/helper';
import TooltipButton from '../../components/common/TooltipButton';
import LessonDetailModal from './LessonDetailModal';
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL } from '../../constants/constants';

class ListLessonContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedClass: '',
            showModalDetailLesson: false,
            selectedLessonId: 0,
            note: [],
            modalData: [],
            store: [],
        };

        this.openModalDetailLesson = this.openModalDetailLesson.bind(this);
        this.closeModalDetailLesson = this.closeModalDetailLesson.bind(this);
        this.updateModalData = this.updateModalData.bind(this);
        this.commitModalData = this.commitModalData.bind(this);
        this.commitSuccess = this.commitSuccess.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.reloadAndExport = this.reloadAndExport.bind(this);
    }

    componentWillMount() {
        this.props.attendanceActions.loadClassLessonModal(this.props.params.classId);
        this.props.attendanceActions.loadClassInfo(this.props.params.classId);
    }

    openModalDetailLesson(id) {
        this.setState({
            showModalDetailLesson: true,
            selectedLessonId: id
        });
        this.props.attendanceActions.loadLessonDetailModal(this.props.params.classId, id);
    }

    updateModalData(index, value, name) {
        this.props.attendanceActions.updateModalData(index, value, name);
    }

    closeModalDetailLesson() {
        this.setState({ showModalDetailLesson: false });
    }

    commitModalData(data, commitSuccess) {

        this.props.attendanceActions.takeAttendance(data, commitSuccess);
    }

    commitSuccess() {
        helper.showNotification("Lưu thành công!");
        this.setState({ showModalDetailLesson: false });
        this.props.attendanceActions.loadClassLessonModal(this.props.params.classId);
    }

    exportExcel() {
        let wb = helper.newWorkBook();
        let data;
        let cols = [{ "wch": 5 }, { "wch": 22 }, { "wch": 10 }, { "wch": 10 }, { "wch": 20 }, { "wch": 12 }, { "wch": 30 }, { "wch": 16 }, { "wch": 30 }, { "wch": 25 },];//độ rộng cột
        let colname = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'];//danh sách cột cmt
        let cmts = [];// danh sách cmts
        //begin điểm danh
        data = this.props.selectedClass.registers.filter(item => (item.paid_status)).map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            /* eslint-disable */
            let res = {
                'STT': index + 1,
                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            item.attendances.forEach((obj, index2) => {
                res = { ...res, [`Buổi ${index2 + 1}`]: ((obj.status === 1) ? 'X' : '') };
                if (!helper.isEmptyInput(obj.note))
                    cmts = [...cmts, { cell: colname[index2] + (index + 2), note: obj.note }];
            });
            /* eslint-enable */
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Điểm danh', cols, cmts);
        //end điểm danh

        //begin bài tập
        data = this.props.selectedClass.registers.filter(item => (item.paid_status)).map((item, index) => {
            let dob = item.student.dob;
            let isValidDate = moment(dob, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
            if (isValidDate)
                dob = moment(item.student.dob, [DATETIME_FILE_NAME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FILE_NAME_FORMAT);
            else dob = '';
            /* eslint-disable */
            let res = {
                'STT': index + 1,
                'Họ và tên': item.student.name,
                'Mã học viên': item.code,
                'Ngày sinh': dob,
                'Tình trạng học phí': item.paid_status ? 'Đã nộp' : 'Chưa nộp',
                'Thẻ học viên': item.received_id_card ? 'Đã nhận' : 'Chưa nhận',
                'Email': item.student.email,
                'Phone': item.student.phone,
                'Facebook': item.student.facebook,
                'Trường ĐH': item.student.university,
            };
            item.attendances.forEach((obj, index2) => {
                res = { ...res, [`Buổi ${index2 + 1}`]: ((obj['homework_status'] === 1) ? 'X' : '') };
            });
            return res;
            /* eslint-enable */
        });
        helper.appendJsonToWorkBook(data, wb, 'Bài tập', cols, cmts);
        //end bài tập

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách điểm danh lớp ' + this.props.selectedClass.name);

    }

    reloadAndExport() {
        this.props.attendanceActions.loadClassInfo(this.props.params.classId, this.exportExcel);
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <LessonDetailModal
                        show={this.state.showModalDetailLesson}
                        onHide={this.closeModalDetailLesson}
                        class={this.props.selectedClass}
                        list={this.props.lesson}
                        isLoadingLessonDetailModal={this.props.isLoadingLessonDetailModal}
                        updateData={this.updateModalData}
                        commitData={this.commitModalData}
                        isCommitting={this.props.isTakingAttendance}
                        index={this.state.selectedLessonId}
                        commitSuccess={this.commitSuccess}
                    />
                    {this.props.isLoadingLessonClassModal ?
                        <Loading />
                        :
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <h4 className="card-title">
                                            <strong>{"Danh sách buổi học lớp " + this.props.selectedClass.name}</strong>
                                        </h4>
                                        <TooltipButton text="Xuất file điểm danh" placement="top">
                                            <button
                                                onClick={this.props.isLoadingLessonClassModal ? () => { } : this.reloadAndExport}
                                                className="btn btn-rose none-margin button-round"
                                                disabled={this.props.isLoadingLessonClassModal || this.props.isLoading}
                                            >
                                                <i className="material-icons">file_download</i>
                                            </button>
                                        </TooltipButton>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-sm-3">{
                                            this.props.selectedClass.teacher ?
                                                (
                                                    <TooltipButton text="Giảng viên"
                                                        placement="top"
                                                    >
                                                        <button className="btn btn-sm"
                                                            style={{
                                                                backgroundColor: '#' + this.props.selectedClass.teacher.color,
                                                                inlineSize: "-webkit-fill-available"
                                                            }}>
                                                            {helper.getShortName(this.props.selectedClass.teacher.name)}
                                                            <div className="ripple-container" />
                                                        </button>
                                                    </TooltipButton>
                                                )
                                                :
                                                (
                                                    <div className="btn btn-sm"
                                                        style={{ inlineSize: "-webkit-fill-available" }}>
                                                        Không có giảng viên
                                                        </div>
                                                )

                                        }</div>

                                        <div className="col-sm-3">{
                                            this.props.selectedClass.teacher_assistant ?
                                                (
                                                    <TooltipButton text="Trợ giảng"
                                                        placement="top">
                                                        <button className="btn btn-sm"
                                                            style={{
                                                                backgroundColor: '#' + this.props.selectedClass.teacher_assistant.color,
                                                                inlineSize: "-webkit-fill-available"
                                                            }}>
                                                            {helper.getShortName(this.props.selectedClass.teacher_assistant.name)}
                                                            <div className="ripple-container" />
                                                        </button>
                                                    </TooltipButton>
                                                )
                                                :
                                                (
                                                    <div className="btn btn-sm"
                                                        style={{ inlineSize: "-webkit-fill-available" }}>
                                                        Không có trợ giảng
                                                        </div>
                                                )

                                        }</div>
                                        <div className="col-sm-4" />
                                        <div className="col-sm-1" style={{ marginTop: 12 }} />
                                    </div>

                                    {
                                        this.props.isLoadingLessonClassModal ?
                                            <Loading />
                                            :
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="text-rose">
                                                        <tr>
                                                            <th>Thứ tự</th>
                                                            <th style={{ textAlign: "center" }}>Tình trạng điểm danh</th>
                                                            <th />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.props.class.map((item) => {
                                                            return (
                                                                <tr key={item.order}>
                                                                    <td><h6>
                                                                        <strong>Buổi {item.order} </strong>
                                                                    </h6></td>
                                                                    <td width="65%" style={{ textAlign: "center" }}>
                                                                        <h6>{item['attended_students'] + "/" + item['total_students']}</h6>
                                                                        <div
                                                                            className="progress progress-line-success progress-bar-table"
                                                                            style={{ width: "100%" }}>
                                                                            <div className="progress-bar progress-bar-success"
                                                                                role="progressbar"
                                                                                aria-valuenow="60"
                                                                                aria-valuemin="0"
                                                                                aria-valuemax="100"
                                                                                style={{ width: item['attended_students'] * 100 / item['total_students'] + '%' }}>
                                                                                <span
                                                                                    className="sr-only">{item['attended_students'] * 100 / item['total_students']}%</span>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td style={{ textAlign: "right" }}>
                                                                        <TooltipButton text="Điểm danh" placement="top">
                                                                            <button className="btn btn-rose none-margin button-round" style={{ display: '-webkit-inline-box' }}
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    return this.openModalDetailLesson(item.id);
                                                                                }}
                                                                            ><i className="material-icons" style={{ left: 1 }}>how_to_reg</i>
                                                                            </button>
                                                                        </TooltipButton>

                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

ListLessonContainer.propTypes = {
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
    selectedClass: PropTypes.object,
    params: PropTypes.object,
    loadClassLessonModal: PropTypes.func,
    loadClassInfo: PropTypes.func,
    loadLessonDetailModal: PropTypes.func,
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
        selectedClass: state.attendance.selectedClass,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListLessonContainer);
