import React from "react";
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import {convertMoneyToK,getShortName,  validateLinkImage} from "../../helpers/helper";
import Star from "../../components/common/Star";
import {RATIO_MONEY_REGISTER,RATIO_ATTENDANCE_CLASS}  from "../../constants/constants";
import Tooltip from "react-bootstrap/es/Tooltip";
import {OverlayTrigger} from "react-bootstrap";

@observer
class EvaluateClasses extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.store.loadEvaluate();
    }

    tooltip = (raitoRate,data) =>{
        const toolTip = (
            <Tooltip id="tooltip">{data.rate_total} lượt đánh giá</Tooltip>
        );
        const rated = data.rate_total > 0;
        return (
            <OverlayTrigger placement="top" overlay={toolTip}>
                <div className={"card-footer flex flex-space-between" + (rated ? " cursor-pointer" : "")} onClick={()=>{
                    if(rated) {
                        this.props.store.showModalRating = true;
                        this.props.store.ratingDetail = data;
                    }
                }}>

                    {rated ?
                        `Độ hài lòng: ${raitoRate}/5`
                        :
                        "Chưa có lượt đánh giá"
                    }
                    {rated  > 0 &&<Star maxStar={5} value={raitoRate} disable={true}/>}
                </div>
            </OverlayTrigger>
        );
    }

    renderItem = (data, key) => {
        const successColor = '#2EBE21';        const failColor = '#c50000';
        const raitoRegister = data.register_count * 100 / data.target;
        const realRaitoRegister = data.real_register_count * 100 / data.target;
        const raitoMoney = data.money * 100 / (data.target * data.course.price * RATIO_MONEY_REGISTER / 100);
        const raitoAttendance = Math.round(data.attendance_success * 100 / data.attendance_count);
        const raitoHomework = Math.round(data.homework_count * 100 / (data.real_register_count * (data.topic_count || 1)));
        const raitoGraduate = Math.round(data.graduate_success * 100 / data.real_register_count);
        const raitoRate = Math.round(data.rate_sum / (data.rate_total) * 10)/10;

        const widthRaitoAttendance = Math.round(raitoAttendance / RATIO_ATTENDANCE_CLASS * 100);
        const widthRaitoHomeWork = Math.round(raitoHomework / RATIO_ATTENDANCE_CLASS * 100);


        const attendanceColor = raitoAttendance >= RATIO_ATTENDANCE_CLASS ? successColor : failColor;
        const homeworkColor = raitoHomework >= RATIO_ATTENDANCE_CLASS ? successColor : failColor;
        const moneyColor = raitoMoney >= 100 ? successColor : failColor;
        const openModalDeatil = ()=> this.props.store.loadClassDetail(data);
        return (

            <div key={key} className="col-md-3 col-sm-6" style={{marginTop: 40}}>
                <div className="card card-profile">
                    <div className="card-avatar">
                        <a className="content-avatar" href={"/teaching/class/" + data.id}
                           target="_blank">
                            <div className="img"
                                 style={{
                                     background: 'url(' + validateLinkImage(data.course.icon_url) + ') center center / cover',
                                     width: '130px',
                                     height: '130px'
                                 }}
                            />
                        </a>
                    </div>
                    <div className="card-content">
                        {/*<h6 className="category text-gray">{current_role.role_title}</h6>*/}
                        <a href={"/teaching/class/" + data.id} target="_blank">
                            <h4 className="card-title bold">{data.name}</h4>
                        </a>
                        <p className="description">
                            {data.teacher &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher.color}}
                            >
                                {getShortName(data.teacher.name)}
                            </button>}
                            {data.teacher_assistant &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher_assistant.color}}
                            >
                                {getShortName(data.teacher_assistant.name)}
                            </button>}
                        </p>
                        <div onClick={openModalDeatil} className="cursor-pointer">
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ đăng kí</div>
                                <div className="bold">
                                    {`${data.register_count}/${data.target}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoRegister + '%',
                                         backgroundColor: successColor
                                     }}/>
                            </div>
                        </div>
                        <div onClick={openModalDeatil} className="cursor-pointer">
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ thực học</div>
                                <div className="bold">
                                    {`${data.real_register_count}/${data.target}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: realRaitoRegister + '%',
                                         backgroundColor: successColor
                                     }}/>
                            </div>
                        </div>
                        <div onClick={openModalDeatil} className="cursor-pointer">
                            <div className="flex flex-space-between">
                                <div>Tổng doanh thu</div>
                                <div className="bold">
                                    {`${convertMoneyToK(data.money)}/${convertMoneyToK(data.target * data.course.price* RATIO_MONEY_REGISTER / 100)}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoMoney + '%',
                                         backgroundColor: moneyColor
                                     }}/>
                            </div>
                        </div>
                        <div onClick={()=>{
                            this.props.store.showModalAttendance = true;
                            this.props.store.attendanceDetail = data;
                        }} className="cursor-pointer">
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ tham gia lớp học</div>
                                <div className="bold">
                                    {`${raitoAttendance}/${RATIO_ATTENDANCE_CLASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: widthRaitoAttendance + '%',
                                         backgroundColor: attendanceColor
                                     }}/>
                            </div>
                        </div>
                        <div onClick={()=>{
                            this.props.store.showModalHomework = true;
                            this.props.store.homeworkDetail = data;
                        }} className="cursor-pointer">
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ làm bài tập</div>
                                <div className="bold">
                                    {`${raitoHomework}/${RATIO_ATTENDANCE_CLASS}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: widthRaitoHomeWork + '%',
                                         backgroundColor: homeworkColor
                                     }}/>
                            </div>
                        </div>
                        <div onClick={openModalDeatil} className="cursor-pointer">
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ tốt nghiệp</div>
                                <div className="bold">
                                    {`${raitoGraduate}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoGraduate + '%',
                                         backgroundColor: successColor
                                     }}/>
                            </div>
                        </div>
                    </div>
                    {this.tooltip(raitoRate, data)}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {
                    this.props.store.isLoading ? <Loading/> :
                        <div className="row">
                            {
                                this.props.store.data.filter((data)=>{
                                    return  data.attendance_success  > 0 && (data.teacher || data.teacher_assistant);
                                }).map((item, key) => {
                                        return this.renderItem(item, key);
                                    }
                                )}
                        </div>
                }
            </div>

        );
    }


    openModalCheckinCheckout(user, gen) {
        this.props.store.selectedUser = user;
        this.props.store.showModalCheckinCheckout = true;
        if (gen) {
            this.props.store.selectedGenId = gen.id
        }
    }

    openModalStudentAttendance(user, gen) {
        this.props.store.selectedUser = user;
        this.props.store.showModalStudentAttendance = true;
        if (gen) {
            this.props.store.selectedGenId = gen.id
        }
    }

    openModalStudentRating(user, gen) {
        this.props.store.selectedUser = user;
        this.props.store.showModalStudentRating = true;
        if (gen) {
            this.props.store.selectedGenId = gen.id
        }
    }
}

EvaluateClasses.propTypes = {};

export default EvaluateClasses;

