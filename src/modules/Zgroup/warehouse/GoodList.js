import React from "react";
import PropTypes from "prop-types";


class GoodList extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <div>
                {/*<div className="table-responsive" style={{minHeight: 400}}>*/}

                    <table id="datatables"
                           className="table table-hover"
                           cellSpacing="0" width="100%" style={{width: "100%"}}>
                        <thead className="text-rose">
                        <tr>
                            <th/>
                            <th>STT</th>
                            <th>Tên sản phẩm</th>
                            <th>Tồn kho Hà Nội</th>
                            <th>Tồn kho Sài Gòn</th>
                            <th> Tồn kho lỗi Hà Nội </th>
                            <th> Tồn kho lỗi Sài Gòn </th>


                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.props.data && this.props.data.map((pp,index) =>{
                                //let sum =0;
                                return(
                                        <tr key={index} style={checkSumQuantity(pp)}>
                                            <td/>
                                            <td> {index+1} </td>
                                            <td><a onClick={() => this.props.openModal(pp.id)}> {pp.name} </a>
                                            </td>
                                            {
                                                pp.summary_warehouse.map((warehouse,dm) => {
                                                    //sum+=warehouse.sum_quantity;
                                                    return(
                                                        <td key={dm}>{warehouse.sum_quantity} </td>

                                                    );
                                                })
                                            }

                                        </tr>
                                    );
                            })
                        }
                        </tbody>
                    </table>
                </div>
            // </div>
        );
    }
}
GoodList.propTypes = {
    data: PropTypes.array.isRequired,
    openModal: PropTypes.func,
};
export default GoodList;

const warningStyle = {
  backgroundColor: "darksalmon"
};

function checkSumQuantity(arr) {
    let check = arr.summary_warehouse[0].sum_quantity < 100 || arr.summary_warehouse[1].sum_quantity < 100;
    return check ? warningStyle : {};
}