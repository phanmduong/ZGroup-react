import React from "react";
import PropTypes from "prop-types";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import { confirm, generateDatatableLanguage } from "../../helpers/helper";

class PropertyList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.duplicate = this.duplicate.bind(this);
    }

    componentDidMount() {
        // Setup - add a text input to each footer cell
        $("#property-table tfoot th").each(function() {
            let title = $(this).text();
            if (title !== "") {
                $(this).html(
                    '<input class="form-control" type="text" placeholder="Tìm ' +
                        title.toLowerCase() +
                        '" />',
                );
            }
        });

        const table = $("#property-table").DataTable({
            columns: [
                { name: "Tên thuộc tính", orderable: true },
                { name: "Giá trị khả dụng", orderable: true },
                { name: "Đơn vị khả dụng", orderable: true },
                { name: "Người tạo", orderable: true },
                { name: "", orderable: false },
            ],
            language: generateDatatableLanguage("thuộc tính"),
            initComplete: function() {
                let r = $("#property-table tfoot tr");
                r.find("th").each(function() {
                    $(this).css("padding", 8);
                });
                $("#property-table thead").append(r);
                $("#search_0").css("text-align", "center");
            },
        });
        // Apply the search
        table.columns().every(function() {
            const that = this;

            $("input", this.footer()).on("keyup change", function() {
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });
        $.material.init();
        $(".form-group").css("margin-top", "0px");
        this.table = table;
    }

    duplicate(property) {
        this.props.duplicateProperty(property);
    }

    render() {
        return (
            <div className="table-responsive">
                <table id="property-table" className="table">
                    <thead>
                        <tr className="text-rose">
                            <th>Tên thuộc tính</th>
                            <th>Giá trị khả dụng</th>
                            <th>Đơn vị khả dụng</th>
                            <th>Người tạo</th>
                            <th />
                        </tr>
                    </thead>

                    <tfoot>
                        <tr className="text-rose">
                            <th>Tên thuộc tính</th>
                            <th>Giá trị khả dụng</th>
                            <th>Đơn vị khả dụng</th>
                            <th>Người tạo</th>
                            <th />
                        </tr>
                    </tfoot>

                    <tbody>
                        {this.props.propertyItems &&
                            this.props.propertyItems.map(item => {
                                return (
                                    <tr key={item.id} id={`tr${item.id}`}>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.prevalue
                                                .split(",")
                                                .join(", ")}
                                        </td>
                                        <td>
                                            {item.preunit.split(",").join(", ")}
                                        </td>
                                        <td>{item.creator.name}</td>
                                        <td>
                                            <ButtonGroupAction
                                                duplicate={this.duplicate}
                                                editUrl={
                                                    "/manufacture/property-item/" +
                                                    item.id +
                                                    "/edit"
                                                }
                                                delete={() => {
                                                    if (
                                                        confirm(
                                                            "warning",
                                                            "Xác nhận xoá",
                                                            "Bạn có chắc chắc muốn xoá thuộc tính này?",
                                                            () => {
                                                                this.props.deletePropertyItem(
                                                                    item.id,
                                                                );
                                                                this.table
                                                                    .row(
                                                                        $(
                                                                            `#tr${
                                                                                item.id
                                                                            }`,
                                                                        ),
                                                                    )
                                                                    .remove()
                                                                    .draw();
                                                            },
                                                        )
                                                    );
                                                }}
                                                object={item}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        );
    }
}

PropertyList.propTypes = {
    propertyItems: PropTypes.array.isRequired,
    deletePropertyItem: PropTypes.func.isRequired,
    duplicateProperty: PropTypes.func.isRequired,
};

export default PropertyList;
