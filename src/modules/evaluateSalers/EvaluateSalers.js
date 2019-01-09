import React from "react";
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import {getShortName, validateLinkImage,convertDotMoneyToK, dotStringNumber} from "../../helpers/helper";


@observer
class EvaluateSalers extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.store.loadEvaluate();
    }

    getStartGen = (data)=>{
        return this.props.store.gens ?
            this.props.store.gens.filter(gen => gen.id == data.user.start_gen_id)[0] : data.gen;

    }

    renderItem = (data,index) => {
        let startGen = this.getStartGen(data);
        const raitoPaid = data.register_paid / data.register_total * 100;
        const raitoRevenue = data.sum_paid_personal / data.kpi * 100;
        let raitoShift = Math.round(data.shift_detail.total_lawful / data.shift_detail.total_attendance * 100 *10)/10;
        let raitoWorkShift = Math.round(data.work_shift_detail.total_lawful / data.work_shift_detail.total_attendance * 100 *10)/10;
        const raitoProactive = data.proactive / (data.proactive + data.passive) * 100;

        if(!data.shift_detail.total_attendance) raitoShift = 0;
        if(!data.work_shift_detail.total_attendance) raitoWorkShift = 0;

        return (

            <div className="col-md-3 col-sm-6" style={{marginTop: 40}} key={index}>
                <div className="card card-profile">
                    <div className="card-avatar">
                        <a className="content-avatar" href={"/teaching/evaluate-personal/"}
                           target="_blank">
                            <div className="img"
                                 style={{
                                     background: 'url(' + validateLinkImage(data.user.avatar_url) + ') center center / cover',
                                     width: '130px',
                                     height: '130px'
                                 }}
                            />
                        </a>
                    </div>
                    <div className="card-content">
                        <a href={"#"}>
                            <h4 className="card-title bold">{getShortName(data.user.name)}</h4>
                        </a>
                        <p className="description">
                            <button className="btn btn-xs btn-round btn-success"
                                    // style={{backgroundColor: "#" + data.user.color}}
                            >
                                Bậc {data.salary_level.level}
                            </button>
                        </p>
                        <div className="cursor-pointer">
                            <div className="flex flex flex-space-between">
                                <div>Số đơn đã đóng tiền</div>
                                <div className="bold">
                                    {`${data.register_paid}/${data.register_total}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoPaid + '%',
                                         backgroundColor: raitoPaid ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="flex flex flex-space-between">
                                <div>DT chỉ tiêu</div>
                                <div className="bold">
                                    {`${convertDotMoneyToK(dotStringNumber(data.sum_paid_personal))}/${convertDotMoneyToK(dotStringNumber(data.kpi))}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoRevenue + '%',
                                         backgroundColor: raitoRevenue ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ đúng giờ trực</div>
                                <div className="bold">
                                    {`${raitoShift}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoShift + '%',
                                         backgroundColor: raitoShift ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="flex flex flex-space-between">
                                <div>Tỉ lệ đúng giờ làm việc</div>
                                <div className="bold">
                                    {`${raitoWorkShift}%`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoWorkShift + '%',
                                         backgroundColor: raitoWorkShift ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="flex flex flex-space-between">
                                <div>Kênh chủ động- Kênh bị động</div>
                                <div className="bold">
                                    {`${data.proactive}-${data.passive}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoProactive + '%',
                                         backgroundColor: raitoProactive ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                    </div>
                    {
                        this.props.store.gens ?
                            <div className="card-footer">
                                Bắt đầu làm việc từ khóa {startGen ? startGen.name : '(không có thông tin)'}
                            </div>
                            :
                            <div className="card-footer">
                                Khóa {startGen ? startGen.name : ''}
                            </div>
                    }

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
                                this.props.store.data.map((item,index) => {
                                        return this.renderItem(item,index);
                                    }
                                )}
                        </div>
                }
            </div>

        );
    }

}

EvaluateSalers.propTypes = {};

export default EvaluateSalers;
