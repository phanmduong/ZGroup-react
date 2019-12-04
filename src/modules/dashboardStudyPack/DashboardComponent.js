import React from "react";
import Loading from "../../components/common/Loading";
import * as helper from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";
import {Link} from "react-router";
import Barchart from "./Barchart";
import ListClass from "./ListClass";
import PropTypes from "prop-types";
import _ from "lodash";
import RegisterStudyPack from "./StudyPackRegister";
import {Modal} from "react-bootstrap";
import {validateLinkImage} from "../../helpers/helper";
import {NO_AVATAR} from "../../constants/env";

class DashboardComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            modalDetailTotalRegister: false
        };
    }

    componentWillMount() {
        this.props.loadDashboard();
    }

    convertData(arr) {
        let data = arr.map(function (obj) {
            return {
                ...obj,
                value: obj.id,
                label: obj.name
            };
        });

        return [{
            value: '',
            label: 'Tất cả'
        }, ...data];
    }

    getCourse(courses, course_id) {
        return courses.filter((course) => course.id == course_id)[0];
    }

    openModalDetailTotalRegisterByGen = (total) => {
        this.setState({modalDetailTotalRegister: true});
        this.props.detailTotalRegisterByGen(total);
    }

    openModalDetailTotalRegisterByCourse = (courseId) => {
        this.setState({modalDetailTotalRegister: true});
        this.props.detailTotalRegisterByCourse(courseId);
    }

    closeModalDetailTotalRegister = () => {
        this.setState({modalDetailTotalRegister: false});
    }


    render() {
        if (this.props.isLoading) {
            return <Loading/>;
        } else {
            let {
                total_money,
                target_revenue,
                register_number,
                paid_number,
                zero_paid_number,
                registers_by_date,
                date_array,
                paid_by_date,
                money_by_date,
                classes,
                total_registers_by_gen,
                total_registers_by_course,
                courses
            } = this.props.dashboard;
            const max_total_registers_by_gen = _.maxBy(total_registers_by_gen, (item) => parseInt(item.total_registers));
            const max_total_registers_by_course = _.maxBy(total_registers_by_course, (item) => parseInt(item.total));
            if (this.props.dashboard) {
                return (
                    <div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Doanh thu</p>
                                        <h3 className="card-title">
                                            {helper.convertDotMoneyToK(helper.dotNumber(total_money))}/{helper.convertDotMoneyToK(
                                            helper.dotNumber(target_revenue)
                                        )}
                                        </h3>
                                        <TooltipButton
                                            placement="top"
                                            text={Math.round(total_money * 100 / target_revenue) + "%"}>
                                            <div className="progress progress-line-primary">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: total_money * 100 / target_revenue + "%"
                                                    }}
                                                />
                                            </div>
                                        </TooltipButton>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">timeline</i>
                                            <Link to="#money-by-date">Chi tiết</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Đã đóng tiền</p>
                                        <h3 className="card-title">
                                            {paid_number}/{register_number}
                                        </h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton
                                                placement="top"
                                                text={`${paid_number} học viên đã nộp tiền`}>
                                                <div
                                                    className="progress-bar progress-bar-success"
                                                    style={{
                                                        width: paid_number * 100 / register_number + "%"
                                                    }}
                                                />
                                            </TooltipButton>
                                            <TooltipButton
                                                placement="top"
                                                text={`${zero_paid_number} học viên nộp 0 đồng`}>
                                                <div
                                                    className="progress-bar progress-bar-warning"
                                                    style={{
                                                        width: zero_paid_number * 100 / register_number + "%"
                                                    }}
                                                />
                                            </TooltipButton>
                                            <TooltipButton
                                                placement="top"
                                                text={`${register_number -
                                                zero_paid_number -
                                                paid_number} chưa nộp tiền`}>
                                                <div
                                                    className="progress progress-line-danger"
                                                    style={{
                                                        width:
                                                            (register_number -
                                                                zero_paid_number -
                                                                paid_number) *
                                                            100 /
                                                            register_number +
                                                            "%"
                                                    }}
                                                />
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a href="/finance/paidlist">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}
                            {/*<div className="card card-stats">*/}
                            {/*<div className="card-content text-align-left">*/}
                            {/*<p className="category">Số lớp còn lại</p>*/}
                            {/*<h3 className="card-title">{total_classes}</h3>*/}
                            {/*<div className="progress progress-line-danger">*/}
                            {/*{courses.map((course, index) => {*/}
                            {/*return (*/}
                            {/*<TooltipButton*/}
                            {/*placement="top"*/}
                            {/*key={index}*/}
                            {/*text={`${course.name}: ${course.total_classes} lớp`}>*/}
                            {/*<div*/}
                            {/*className="progress-bar"*/}
                            {/*style={{*/}
                            {/*width:*/}
                            {/*course.total_classes **/}
                            {/*100 /*/}
                            {/*total_classes +*/}
                            {/*"%",*/}
                            {/*background: course.color*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*</TooltipButton>*/}
                            {/*);*/}
                            {/*})}*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="card-footer">*/}
                            {/*<div className="stats">*/}
                            {/*<i className="material-icons">list</i>*/}
                            {/*<a href="#list-class">Chi tiết</a>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="col-lg-3 col-md-6 col-sm-6">*/}
                            {/*<div className="card card-stats">*/}
                            {/*<div className="card-content text-align-left">*/}
                            {/*<p className="category">Số ngày còn lại</p>*/}
                            {/*<h3 className="card-title">{remain_days}</h3>*/}
                            {/*<div className="progress progress-line-danger">*/}
                            {/*<TooltipButton*/}
                            {/*placement="top"*/}
                            {/*text={`${Math.round(100 - percent_remain_days)}%`}>*/}
                            {/*<div className="progress progress-line-rose">*/}
                            {/*<div*/}
                            {/*className="progress-bar progress-bar-rose"*/}
                            {/*role="progressbar"*/}
                            {/*style={{*/}
                            {/*width: 100 - percent_remain_days + "%"*/}
                            {/*}}*/}
                            {/*/>*/}
                            {/*</div>*/}
                            {/*</TooltipButton>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="card-footer">*/}
                            {/*<div className="stats">*/}
                            {/*<i className="material-icons">update</i> {end_time_gen}*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                            {/*</div>*/}
                        </div>
                        <div className="row" id="register-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title">
                                                <strong>Số lượng đăng kí theo ngày</strong>
                                            </h4>
                                            <br/>
                                            <br/>
                                            <Barchart
                                                label={date_array}
                                                data={[registers_by_date, paid_by_date]}
                                                id="barchar_register_by_date"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="money-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <h4 className="card-title">
                                                <strong>Doanh thu theo ngày</strong>
                                            </h4>
                                            <br/>
                                            <br/>
                                            <Barchart
                                                label={date_array}
                                                data={[money_by_date]}
                                                id="barchar_money_by_date"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="list-class">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <div className="flex flex-row">
                                                <h4 className="card-title">
                                                    <strong>Danh sách lớp</strong>
                                                </h4>
                                            </div>
                                            <ListClass
                                                classes={classes}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <div className="flex flex-row">
                                                <h4 className="card-title">
                                                    <strong>Danh sách học viên</strong>
                                                </h4>
                                            </div>
                                            <RegisterStudyPack
                                                loadStudyPackRegisters={this.props.loadStudyPackRegisters}
                                                courses={courses}
                                                studyPack={this.props.studyPack}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <div className="flex flex-row">
                                                <h4 className="card-title">
                                                    <strong>Tỉ lệ học</strong>
                                                </h4>
                                            </div>
                                            {
                                                total_registers_by_gen && total_registers_by_gen.map((item) => {
                                                    const ratio = item.total_registers * 100 / max_total_registers_by_gen.total_registers;
                                                    return (
                                                        <div
                                                            onClick={() => this.openModalDetailTotalRegisterByGen(item.total)}>
                                                            <div className="flex flex flex-space-between">
                                                                <div className="bold">{item.total} khóa</div>
                                                                <div>
                                                                    {`${item.total_registers} học viên`}
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar"
                                                                     style={{
                                                                         width: ratio + '%',
                                                                         backgroundColor: '#2EBE21'
                                                                     }}/>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-content">
                                        <div className="tab-content">
                                            <div className="flex flex-row">
                                                <h4 className="card-title">
                                                    <strong>Các môn được học</strong>
                                                </h4>
                                            </div>
                                            {
                                                total_registers_by_course && total_registers_by_course.map((item) => {
                                                    const ratio = item.total * 100 / max_total_registers_by_course.total;
                                                    const course = this.getCourse(courses, item.course_id);
                                                    return (
                                                        <div
                                                            className="cursor-pointer"
                                                            onClick={() => this.openModalDetailTotalRegisterByCourse(item.course_id)}>
                                                            <div className="flex flex flex-space-between">
                                                                <div className="bold">{course.name}</div>
                                                                <div>
                                                                    {`${item.total} học viên`}
                                                                </div>
                                                            </div>
                                                            <div className="progress">
                                                                <div className="progress-bar"
                                                                     style={{
                                                                         width: ratio + '%',
                                                                         backgroundColor: course.color ? course.color : '#2EBE21'
                                                                     }}/>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Modal show={this.state.modalDetailTotalRegister}
                               onHide={() => {
                                   this.closeModalDetailTotalRegister();
                               }}>
                            <Modal.Header
                                closeButton
                                closeLabel="Đóng">
                                <Modal.Title>Danh sách học viên</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {this.props.isLoadingUserSP ? <Loading/> :
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="text-rose">
                                            <tr>
                                                <th/>
                                                <th>Tên</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.props.users.map((user) => {
                                                    const avatar = helper.avatarEmpty(user.avatar_url) ?
                                                        NO_AVATAR : user.avatar_url;
                                                    return (
                                                        <tr key={user.id}>
                                                            <td>
                                                                <button
                                                                    className="btn btn-round btn-fab btn-fab-mini text-white"
                                                                    data-toggle="tooltip" title="" type="button"
                                                                    rel="tooltip"
                                                                    data-placement="right"
                                                                    data-original-title={user.name}>
                                                                    <img src={validateLinkImage(avatar)} alt=""/>
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <a href={`/sales/info-student/${user.id}`}
                                                                   target="_blank"
                                                                   className="text-name-student-register">
                                                                    {user.name}
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    );
                                                })

                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </Modal.Body>
                        </Modal>
                    </div>
                );
            } else {
                return <h1>Có lỗi xảy ra</h1>;
            }
        }
    }
}

DashboardComponent.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    dashboard: PropTypes.object.isRequired,
    studyPack: PropTypes.object.isRequired,
    loadDashboard: PropTypes.func.isRequired,
    loadStudyPackRegisters: PropTypes.func.isRequired,
    isLoadingUserSP: PropTypes.bool.isRequired,
    users: PropTypes.array.isRequired,
}
;

export default DashboardComponent;
