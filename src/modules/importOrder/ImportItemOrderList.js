import React from "react";
import PropTypes from "prop-types";

class ImportItemOrderList extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.sumPrice = this.sumPrice.bind(this);
    }
    sumPrice(obj){
        let sum =0;
        let arr = obj.goods;
        arr.forEach(e => {
            sum += e.price * e.imported_quantity;
        });
        return sum;
    }
    render() {
        return (
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>STT</th>
                        <th>Nhà cung cấp</th>
                        <th> Số sản phẩm </th>

                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((pp,index) => {
                            return (
                                <tr key={pp.id}>
                                    <td/>
                                    <td> {index +1 } </td>
                                    <td>  { pp.company.name}</td>
                                    <td> {pp.goods.length} </td>

                                    <td>

                                            <a data-toggle="tooltip" title="Duyệt"
                                               type="button"
                                               onClick={()=>{}}
                                               rel="tooltip"
                                            >
                                                <i className="material-icons">done</i>
                                            </a>

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
ImportItemOrderList.propTypes = {
    data: PropTypes.array.isRequired,
};

export default (ImportItemOrderList);