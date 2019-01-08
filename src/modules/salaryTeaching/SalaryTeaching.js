import React from "react";
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import {dotNumber, formatPhone, validateLinkImage} from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";

@observer
class SalaryTeaching extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.store.loadSalaryTeaching();
    }

    renderItem = (data) => {
        const level = data.user.salary_level ? data.user.salary_level : {};
        const total_salary = (level.teacher_salary * data.total_attendance_teacher || 0)
            + (level.ta_salary * data.total_attendance_ta || 0) + data.user.salary + (data.bonus || 0);
        console.log(total_salary);
        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="flex flex-row">
                                <div className="circle-avatar" style={{
                                    background: 'url(' + validateLinkImage(data.user.avatar_url) + ') center center / cover',
                                    width: '60px',
                                    height: '60px'
                                }}
                                />
                                <div className="margin-left-20" style={{flex: 1}}>
                                    <div className="bold">
                                        {data.user.name}
                                    </div>
                                    <div className="category">
                                        {formatPhone(data.user.phone)}
                                    </div>
                                    <button className="btn btn-xs btn-round btn-success"
                                    >
                                        Bậc {level.level}
                                    </button>
                                    <div className="card-footer" style={{margin: 0, marginTop: 23}}>
                                        <div className="flex flex-row flex-space-between">
                                            <div className="bold">Lương cứng</div>
                                            <div>{dotNumber(data.user.salary)}đ</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-3">
                            <div className="bold">
                                Số buổi giảng viên
                            </div>
                            <div className="flex flex flex-space-between">
                                <div>{data.total_attendance_teacher}/{data.total_lesson_teacher}</div>
                                <div className="bold">Xem chi tiết</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: data.total_attendance_teacher * 100 / data.total_lesson_teacher + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                            <br/>
                            <div>
                                <div className="flex flex flex-space-between">
                                    <div>{data.total_attendance_teacher}</div>
                                    <div>x{dotNumber(level.teacher_salary)}đ</div>
                                </div>
                            </div>
                            <div className="card-footer" style={{margin: 0}}>
                                <div className="flex flex flex-space-between">
                                    <div>+</div>
                                    <div
                                        className="bold">{dotNumber(level.teacher_salary * data.total_attendance_teacher)}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="bold">
                                Số buổi trợ giảng
                            </div>
                            <div className="flex flex flex-space-between">
                                <div>{data.total_attendance_ta}/{data.total_lesson_ta}</div>
                                <div className="bold">Xem chi tiết</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: data.total_attendance_ta * 100 / data.total_lesson_ta + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                            <br/>
                            <div>
                                <div className="flex flex flex-space-between">
                                    <div>{data.total_attendance_ta}</div>
                                    <div>x{dotNumber(level.ta_salary)}đ</div>
                                </div>
                                <div className="card-footer" style={{margin: 0}}>
                                    <div className="flex flex flex-space-between">
                                        <div>+</div>
                                        <div
                                            className="bold">{dotNumber(level.ta_salary * data.total_attendance_ta)}đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="bold">
                                Tính lương
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương cứng</div>
                                <div>{dotNumber(data.user.salary)}đ</div>
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương giảng viên</div>
                                <div>{dotNumber(level.teacher_salary * data.total_attendance_teacher)}đ</div>
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương trợ giảng</div>
                                <div>{dotNumber(level.ta_salary * data.total_attendance_ta)}đ</div>
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương thưởng
                                    {
                                        data.teaching_salary_id &&
                                        <TooltipButton text="Thêm thưởng" placement="top">
                                            <button className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                    type="button" data-toggle="dropdown"
                                                    onClick={() => this.props.openModalAddSalaryBonus(data.teaching_salary_id)}
                                            >
                                                <strong>+</strong>
                                            </button>
                                        </TooltipButton>
                                    }
                                </div>
                                <div className="bold cursor-pointer"
                                     onClick={() => this.props.openModalDetailSalaryBonus(data.teaching_salary_id)}>{dotNumber(data.bonus)}đ
                                </div>
                            </div>

                            <div className="card-footer" style={{margin: 0, marginTop: 3}}>
                                <div className="flex flex flex-space-between">
                                    <div>=</div>
                                    <div
                                        className="bold">{dotNumber(total_salary)}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    render() {

        if (!this.props.store.isLoading) {
            console.log(this.props.store.getData);
        }
        return (
            <div>
                {
                    this.props.store.isLoading ? <Loading/> :
                        <div>
                            {
                                this.props.store.getData.map((item) => {
                                        return this.renderItem(item);
                                    }
                                )}
                        </div>
                }
            </div>

        );
    }
}

SalaryTeaching.propTypes = {};

export default SalaryTeaching;

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
