import React from "react";
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import {getShortName, validateLinkImage} from "../../helpers/helper";
import {RATIO_CHECKIN_CHECKOUT_TEACHING_PASS} from "../../constants/constants";
import {Link} from "react-router";


@observer
class EvaluateContents extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        if (this.props.params.salerId) {
            this.props.store.salerId = this.props.params.salerId;
        }
        this.props.store.loadEvaluate();
    }

    getStartGen = (data) => {
        return this.props.store.gens ?
            this.props.store.gens.filter(gen => gen.id == data.user.start_gen_id)[0] : data.gen;

    }

    openModalDetail = (data) => {
        this.props.store.selectedUser = data;
        this.props.store.showModalDetail = true;
    }

    openModalShift = (data, shift_type = 'shifts') => {
        this.props.store.selectedUser = data.user;
        this.props.store.selectedData = data;
        this.props.store.showModalShift = true;
        this.props.store.shift_type = shift_type;
    }

    renderItem = (data, index) => {
        let startGen = this.getStartGen(data);
        let raitoWorkShift = data.work_shift_detail.raito;
        let workShiftPass = raitoWorkShift >= RATIO_CHECKIN_CHECKOUT_TEACHING_PASS;
        let raitoPost = data.post_count / 20 * 100;
        let raitoView = data.view_count / 10000 * 100;
        let raitoLead = data.view_count;


        const openModalDetail = () => this.openModalDetail(data.user);

        return (

            <div className="col-md-3 col-sm-6" style={{marginTop: 40}} key={index}>
                <div className="card card-profile">
                    <div className="card-avatar">
                        <div className="content-avatar"
                             target="_blank">
                            <div className="img"
                                 style={{
                                     background: 'url(' + validateLinkImage(data.user.avatar_url) + ') center center / cover',
                                     width: '130px',
                                     height: '130px'
                                 }}
                            />
                        </div>
                    </div>
                    <div className="card-content">
                        <Link to={"/sales/evaluate/" + data.user.id}>
                            <h4 className="card-title bold">{getShortName(data.user.name)}</h4>
                        </Link>
                        <p className="description">
                            <button className="btn btn-xs btn-round btn-success">
                                Bậc {data.salary_level.level}
                            </button>
                        </p>

                        <div className="cursor-pointer" onClick={() => this.openModalShift(data, "work_shifts")}>
                            <div className="flex flex flex-space-between">
                                <div>Sô bài đã đăng</div>
                                <div className="bold">
                                    {`${data.post_count}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoPost + '%',
                                         backgroundColor: raitoPost ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className="flex flex flex-space-between">
                                <div>Sô lượt xem</div>
                                <div className="bold">
                                    {`${data.view_count}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoView + '%',
                                         backgroundColor: raitoView ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer" onClick={openModalDetail}>
                            <div className="flex flex flex-space-between">
                                <div>Sô lead đổ về</div>
                                <div className="bold">
                                    {`${data.lead_count}`}
                                </div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: raitoLead + '%',
                                         backgroundColor: raitoLead ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>
                        <div className="cursor-pointer" onClick={() => this.openModalShift(data, "work_shifts")}>
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
                                         backgroundColor: workShiftPass ? '#2EBE21' : '#C50000'
                                     }}/>
                            </div>
                        </div>

                    </div>
                    {
                        this.props.store.gens ?
                            <div className="card-footer">
                                {this.props.params.salerId ?  "Khóa" :  "Bắt đầu làm việc từ khóa"} {startGen ? startGen.name : '(không có thông tin)'}
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
                                this.props.store.data.map((item, index) => {
                                        return this.renderItem(item, index);
                                    }
                                )}
                        </div>
                }
            </div>

        );
    }

}

EvaluateContents.propTypes = {};

export default EvaluateContents;
