import React from 'react';
import * as classActions from "../../classActions";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as attendanceActions from "../../../attendance/attendanceActions";
import {Modal} from 'react-bootstrap';
import FormInputText from "../../../../components/common/FormInputText";
import {inputExamScore} from "../../classApi";
import {showErrorNotification, showNotification, showWarningNotification} from "../../../../helpers/helper";
import Loading from "../../../../components/common/Loading";

class ScoreClassContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.classId = this.props.params.classId;
        this.initState = {
            show: [],
            dataScores: [],
            currentGroup: {},
            currentExam: {},
            currentRegisters: [],
            showModalInputScore: false,
            showModalScore: false,
            isTotalScore: false,
            isSavingScore: false,
        };
        this.state = this.initState;
        this.noGroup = {name: 'Không có nhóm'};
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();

    }

    openModalScore = (currentGroup) => {
        let dataScores = [];
        this.setState({showModalScore: true, currentGroup, dataScores});

    };
    closeModalScore = () => {
        this.setState({showModalScore: false});
    };

    openModalInputScore = (currentExam) => {
        let currentRegisters = [...this.props.classData.registers].map(register => {
            let res = {...register};
            let examRegister = register.exam_register.filter(e => e && e.exam_id == currentExam.id)[0];
            if (examRegister) {
                res.score = examRegister.score;
                res.comment = examRegister.comment;
            } else {
                res.score = 0;
                res.comment = '';
            }
            return res;
        });

        this.setState({showModalInputScore: true, currentExam, currentRegisters});
    };
    closeModalInputScore = () => {
        this.setState({showModalInputScore: false});

    };


    render() {
        let {classData, isLoading} = this.props;
        let {currentExam, currentRegisters, isSavingScore, currentGroup, isTotalScore} = this.state;
        console.log(currentGroup);
        let noGroup = classData.exams.filter(e => !e.group_exam_id);

        return (
            <div>

                {(!isLoading) && classData.group_exams.map((group, key1) => {
                    return (
                        <div key={key1} className="table-responsive table-split margin-bottom-20">
                            <div className="margintop-10 margin-bottom-10"><strong>{group.name}</strong></div>
                            <table className="table" cellSpacing="0" id="list_register">
                                <tbody>
                                {
                                    classData.exams.map((exam, key2) => {
                                        let className = exam.is_taken ? 'success' : '';
                                        let classNameBtn = 'btn radius-8 margin-right-10' + (exam.is_taken ? ' btn-white' : ' btn-grey');
                                        return (exam.group_exam_id == group.id) ? (

                                            <tr key={key2} className={className}>
                                                <td style={{width: '10%'}}>
                                                    <b className="cursor-pointer" data-toggle="tooltip"
                                                       title="Xem điểm">{exam.title}</b>
                                                </td>
                                                <td style={{width: '15%'}}>

                                                    {exam.lesson && exam.lesson.name}
                                                </td>
                                                <td style={{width: '15%'}}>
                                                    {exam.description}
                                                </td>
                                                <td>
                                                    Hệ số {exam.weight}
                                                </td>
                                                <td style={{width: '15%'}}>
                                                    <div className="flex flex-align-items-center  float-right">

                                                        <button className={classNameBtn}
                                                                onClick={() => this.openModalInputScore(exam)}>
                                                            Nhập điểm
                                                        </button>
                                                        <div onClick={() => this.openModalScore(group)}
                                                             className="cursor-pointer" data-toggle="tooltip"
                                                             title="Xem điểm">
                                                            <i className="material-icons">
                                                                remove_red_eye
                                                            </i>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>

                                        ) : (null);
                                    })}
                                </tbody>
                            </table>
                        </div>
                    );
                })}
                {!isLoading && <div className="table-responsive table-split margin-bottom-20">
                    <div className="margintop-10 margin-bottom-10"><strong>Không có nhóm</strong></div>
                    <table className="table" cellSpacing="0" id="list_register">
                        <tbody>
                        {
                            classData.exams.map((exam, key2) => {
                                let className = exam.is_taken ? 'success' : '';
                                let classNameBtn = 'btn radius-8  float-right' + (exam.is_taken ? ' btn-white' : ' btn-grey');

                                return (exam.group_exam_id == null) ? (

                                    <tr key={key2} className={className}>
                                        <td style={{width: '10%'}}>
                                            <b>{exam.title}</b>
                                        </td>
                                        <td style={{width: '15%'}}>

                                            {exam.lesson && exam.lesson.name}
                                        </td>
                                        <td style={{width: '15%'}}>
                                            {exam.description}
                                        </td>
                                        <td>
                                            Hệ số {exam.weight}
                                        </td>
                                        <td style={{width: '15%'}}>
                                            <button className={classNameBtn}
                                                    onClick={() => this.openModalInputScore(exam)}>
                                                Nhập điểm
                                            </button>

                                        </td>


                                    </tr>

                                ) : (null);
                            })}
                        </tbody>
                    </table>
                </div>}
                <Modal
                    show={this.state.showModalScore}
                    onHide={this.closeModalScore}
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">XEM ĐIỂM</h4>
                    </Modal.Header>
                    <Modal.Body>
                        {isLoading && <Loading/>}

                        {!isLoading &&
                        <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                            <li className={isTotalScore ? 'active' : ''}>
                                <a onClick={() => this.setState({currentGroup: {}, isTotalScore: true})}>Tất cả</a>
                            </li>
                            {classData.group_exams.map((group, index) => {
                                return (

                                    <li key={index} className={currentGroup.id === group.id ? 'active' : ''}>
                                        <a onClick={() => this.setState({
                                            isTotalScore: false,
                                            currentGroup: group
                                        })}>{group.name}</a>
                                    </li>
                                );
                            })}
                            <li className={(!isTotalScore && !currentGroup.id) ? 'active' : ''}>
                                <a onClick={() => this.setState({isTotalScore: false, currentGroup: this.noGroup})}>Không
                                    có nhóm</a>
                            </li>
                        </ul>}
                        {!isLoading && isTotalScore &&
                        <div className="table-responsive table-no-border">
                            <table className="table" cellSpacing="0" id="list_score">
                                <tbody>
                                <tr>
                                    <td/>
                                    {classData.group_exams.map((group, index) => {
                                        let exams = classData.exams.filter(e => e.group_exam_id == group.id);
                                        return (

                                            <td key={index} colSpan={exams.length}>
                                                <a className="btn btn-grey width-100 radius-8"
                                                   onClick={() => this.setState({
                                                       isTotalScore: false,
                                                       currentGroup: group
                                                   })}>{group.name} ({exams.length})</a>
                                            </td>
                                        );
                                    })}
                                    <td colSpan={noGroup.length}>
                                        <a className="btn btn-grey width-100 radius-8"
                                           onClick={() => this.setState({
                                               isTotalScore: false,
                                               currentGroup: this.noGroup
                                           })}>{this.noGroup.name} ({noGroup.length})</a>
                                    </td>
                                    <td>
                                        <a className="btn btn-grey width-100 radius-8">TỔNG KẾT</a>
                                    </td>

                                </tr>
                                <tr>
                                    <td/>
                                    {classData.group_exams.map((group, index) => {
                                        let exams = classData.exams.filter(e => e.group_exam_id == group.id);

                                        return exams.map((exam, i2) => {
                                            return (
                                                <td key={i2} className="text-center">
                                                    <div><b>{exam.title} ({exam.weight})</b></div>
                                                </td>
                                            );
                                        });

                                    })}
                                    {
                                        noGroup.map((exam, i2) => {
                                            return (
                                                <td key={i2} className="text-center">
                                                    <div><b>{exam.title} ({exam.weight})</b></div>
                                                </td>
                                            );
                                        })

                                    }
                                    <td/>
                                </tr>
                                {classData.registers.map((register, key) => {
                                    let {student} = register;

                                    let totalWeight = classData.exams.map(e => e.weight).reduce((sum, e) => sum + e);
                                    let sumScore = register.exam_register.map(e => e.score * e.weight).reduce((sum, e) => sum + e);
                                    let totalScore = Math.round(sumScore / totalWeight * 10) / 10;
                                    return (
                                        <tr key={key}>
                                            <td>
                                                <div className="flex flex-align-items-center">
                                                    <div className="avatar-list-staff"
                                                         style={{
                                                             background: 'url(' + student.avatar_url + ') center center / cover',
                                                             display: 'inline-block', marginRight: 10
                                                         }}
                                                    />
                                                    <div><b>{student.name}</b></div>
                                                </div>
                                            </td>
                                            {classData.group_exams.map((group) => {
                                                let exams = classData.exams.filter(e => e.group_exam_id == group.id);
                                                return exams.map((exam, i2) => {
                                                    let score = register.exam_register.filter(er => er.user_id == student.id && er.exam_id == exam.id)[0];
                                                    if (!score) score = {score: 0};
                                                    return (
                                                        <td key={i2} className="text-center">
                                                            <div>{score.score}</div>
                                                        </td>
                                                    );
                                                });

                                            })}
                                            {noGroup.map((exam, i2) => {
                                                let score = register.exam_register.filter(er => er.user_id == student.id && er.exam_id == exam.id)[0];
                                                if (!score) score = {score: '-'};
                                                return (
                                                    <td key={i2} className="text-center">
                                                        <div>{score.score}</div>
                                                    </td>
                                                );
                                            })}

                                            <td className="text-center">{totalScore}</td>

                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        }
                        {!isLoading && !isTotalScore &&
                        <div className="table-responsive table-no-border">
                            <table className="table" cellSpacing="0" id="list_score">
                                <tbody>
                                <td/>
                                {classData.exams.filter(e => e.group_exam_id == currentGroup.id).map((exam, i2) => {

                                    return (
                                        <td key={i2} className="">
                                            <b>{exam.title}</b>
                                        </td>
                                    );
                                })}

                                {classData.registers.map((register, key) => {
                                    let {student} = register;
                                    let exams = classData.exams.filter(e => e.group_exam_id == currentGroup.id);
                                    return (
                                        <tr key={key}>
                                            <td>
                                                <div className="flex flex-align-items-center">
                                                    <div className="avatar-list-staff"
                                                         style={{
                                                             background: 'url(' + student.avatar_url + ') center center / cover',
                                                             display: 'inline-block', marginRight: 10
                                                         }}
                                                    />
                                                    <div><b>{student.name}</b></div>
                                                </div>
                                            </td>
                                            {exams.map((exam, i2) => {
                                                let score = register.exam_register.filter(er => er.user_id == student.id && er.exam_id == exam.id)[0];
                                                if (!score) score = {score: 0};
                                                return (
                                                    <td key={i2} className="">
                                                        <div className="flex flex-align-items-center">
                                                            <div className="min-width-40-px margin-right-10"><b>{score.score}</b></div>
                                                            <div className="text-dark">{score.comment || 'Không có nhận xét'}</div>
                                                        </div>
                                                    </td>
                                                );
                                            })}


                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        }

                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.state.showModalInputScore}
                    onHide={this.closeModalInputScore}
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        <h4 className="modal-title text-center">NHẬP ĐIỂM</h4>
                        <div
                            className="text-center">{`${currentExam.title}${currentExam.description ? (' - ' + currentExam.description) : ''} - Hệ số ${currentExam.weight}`}</div>
                    </Modal.Header>
                    <Modal.Body>
                        {isSavingScore && <Loading/>}
                        {!isSavingScore &&
                        <div className="table-responsive table-split table-narrow ">
                            <table className="table" cellSpacing="0" id="list_register">
                                <tbody>
                                {currentRegisters.map((register, key) => {
                                    let {student} = register;
                                    return (
                                        <tr key={key}>
                                            <td>
                                                <div className="flex flex-align-items-center">
                                                    <div className="avatar-list-staff"
                                                         style={{
                                                             background: 'url(' + student.avatar_url + ') center center / cover',
                                                             display: 'inline-block', marginRight: 10
                                                         }}
                                                    />
                                                    <div><b>{student.name}</b></div>

                                                </div>
                                            </td>
                                            <td style={{width: 120}}>

                                                <FormInputText name="score"
                                                               value={register.score || 0}
                                                               placeholder="Điểm"
                                                               type="number"
                                                               minValue={0}
                                                               maxValue={10}
                                                               className="exam-input"
                                                               isNotValid={register.score < 0 || register.score > 10}
                                                               updateFormData={(e) => this.updateFormInputScore(e, key)}
                                                />
                                            </td>
                                            <td>
                                                <FormInputText name="comment"
                                                               value={register.comment || ''}
                                                               placeholder="Nhận xét"
                                                               type="text"
                                                               className="exam-input"
                                                               updateFormData={(e) => this.updateFormInputScore(e, key)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                        }
                        {!isSavingScore && <div className="flex flex-align-items-center flex-end">
                            <div className="btn btn-white radius-8" onClick={this.closeModalInputScore}>
                                Hủy
                            </div>
                            <div className="btn btn-success radius-8" onClick={this.submitScoreExam}>
                                Hoàn tất
                            </div>
                        </div>}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    updateFormInputScore = (e, key) => {
        let {name, value} = e.target;
        let {currentRegisters} = this.state;
        console.log(name, value, currentRegisters[key]);
        currentRegisters[key][name] = value;

        this.setState({currentRegisters});

    };
    submitScoreExam = () => {
        let {classData} = this.props;
        let {currentExam, currentRegisters} = this.state;
        let scores = currentRegisters.map((obj) => {
            return {
                user_id: obj.student.id,
                comment: obj.comment || '',
                score: obj.score || 0,
                // score: obj.score || Math.floor(Math.random() * 10) + 1,
                // comment: obj.comment || ('Day la comment: ' + Math.floor(Math.random() * 10) + 1),
            };
        });
        let errs = [];
        scores.every(obj => {
            let {score} = obj;
            if (!score || score < 0 || score > 10) {
                errs.push('Thang điểm từ 0->10!');
                return;
            }
        });
        errs.forEach(e => showErrorNotification(e));
        if (!errs.length) {
            showWarningNotification('Đang lưu điểm...');
            this.setState({isSavingScore: true});
            inputExamScore(classData.id, currentExam.id, {scores})
                .then((res) => {
                    console.log(res);
                    showNotification('Lưu thành công!');
                    this.setState({isSavingScore: false, showModalInputScore: false});
                }).catch(e => {
                console.log(e);
                this.setState({isSavingScore: false});
                showErrorNotification('Có lỗi xảy ra!');
            });
        }

    };
}

function mapStateToProps(state) {
    return {
        classData: state.classes.class,
        isLoading: state.classes.isLoading,
        user: state.login.user,
        lesson: state.attendance.lesson,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch),
        classActions: bindActionCreators(classActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreClassContainer);
