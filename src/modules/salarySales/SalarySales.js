import React from "react";
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import {dotNumber, formatPhone, validateLinkImage} from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";

@observer
class SalarySales extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.store.loadSalarySales();
    }

    renderItem = (data) => {
        const total_salary = (parseInt(data.sale_salary.salary_normal_register) || 0)
            + (parseInt(data.sale_salary.salary_gd_register) || 0) + data.user.salary + (data.bonus || 0);
        return (
            <div className="card">
                <div className="card-content">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="circle-avatar" style={{
                                        background: 'url(' + validateLinkImage(data.user.avatar_url) + ') center center / cover',
                                        width: '60px',
                                        height: '60px'
                                    }}
                                    />
                                </div>
                                <div className="col-md-9">
                                    <div style={{flex: 1}}>
                                        <div className="bold">
                                            {data.user.name}
                                        </div>
                                        <div className="category">
                                            {formatPhone(data.user.phone)}
                                        </div>
                                        <div className="card-footer" style={{margin: 0, marginTop: 66}}>
                                            <div className="flex flex-row flex-space-between">
                                                <div className="bold">Lương cứng</div>
                                                <div>{dotNumber(data.user.salary)}đ</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-3">
                            <div className="bold">
                                Số đơn thường
                            </div>
                            <div className="flex flex flex-space-between">
                                <div>{data.total_paid_normal_registers}/{data.total_normal_registers}</div>
                                <div className="bold">Xem chi tiết</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: data.total_paid_normal_registers * 100 / data.total_normal_registers + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                            <br/>
                            <div>
                                <div className="flex flex flex-space-between">
                                    <div>{data.total_paid_normal_registers}</div>
                                    {data.sale_salary.salary_normal_register > 0 ?
                                        <TooltipButton text={data.sale_salary.note_normal_register} placement="top">
                                            <div
                                                className="bold">{dotNumber(data.sale_salary.salary_normal_register)}đ
                                            </div>
                                        </TooltipButton>
                                        :
                                        <div className="bold cursor-pointer"
                                             onClick={() => this.props.openModalAddSalary(data.sale_salary.id, 'normal')}
                                        >Nhập lương</div>
                                    }

                                </div>
                            </div>
                            <div className="card-footer" style={{margin: 0}}>
                                <div className="flex flex flex-space-between">
                                    <div>+</div>
                                    <div
                                        className="bold">{dotNumber(data.sale_salary.salary_normal_register)}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="bold">
                                Số buổi GD
                            </div>
                            <div className="flex flex flex-space-between">
                                <div>{data.total_paid_gd_registers}/{data.total_gd_registers}</div>
                                <div className="bold">Xem chi tiết</div>
                            </div>
                            <div className="progress">
                                <div className="progress-bar"
                                     style={{
                                         width: data.total_paid_gd_registers * 100 / data.total_gd_registers + '%',
                                         backgroundColor: '#2EBE21'
                                     }}/>
                            </div>
                            <br/>
                            <div>
                                <div className="flex flex flex-space-between">
                                    <div>{data.total_paid_gd_registers}</div>
                                    {data.sale_salary.salary_gd_register > 0 ?
                                        <TooltipButton text={data.sale_salary.note_gd_register} placement="top">
                                            <div
                                                className="bold">{dotNumber(data.sale_salary.salary_gd_register)}đ
                                            </div>
                                        </TooltipButton>
                                        :
                                        <div className="bold cursor-pointer"
                                             onClick={() => this.props.openModalAddSalary(data.sale_salary.id, 'gd')}
                                        >Nhập lương</div>
                                    }
                                </div>
                                <div className="card-footer" style={{margin: 0}}>
                                    <div className="flex flex flex-space-between">
                                        <div>+</div>
                                        <div
                                            className="bold">{dotNumber(data.sale_salary.salary_gd_register)}đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="bold">
                                Tính lương
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương cứng</div>
                                <div>{dotNumber(data.user.salary)}đ</div>
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương đơn thường</div>
                                <div>{dotNumber(data.sale_salary.salary_normal_register)}đ</div>
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương đơn GD</div>
                                <div>{dotNumber(data.sale_salary.salary_gd_register)}đ</div>
                            </div>
                            <div className="flex flex flex-space-between">
                                <div className="bold">Lương thưởng
                                    {
                                        data.sale_salary &&
                                        <TooltipButton text="Thêm thưởng" placement="top">
                                            <button className="btn btn-rose btn-round btn-xs button-add none-margin"
                                                    type="button" data-toggle="dropdown"
                                                    onClick={() => this.props.openModalAddSalaryBonus(data.sale_salary.id)}
                                            >
                                                <strong>+</strong>
                                            </button>
                                        </TooltipButton>
                                    }
                                </div>
                                <div className="bold cursor-pointer"
                                     onClick={() => this.props.openModalDetailSalaryBonus(data.sale_salary.id)}>{dotNumber(data.bonus)}đ
                                </div>
                            </div>

                            <div className="card-footer" style={{margin: 0, marginTop: 3}}>
                                <div className="flex flex flex-space-between">
                                    <div>=</div>
                                    <div
                                        className="bold">{dotNumber(total_salary)}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }

    render() {

        if (!this.props.store.isLoading) {
            console.log(this.props.store.getData);
        }
        return (
            <div>
                {
                    this.props.store.isLoading ? <Loading/> :
                        <div>
                            {
                                this.props.store.getData.map((item) => {
                                        return this.renderItem(item);
                                    }
                                )}
                        </div>
                }
            </div>

        );
    }
}

SalarySales.propTypes = {};

export default SalarySales;

// Có 2 trường start_time và start_time_form để chỉ tgian bắt đầu nhưng do thư viện moment nên start_time ko có end_time (end_time
// tự tính trong apis)
