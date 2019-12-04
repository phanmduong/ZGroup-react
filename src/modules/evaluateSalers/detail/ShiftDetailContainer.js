import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./EvaluateSalerDetailStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import {validateLinkImage} from "../../../helpers/helper";



// import _ from 'lodash';

@observer
class ShiftDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1,
            dateIndex: 0,
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

    changeTab = (tab) => {
        let newState = {...this.state, tab};
        this.setState(newState);
    }

    render() {
        let user = this.store.user ? this.store.user : {};
        const activeTabClass = "btn btn-rose btn-round uppercase";
        const deactiveTabClass = "btn btn-round uppercase";

        let {shifts, work_shifts} = this.store.data;

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

                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            <div className="flex flex-justify-content-center">
                                <button
                                    className={this.state.tab == 1 ? activeTabClass : deactiveTabClass}
                                    onClick={() => this.changeTab(1)}
                                >Ca trực
                                </button>
                                <button
                                    className={this.state.tab == 2 ? activeTabClass : deactiveTabClass}
                                    onClick={() => this.changeTab(2)}
                                >Ca làm việc
                                </button>
                            </div>

                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th>Ngày</th>
                                        <th>Ca</th>
                                        <th>Checkin lúc</th>
                                        <th>Checkout lúc</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {this.state.tab == 1 &&

                                    shifts.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.name + `: ${item.start_time} - ${item.end_time}`}</td>
                                                <td>{item.checkin_id ? item.checkin_time : "Không checkin"}</td>
                                                <td>{item.checkout_id ? item.checkout_time : "Không checkout"}</td>
                                            </tr>
                                        );
                                    })

                                    }

                                    {this.state.tab == 2 &&
                                        work_shifts.map((item, index) => {

                                        return (
                                            <tr key={index}>
                                                <td>{item.date}</td>
                                                <td>{item.name + `: ${item.start_time} - ${item.end_time}`}</td>
                                                <td>{item.checkin_id ? item.checkin_time : "Không checkin"}</td>
                                                <td>{item.checkout_id ? item.checkout_time : "Không checkout"}</td>
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

ShiftDetailContainer.propTypes = {};

export default ShiftDetailContainer;

