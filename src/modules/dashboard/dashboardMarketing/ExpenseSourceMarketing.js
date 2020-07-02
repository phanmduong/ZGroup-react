import React from 'react';
import {observer} from 'mobx-react';
import Loading from "../../../components/common/Loading";
import ReactTable from "react-table-v6";
import Sort from "../../../components/common/ReactTable/Sort";
import SetModalExpenseSourceModal from "./SetModalExpenseSourceModal";
import setExpenseSourceStore from "./setExpenseSourceStore";
import {dotNumber} from "../../../helpers/helper";

@observer
class ExpenseSourceMarketing extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalMoney: false,
        };
        this.columns = [
            {
                Header: <Sort title="Tên chiến dịch"/>,
                accessor: 'name',
                Cell: props => (<div onClick={() => this.openLinkRegister({saler_id: props.original.id}, true)}>
                    <strong>{props.value}</strong></div>)
            },
            {
                Header: <Sort title="Tổng chi phí"/>,
                accessor: 'total_expense',
                Cell: props => <div>{dotNumber(props.value)}</div>
            },
            {
                Header: <Sort title="Số lead"/>,
                accessor: 'total_lead',
                Cell: props => <div>{dotNumber(props.value)}</div>
            },
            {
                Header: <Sort title="Chi phí mỗi lead"/>,
                accessor: '',
                Cell: props => {
                    const value = props.original;
                    return (
                        <div>{dotNumber(Math.round(value.total_expense / value.total_lead))}</div>
                    );
                }
            },
            {
                sortable: false,
                Header: "",
                accessor: 'id',
                Cell: props => (<div className="flex flex-row flex-align-items-center">
                    <div
                        className="padding-vertical-10px padding-horizontal-20px white-light-round btn-grey text-center font-weight-400 cursor-pointer"
                        style={{width: 120}}
                        onClick={() => this.openModalSetKpi(props.original)}
                    >Set chi phí
                    </div>
                </div>),
                width: 140,
                maxWidth: 140,
            },
        ];
    }

    componentDidMount() {
    }

    openModalSetKpi = (source) => {
        const filter = {...this.props.store.filter};

        let sourceIds = [];
        if (source.id) {
            sourceIds = [source.id];
        } else {
            sourceIds = this.props.store.expenseSources.map((item) => item.id);
        }

        setExpenseSourceStore.selectedSource = source;
        setExpenseSourceStore.formData = {
            start_time: filter.start_time,
            end_time: filter.end_time,
            gen_id: filter.gen_id,
            source_ids: sourceIds
        };
        // setExpenseSourceStore.historyFilter = {
        //     start_time: filter.start_time,
        //     end_time: filter.end_time,
        //     user_ids: salerIds
        // };
        // setExpenseSourceStore.historyKpi({...setKpiStore.historyFilter, base_id: filterStore.base_id});
        setExpenseSourceStore.showModal = true;
        // setKpiStore.openHistoryPanel = openHistoryPanel;
    }

    load = () => {
        // const filter = {...filterStore.filter};
        // filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        // filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        // this.store.analyticsKpi(filter);
        this.props.store.expenseSourceMarketing();
    }

    render() {
        const {isLoadingExpenseSource, expenseSources} = this.props.store;
        // data = [totalKpi, ...data];
        console.log(expenseSources);
        ``;
        return (
            <div>
                {isLoadingExpenseSource ? <Loading/> :
                    <div className="row">
                        <div className="col-md-12">
                            <ReactTable
                                data={expenseSources}
                                columns={this.columns}
                                previousText={'Trước'}
                                nextText={'Tiếp'}
                                noDataText={'Không có dữ liệu'}
                                pageText={"Trang"}
                                rowsText={"dòng"}
                                showPagination={false}
                                defaultPageSize={expenseSources.length}
                            />
                        </div>
                    </div>
                }
                <SetModalExpenseSourceModal reload={this.load}/>
            </div>

        );
    }
}


export default ExpenseSourceMarketing;
