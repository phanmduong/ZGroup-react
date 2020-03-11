import React from "react";
import Loading from "../../components/common/Loading";
import store from "./SalaryTeachingStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import SalaryTeaching from "./SalaryTeaching";
import {
    appendJsonToWorkBook,
    dotNumber,
    newWorkBook,
    renderExcelColumnArray,
    saveWorkBookToExcel, xoa_dau,
    confirm
} from "../../helpers/helper";
import AddSalaryBonus from "./AddSalaryBonus";
import DetailSalaryBonus from "./DetailSalaryBonus";
import SendMail from "./SendMail";

@observer
class SalaryTeachingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        if (this.props.params.genId) {
            store.selectedGenId = this.props.params.genId;
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

    exportExcel = () => {
        let gen = store.gens.filter((gen => gen.id == store.selectedGenId))[0].name;
        let wb = newWorkBook();
        let data;
        let cols = renderExcelColumnArray([5, 25, 25, 15, 25]);//độ rộng cột

        data = store.getData.map((item, index) => {

            let user = item.user;
            /* eslint-disable */

            let res = {
                'STT': index + 1,
                'HOTEN': xoa_dau(user.bank_name_account),
                'SOTAIKHOAN': user.bank_number,
                'SOTIEN': item.total_salary,
                'MOTA': xoa_dau(user.name + " luong khoa " + gen),
            };
            /* eslint-enable */
            return res;
        });
        appendJsonToWorkBook(data, wb, 'Luong_giang_vien_khoa_' + gen, cols);
        //end điểm danh

        //xuất file
        saveWorkBookToExcel(wb, 'Luong_giang_vien_khoa_' + gen, "xls");

        this.setState({showLoadingModal: false});
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
                                <div className="col-sm-2 col-xs-2">
                                    <div
                                        className={"btn btn-success btn-round " + (store.isSendingEmail ? "disabled" : "")}
                                        style={{width: '100%'}}
                                        onClick={() => {
                                            store.openModalSendMail = true;
                                        }}
                                    >
                                        Gửi mail
                                    </div>
                                </div>
                                <div className="col-sm-1 col-xs-1">
                                    <div
                                        className={"btn btn-info btn-round "}
                                        style={{width: '100%'}}
                                        onClick={this.exportExcel}
                                    >
                                        Xuất
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
                                <div className="col-sm-3 col-xs-3">
                                    <input className="custom-search" type="text"
                                           placeholder="Tìm kiếm" onChange={(e) => {
                                        store.searchName = e.target.value;
                                        console.log(this.store.searchName);
                                    }}/>
                                </div>
                            </div>
                            <SalaryTeaching store={store}
                                            openModalAddSalaryBonus={this.openModalAddSalaryBonus}
                                            openModalDetailSalaryBonus={this.openModalDetailSalaryBonus}
                            />
                            <AddSalaryBonus store={store}/>
                            <DetailSalaryBonus store={store}/>
                            {
                                store.openModalSendMail && <SendMail store={store}/>
                            }
                        </div>
                    </div>
                }
            </div>

        );
    }

    approvalSalary = () => {
        if (store.selectedBaseId != 0 || store.isApproval) return;
        confirm('success', 'Duyệt chi', `Bạn có chắc chắn duyệt chi lương giảng viên khóa này không?`, () => {
            store.approvalSalary();
        });


    }
}

SalaryTeachingContainer.propTypes = {};

export default SalaryTeachingContainer;

