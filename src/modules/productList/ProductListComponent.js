import React from 'react';
import PropTypes from "prop-types";
import WareHouseModalContainer from "./modals/WareHouseModalContainer";
import AvatarModalContainer from "./modals/AvatarModalContainer";
import PriceModalContainer from "./modals/PriceModalContainer";
import {generateDatatableLanguage, dotNumber} from "../../helpers/helper";
import {Link} from "react-router";

class ProductListComponent extends React.Component {
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
                {"name": "", "orderable": false},
                {"name": "Mã sản phẩm", "orderable": true},
                {"name": "Tên sản phẩm", "orderable": true},
                {"name": "Số lượng", "orderable": true},
                {"name": "Giá bán", "orderable": true},
                {"name": "Nhóm hàng", "orderable": true},
                {"name": "Kho", "orderable": true},
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
                        <th/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Nhóm hàng</th>
                        <th>Kho</th>
                        <th/>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr className="text-rose">
                        <th className="disabled-sorting"/>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá bán</th>
                        <th>Nhóm hàng</th>
                        <th>Kho</th>
                        <th/>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        this.props.products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td>
                                        <img style={{
                                            width: "30px",
                                            height: "30px",
                                            borderRadius: "50%",
                                            verticalAlign: "middle",
                                            background: "url(" + product.avatar_url + ") center center / cover",
                                            display: "inline-block",
                                            float: "right",
                                            marginLeft: "3px"
                                        }} data-toggle="tooltip" title="" type="button"
                                             rel="tooltip"
                                             data-original-title="Batman"/>
                                    </td>
                                    <td style={{width: "130px"}}>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showAvatarModal(product)}>{product.code}</a>
                                    </td>
                                    <td style={{width: "130px"}}>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <a onClick={() => this.props.showPriceModal(product)}>
                                            {dotNumber(product.price)}đ
                                        </a>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item">Nike
                                            Air</a>
                                    </td>
                                    <td>
                                        <a className="text-name-student-register"
                                           rel="tooltip" title=""
                                           data-original-title="Remove item"
                                           onClick={() => this.props.showWareHouseModal(product)}>
                                            {
                                                !product.warehouses ? (
                                                    <p>Chưa có</p>
                                                ) : (
                                                    <p>{product.warehouses.length}</p>
                                                )
                                            }
                                        </a>
                                    </td>
                                    <td>
                                        <div className="btn-group-action">
                                            <Link to={`/good/${product.id}/edit`}
                                                  style={{color: "#878787"}}
                                                  data-toggle="tooltip" title=""
                                                  type="button" rel="tooltip"
                                                  data-original-title="Sửa"><i
                                                className="material-icons">edit</i></Link>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Xoá"><i
                                                className="material-icons">delete</i></a>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Ngừng kinh doanh">
                                                <i className="material-icons">pause</i></a>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
                <PriceModalContainer
                    showPriceModal={this.props.showPriceModal}/>
                <WareHouseModalContainer
                    showWareHouseModal={this.props.showWareHouseModal}/>
                <AvatarModalContainer
                    showAvatarModal={this.props.showAvatarModal}/>
            </div>
        );
    }
}

ProductListComponent.propTypes = {
    products: PropTypes.array.isRequired,
    showPriceModal: PropTypes.func.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    showAvatarModal: PropTypes.func.isRequired,
    setTable: PropTypes.func.isRequired
};

export default ProductListComponent;