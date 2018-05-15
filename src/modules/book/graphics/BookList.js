import React from 'react';
import PropTypes from 'prop-types';
// import {generateDatatableLanguage} from "../../../helpers/helper";
import ButtonGroupAction from "../../../components/common/ButtonGroupAction";

class GoodList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

        // // Setup - add a text input to each footer cell
        // $('#good-table tfoot th').each(function () {
        //     let title = $(this).text();
        //     if (title !== "") {
        //         $(this).html('<input class="form-control" type="text" placeholder="Tìm ' + title.toLowerCase() + '" />');
        //     }
        // });
        //
        //
        // const table = $('#good-table').DataTable({
        //     columns: [
        //         {"name": "Tên sản phẩm", "orderable": true},
        //         {"name": "Mã sản phẩm", "orderable": true},
        //         {"name": "Mô tả", "orderable": true},
        //         {"name": "Thêm vào lúc", "orderable": true},
        //         {"name": "Sửa gần nhất", "orderable": true},
        //         {"name": "", "orderable": false}
        //     ],
        //     "language": generateDatatableLanguage("sản phẩm"),
        //     initComplete: function () {
        //         let r = $('#good-table tfoot tr');
        //         r.find('th').each(function () {
        //             $(this).css('padding', 8);
        //         });
        //         $('#good-table thead').append(r);
        //         $('#search_0').css('text-align', 'center');
        //     },
        // });
        // // Apply the search
        // table.columns().every(function () {
        //     const that = this;
        //
        //     $('input', this.footer()).on('keyup change', function () {
        //         if (that.search() !== this.value) {
        //             that
        //                 .search(this.value)
        //                 .draw();
        //         }
        //     });
        // });
        // $.material.init();
        // $(".form-group").css("margin-top", "0px");
    }

    render() {
        return (
            <div className="table-responsive">
                <table id="good-table" className="table">
                    <thead>
                    <tr className="text-rose">
                        <th>Tên sản phẩm</th>
                        <th>Mã sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Thêm vào lúc</th>
                        <th>Sửa gần nhất</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.goods.map((good) => {
                            return (
                                <tr key={good.id}>
                                    <td>
                                        <a className="text-rose" href={`/manufacture/good/${good.id}/edit`}>
                                            {good.name}
                                        </a>
                                    </td>
                                    <td>{good.code}</td>
                                    <td>{good.description}</td>
                                    <td>{good.created_at}</td>
                                    <td>{good.updated_at}</td>
                                    <td>
                                        <ButtonGroupAction
                                            edit={() => {
                                                window.open(`/manufacture/good/${good.id}/edit`, '_self');
                                            }}
                                            delete={this.props.deleteBook}
                                            object={good}
                                        />
                                    </td>
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

GoodList.propTypes = {
    goods: PropTypes.array.isRequired,
    deleteBook: PropTypes.func
};

export default GoodList;