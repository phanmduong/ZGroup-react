import React from "react";
import Loading from "../../components/common/Loading";
import store from "./SalarySalesStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import SalarySales from "./SalarySales";
import {dotNumber} from "../../helpers/helper";
import AddSalaryBonus from "./AddSalaryBonus";
import DetailSalaryBonus from "./DetailSalaryBonus";
import AddSalary from "./AddSalary";

@observer
class SalarySalesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();
    }


    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadSalarySales();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadSalarySales();
    }

    openModalAddSalaryBonus = (saleSalaryId) => {
        store.salaryBonus = {
            saleSalaryId,
            amount: 0,
            note: ''
        };
        store.openModalAddSalaryBonus = true;
    };

    openModalAddSalary = (saleSalaryId, type) => {
        store.salary = {
            saleSalaryId,
            amount: 0,
            note: '',
            type
        };
        store.openModalAddSalary = true;
    };

    openModalDetailSalaryBonus = (saleSalaryId) => {
        store.openModalDetailSalaryBonus = true;
        store.getDetailSalaryBonus(saleSalaryId);
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
                                <div className="col-sm-4">
                                    {
                                        !store.isLoading &&
                                        <div
                                            className={"btn btn-success btn-round " + (store.selectedBaseId == 0 ? "" : "disabled")}
                                            style={{width: '100%'}}>
                                            <div className="flex flex-row flex-space-between" style={{width: '100%'}}>
                                                <div>DUYỆT CHI</div>
                                                <div className="bold">{dotNumber(store.totalSalary)}đ</div>
                                            </div>
                                        </div>
                                    }

                                </div>
                            </div>
                            <SalarySales store={store}
                                         openModalAddSalaryBonus={this.openModalAddSalaryBonus}
                                         openModalAddSalary={this.openModalAddSalary}
                                         openModalDetailSalaryBonus={this.openModalDetailSalaryBonus}
                            />
                            <AddSalaryBonus store={store}/>
                            <DetailSalaryBonus store={store}/>
                            <AddSalary store={store}/>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

SalarySalesContainer.propTypes = {};

export default SalarySalesContainer;

