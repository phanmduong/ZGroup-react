import React from 'react';
import ButtonGroupAction from '../../../components/common/ButtonGroupAction';
import TooltipButton from '../../../components/common/TooltipButton';
import Search from '../../../components/common/Search';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';

class ListGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.searchTable = this.searchTable.bind(this);
    }

    componentDidMount() {
        $('#datatables-goodorders #footer-search th').not('.disabled-search').each(function () {
            let title = $(this).text();
            if (title !== "") {
                $(this).html('<input class="form-control width-100" type="text" placeholder="Tìm ' + title.toLowerCase() + '" />');
            }
        });

        this.table = $('#datatables-goodorders').DataTable({
            dom: '<l<t>ip>',
            pagingType: "full_numbers",
            lengthMenu: [
                [-1, 10, 25, 50],
                ["Tất cả", 10, 25, 50]
            ],
            iDisplayLength: 10,
            responsive: true,
            columns: [
                {responsivePriority: 3},
                {responsivePriority: 2},
                {responsivePriority: 4},
                {responsivePriority: 8},
                {responsivePriority: 6},
                {responsivePriority: 7},
                {responsivePriority: 1},
                {responsivePriority: 5}
            ],
            language: helper.generateDatatableLanguage("sản phẩm"),
            initComplete: function () {
                let r = $('#datatables-goodorders #footer-search tr');
                r.find('th').each(function () {
                    $(this).css('padding', 8);
                });
                $('#datatables-goodorders thead').append(r);
                $('#search_0').css('text-align', 'center');
                $('.card .material-datatables label').addClass('form-group');
            },
        });
        // Apply the search
        this.table.columns().every(function () {
            const that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
        $.material.init();
    }

    searchTable(value) {
        this.table.search(value).draw();
    }

    render() {
        let totalMoneyAll = 0;
        return (
            <div>
                <Search
                    onChange={this.searchTable}
                    placeholder="Nhập mã barcode hoặc tên hàng hóa"
                />
                <div className="material-datatables">
                    <table id="datatables-goodorders" className="table"
                           width="100%">
                        <thead className="text-rose">
                        <tr>
                            <th>STT</th>
                            <th>Mã hàng</th>
                            <th>Tên hàng</th>
                            <th>Số lượng</th>
                            <th>Giá bán</th>
                            <th>Chiết khấu</th>
                            <th>Thành tiền</th>
                            <th className="disabled-sorting"/>
                        </tr>
                        </thead>
                        <tfoot id="footer-search" className="text-rose">
                        <tr>
                            <th className="disabled-search" />
                            <th>Mã hàng</th>
                            <th>Tên hàng</th>
                            <th>Số lượng</th>
                            <th>Giá bán</th>
                            <th>Chiết khấu</th>
                            <th>Thành tiền</th>
                            <th className="disabled-sorting"/>
                        </tr>
                        </tfoot>
                        <tbody>
                        {
                            this.props.goodOrders.map((goodOrder, index) => {
                                let totalMoney = goodOrder.quantity * goodOrder.price;

                                if (goodOrder.discount_money) {
                                    totalMoney -= goodOrder.discount_money;
                                } else {
                                    if (goodOrder.discount_percent) {
                                        totalMoney *= (100 - goodOrder.discount_percent) / 100;
                                    }
                                }

                                totalMoneyAll += totalMoney;

                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {goodOrder.code}
                                        </td>
                                        <td>{goodOrder.name}</td>
                                        <td>
                                            {goodOrder.quantity}
                                            <a data-toggle="tooltip" title type="button">
                                                <i className="material-icons">edit</i>
                                            </a>
                                        </td>
                                        <td>{helper.dotNumber(goodOrder.price)}đ</td>
                                        <td>
                                            <div style={{display: 'inline-block'}}>
                                                {(goodOrder.discount_money || goodOrder.discount_percent) &&
                                                <TooltipButton text="Giảm giá" placement="top">
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">card_giftcard</i>
                                                        {goodOrder.discount_money ? helper.dotNumber(goodOrder.discount_money) + 'đ'
                                                            : goodOrder.discount_percent + '%'}
                                                    </div>
                                                </TooltipButton>
                                                }
                                            </div>


                                        </td>
                                        <td className="text-align-right">{helper.dotNumber(Math.round(totalMoney))}đ</td>
                                        <td>
                                            <ButtonGroupAction/>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                        <tfoot>
                        <tr>
                            <th/>
                            <th><b>Tổng</b></th>
                            <th className="text-align-right" colSpan="5">
                                <b>{helper.dotNumber(totalMoneyAll)}đ</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <b>Giảm</b>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <b>0%</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <b>Thuế</b>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <b>0%</b>
                            </th>
                            <th/>
                        </tr>
                        <tr>
                            <th/>
                            <th>
                                <h4><b>Phải trả</b></h4>
                            </th>
                            <th className="text-align-right" colSpan="5">
                                <h4><b>{helper.dotNumber(totalMoneyAll)}đ</b></h4>
                            </th>
                            <th/>
                        </tr>
                        </tfoot>
                    </table>
                </div>
            </div>

        );
    }
}

ListGood.propTypes = {
    goodOrders: PropTypes.array.isRequired
};

export default ListGood;
