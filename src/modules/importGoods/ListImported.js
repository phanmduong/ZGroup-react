import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {generateDatatableLanguage,dotNumber} from "../../helpers/helper";

class ListImported extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

        // Setup - add a text input to each footer cell
        $('#imported-goods-table tfoot th').each(function () {
            let title = $(this).text();
            if (title !== "") {
                $(this).html('<input class="form-control width-100" type="text" placeholder="Tìm ' + title.toLowerCase() + '" />');
            }
        });

        const table = $('#imported-goods-table').DataTable({
            dom: '<l<t>ip>',
            pagingType: "full_numbers",
            lengthMenu: [
                [-1, 10, 25, 50],
                ["Tất cả", 10, 25, 50]
            ],
            iDisplayLength: 10,
            responsive: true,
            columns: [
                {"name": "Mã hóa đơn", "orderable": true},
                {"name": "Tình trạng", "orderable": true},
                {"name": "Ngày nhập", "orderable": true},
                {"name": "Người nhập", "orderable": true},
                {"name": "NCC / KH", "orderable": true},
                {"name": "SL", "orderable": true},
                {"name": "Tổng tiền", "orderable": true},
                {"name": "Nợ", "orderable": true},
                {"name": "", "orderable": false}
            ],
            "language": generateDatatableLanguage("hóa đơn"),
            initComplete: function () {
                let r = $('#imported-goods-table tfoot tr');
                r.find('th').each(function () {
                    $(this).css('padding', 8);
                });
                $('#imported-goods-table thead').append(r);
                $('#search_0').css('text-align', 'center');
                $('.card .material-datatables label').addClass('form-group');
            },
        });
        // Apply the search
        table.columns().every(function () {
            const that = this;

            $('input', this.footer()).on('keyup change', function () {
                if (that.search() !== this.value) {
                    that
                        .search(this.value)
                        .draw();
                }
            });
        });
        this.props.setTable(table);
        $.material.init();
        $(".form-group").css("margin-top", "0px");
    }

    render() {
        return (
            <div className="material-datatables">
                <table id="imported-goods-table" className="table" width="100%">
                    <thead>
                    <tr className="text-rose">
                        <th>Mã hóa đơn</th>
                        <th>Tình trạng</th>
                        <th>Ngày nhập</th>
                        <th>Người nhập</th>
                        <th>NCC / KH</th>
                        <th>SL</th>
                        <th>Tổng tiền</th>
                        <th>Nợ</th>
                        <th/>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr className="text-rose">
                        <th>Mã hóa đơn</th>
                        <th>Tình trạng</th>
                        <th>Ngày nhập</th>
                        <th>Người nhập</th>
                        <th>NCC / KH</th>
                        <th>SL</th>
                        <th>Tổng tiền</th>
                        <th>Nợ</th>
                        <th/>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        this.props.importOrders.map((importOrder, index)=>{
                            return (
                                <tr key={index}>
                                    <td>{importOrder.code}</td>
                                    <td>{importOrder.status}</td>
                                    <td>{importOrder.created_at}</td>
                                    <td>{importOrder.staff ? importOrder.staff.name : "Không nhập"}</td>
                                    <td>{importOrder.user ? importOrder.user.name : "Không nhập"}</td>
                                    <td>{dotNumber(importOrder.total_quantity)}</td>
                                    <td>{dotNumber(importOrder.total_money)}đ</td>
                                    <td>{dotNumber(importOrder.debt)}đ</td>
                                    <td><ButtonGroupAction/></td>
                                </tr>
                            );
                        })
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}

ListImported.propTypes = {
    importOrders : PropTypes.array.isRequired,
    setTable : PropTypes.func.isRequired
};

export default ListImported;