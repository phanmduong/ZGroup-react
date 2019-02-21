import React from "react";
import Loading from "../../components/common/Loading";
import store from "./SalaryTeachingStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import SalaryTeaching from "./SalaryTeaching";
import {dotNumber} from "../../helpers/helper";
import AddSalaryBonus from "./AddSalaryBonus";
import DetailSalaryBonus from "./DetailSalaryBonus";
import * as helper from "../../helpers/helper";

@observer
class SalaryTeachingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        if (this.props.params.genId) {
            store.selectedGenId = this.props.params.genId
        }
        store.loadGens();
        store.loadBases();
    }


    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadSalaryTeaching();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadSalaryTeaching();
    }

    openModalAddSalaryBonus = (teachingSalaryId) => {
        store.salaryBonus = {
            teachingSalaryId,
            amount: 0,
            note: ''
        };
        store.openModalAddSalaryBonus = true;
    };

    openModalDetailSalaryBonus = (teachingSalaryId) => {
        console.log(teachingSalaryId);
        store.openModalDetailSalaryBonus = true;
        store.getDetailSalaryBonus(teachingSalaryId);
    }

    render() {
        return (
            <div>
                {store.isLoadingGen || store.isLoadingBase ?
                    <Loading/>
                    :
                    <div>

                        <div>
                            <div className="row">
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={store.gensData}
                                        value={store.selectedGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={store.basesData}
                                        value={store.selectedBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    <div
                                        className={"btn btn-success btn-round " + (store.isSendingEmail ? "disabled" : "")}
                                        style={{width: '100%'}}
                                        onClick={() => store.sendingEmail()}
                                    >
                                        Gửi mail
                                    </div>
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    {
                                        !store.isLoading &&
                                        <div
                                            className={"btn btn-success btn-round " + (store.selectedBaseId == 0 && !store.isApproval ? "" : "disabled")}
                                            style={{width: '100%'}}>
                                            <div className="flex flex-row flex-space-between" style={{width: '100%'}}
                                                 onClick={this.approvalSalary}>
                                                <div>DUYỆT CHI</div>
                                                <div className="bold">{dotNumber(store.totalSalary)}đ</div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                            <SalaryTeaching store={store}
                                            openModalAddSalaryBonus={this.openModalAddSalaryBonus}
                                            openModalDetailSalaryBonus={this.openModalDetailSalaryBonus}
                            />
                            <AddSalaryBonus store={store}/>
                            <DetailSalaryBonus store={store}/>
                        </div>
                    </div>
                }
            </div>

        );
    }

    approvalSalary = () => {
        if (store.selectedBaseId != 0 || store.isApproval) return;
        helper.confirm('success', 'Duyệt chi', `Bạn có chắc chắn duyệt chi lương giảng viên khóa này không?`, () => {
            store.approvalSalary();
        });


    }
}

SalaryTeachingContainer.propTypes = {};

export default SalaryTeachingContainer;

