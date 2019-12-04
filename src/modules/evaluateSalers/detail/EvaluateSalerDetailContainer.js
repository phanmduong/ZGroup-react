import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateSalerDetailStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import {convertDotMoneyToK, dotStringNumber,  validateLinkImage} from "../../../helpers/helper";
import Barchart from "../../dashboard/Barchart";
import TooltipButton from '../../../components/common/TooltipButton';

// import _ from 'lodash';

@observer
class EvaluateSalerDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        };
    }

    componentWillMount() {
        this.store = new store(this.props.gens, this.props.selectedGenId, this.props.user);
        this.store.loadData();
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    render() {
        let user = this.store.user ? this.store.user : {};
        const activeTabClass = "btn btn-rose btn-round uppercase";
        const deactiveTabClass = "btn btn-round uppercase";
        let {registers_by_date, paid_by_date, statistic_registers, registers} = this.store.data;
        return (
            <div>
                {
                    this.store.gens && this.store.gens.length > 0 &&
                    <div className="flex flex-justify-content-center">
                        <div style={{width: 200}}>
                            <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.store.gensData}
                                value={this.store.selectedGenId}
                                onChange={this.onChangeGen}
                            />
                        </div>
                    </div>
                }
                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(user.avatar_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {user.name}
                        </div>
                        <div className="bold">{`${convertDotMoneyToK(dotStringNumber(this.store.data.sum_paid_personal))}/${convertDotMoneyToK(dotStringNumber(this.store.data.kpi))}`}</div>
                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            <Barchart
                                label={this.store.data.date_array}
                                data={[registers_by_date, paid_by_date]}
                                style={{marginBottom: 20}}
                                id="barchar_register_by_date"
                            />
                            <div className="bold">Tỷ lệ kênh</div>
                            <div className="progress" style={{height: 20, margin: 20}}>
                                {statistic_registers.map((obj, index) => {
                                    const percent = obj.count / registers.length * 100;
                                    return (

                                            <TooltipButton placement="top" text={`${obj.name}`}>
                                                <div className="progress-bar" key={index}
                                                     style={{
                                                         width: percent + '%',
                                                         backgroundColor: '#' + obj.color
                                                     }}/>
                                            </TooltipButton>

                                    );
                                })}

                            </div>
                            <div className="flex flex-justify-content-center">
                                <button
                                    className={this.state.tab == 1 ? activeTabClass : deactiveTabClass}
                                    onClick={() => this.setState({tab: 1})}
                                >Đã thanh toán
                                </button>
                                <button
                                    className={this.state.tab == 2 ? activeTabClass : deactiveTabClass}
                                    onClick={() => this.setState({tab: 2})}
                                >Chưa thanh toán
                                </button>
                            </div>
                            <div className="table-responsive margin-left-20 margin-right-20">
                                <table id="datatables" className="table table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width: "100%"}}>
                                    <tbody>
                                    {registers.filter((obj) => this.state.tab == 1 ? obj.paid_status : !obj.paid_status).map((obj, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>

                                                    <div className="flex">
                                                        <div className="double-avatar"
                                                             style={{
                                                                 background: 'url(' + validateLinkImage(obj.course_avatar_url) + ') center center / cover',
                                                                 display: 'inline-block', zIndex:5
                                                             }}/>
                                                        <div className="double-avatar"
                                                             style={{
                                                                 background: 'url(' + validateLinkImage(obj.avatar_url) + ') center center / cover',
                                                                 display: 'inline-block', zIndex:4
                                                             }}/>
                                                    </div>

                                                </td>
                                                <td>
                                                    <a href={"/sales/info-student/" + obj.student_id} target="_blank">
                                                        <div className="card-title bold">{obj.name}</div>
                                                    </a>
                                                </td>
                                                <td className="breaker max-width-100">
                                                    <a href={"/teaching/class/" + obj.class.id} target="_blank">
                                                        <div className="card-title bold">{obj.class.name}</div>
                                                    </a>
                                                </td>
                                                <td className="breaker max-width-100">{obj.note}</td>
                                                <td>
                                                    <div className="btn btn-xs width-100"
                                                         style={{backgroundColor: "#" + obj.campaign.color}}>{obj.campaign.name}</div>
                                                </td>
                                                <td>
                                                    <div className="btn btn-xs width-100"
                                                         style={{backgroundColor: "#c50000"}}>{dotStringNumber(obj.money)}</div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }

                </div>
            </div>

        );
    }

}

EvaluateSalerDetailContainer.propTypes = {};

export default EvaluateSalerDetailContainer;

