import React from "react";
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import {convertMoneyToK,getShortName,  validateLinkImage} from "../../helpers/helper";
import Star from "../../components/common/Star";


@observer
class EvaluateClasses extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.store.loadEvaluate();
    }

    renderItem = (data) => {
        let raitoRegister = data.register_count * 100 / data.target;
        let realRaitoRegister = data.real_register_count * 100 / data.target;
        let raitoMoney = data.money * 100 / (data.target * data.course.price * 60 / 100);
        let raitoAttendance = Math.round(data.attendance_success * 100 / data.attendance_count);
        let raitoHomework = Math.round(data.homework_success * 100 / data.attendance_count);
        let raitoGraduate = Math.round(data.graduate_success * 100 / data.attendance_count);
        let raitoRate = Math.round(data.rate_sum / (data.rate_total * 5));


        return (

            <div className="col-md-3 col-sm-6" style={{marginTop: 40}}>
                <div className="card card-profile">
                    <div className="card-avatar">
                        <a className="content-avatar" href={"/teaching/evaluate-personal/" + data.course.id}
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
                        <a href={"/teaching/evaluate-class/"} target="_blank">
                            <h4 className="card-title bold">{data.name}</h4>
                        </a>
                        <p className="description">
                            {data.teacher &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher.color}}
                            >
                                {getShortName(data.teacher.name)}
                            </button>}
                            {data.teaching_assistant &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teaching_assistant.color}}
                            >
                                {getShortName(data.teaching_assistant.name)}
                            </button>}
                        </p>
                        <div>
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
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                        </div>
                        <div>
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
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-space-between">
                                <div>Tổng doanh thu</div>
                                <div className="bold">
                                    {`${convertMoneyToK(data.money)}/${convertMoneyToK(data.target * data.course.price)}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoMoney + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ tham gia lớp học</div>
                                <div className="bold">
                                    {`${raitoAttendance}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoAttendance + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-space-between">
                                <div>Tỉ lệ làm bài tập</div>
                                <div className="bold">
                                    {`${raitoHomework}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoHomework + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                        </div>
                        <div>
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
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                        </div>
                    </div>

                    <div className="card-footer flex flex-space-between">
                        {data.rate_total != 0 ?
                            `Độ hài lòng: ${raitoRate}/5`
                            :
                            "Chưa có lượt đánh giá"
                        }
                        {data.rate_total  != 0 &&<Star maxStar={5} value={raitoRate} disable={true}/>}
                    </div>


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
                                    return data.attendance_success  > 0 && (data.teacher || data.teaching_assistant);
                                }).map((item) => {
                                        return this.renderItem(item);
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

