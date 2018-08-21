import React from 'react';
// import ButtonGroupAction from "../../../components/common/ButtonGroupAction";
import {generateDatatableLanguage, dotNumber} from "../../../helpers/helper";
import PropTypes from 'prop-types';
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";

class ListGood extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

        // Setup - add a text input to each footer cell
        $('#goods-table tfoot th').not('.disabled-search').each(function () {
            let title = $(this).text();
            if (title !== "") {
                $(this).html('<input class="form-control width-100" type="text" placeholder="Tìm ' + title.toLowerCase() + '" />');
            }
        });

        this.initTable();

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
        $("#goods-table .form-group").css("margin-top", "0px");
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.importGoods != this.props.importGoods) {
            return true;
        }
        return false;
    }

    initTable() {
        this.table = $('#goods-table').DataTable({
            destroy: true,
            dom: '<l<t>ip>',
            pagingType: "full_numbers",
            lengthMenu: [
                [-1, 10, 25, 50],
                ["Tất cả", 10, 25, 50]
            ],
            iDisplayLength: 10,
            responsive: true,
            "language": generateDatatableLanguage("hóa đơn"),
            initComplete: function () {
                let r = $('#goods-table tfoot tr');
                r.find('th').each(function () {
                    $(this).css('padding', 8);
                });
                $('#goods-table thead').append(r);
                $('#search_0').css('text-align', 'center');
                $('.card .material-datatables label').addClass('form-group');
            },
        });
        this.props.setTable(this.table);
    }

    render() {
        return (
            <div className="material-datatables">
                <table id="goods-table" className="table" width="100%">
                    <thead>
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Barcode</th>
                        <th>Số lượng</th>
                        <th className="disabled-sorting">Giá vốn</th>
                        <th className="disabled-sorting">Thành tiền</th>
                        <th className="disabled-sorting">Giá bán</th>
                        {this.props.type && <th className="disabled-sorting"/>}
                    </tr>
                    </thead>
                    <tfoot>
                    <tr className="text-rose">
                        <th className="disabled-search"/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Barcode</th>
                        <th>Số lượng</th>
                        <th>Giá vốn</th>
                        <th>Thành tiền</th>
                        <th>Giá bán</th>
                        {this.props.type && <th/>}
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        this.props.importGoods && this.props.importGoods.map((good, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{good.code}</td>
                                    <td>{good.name}</td>
                                    <td>{good.barcode}</td>
                                    <td>{good.quantity}</td>
                                    <td>{dotNumber(good.import_price)}đ</td>
                                    <td>{dotNumber(good.import_price * good.quantity)}đ</td>
                                    <td>{dotNumber(good.price)}đ</td>
                                    {
                                        this.props.type &&
                                        <td>
                                            <ButtonGroupAction
                                                delete={this.props.deleteGood}
                                                edit={this.props.openModalEditGood}
                                                object={good}
                                            />
                                        </td>
                                    }

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

ListGood.propTypes = {
    setTable: PropTypes.func.isRequired,
    deleteGood: PropTypes.func,
    openModalEditGood: PropTypes.func,
    importGoods: PropTypes.array.isRequired,
    type: PropTypes.string,
};

export default ListGood;
