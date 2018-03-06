import React from "react";
import PropTypes from 'prop-types';

class CompaniesList extends React.Component{
    constructor(props, context) {
        super(props, context);
    }
    render(){
        return(
            <div className="table-responsive">

                <table id="datatables"
                       className="table table-hover"
                       cellSpacing="0" width="100%" style={{width: "100%"}}>
                    <thead className="text-rose">
                    <tr>
                        <th/>
                        <th>Mã đối tác</th>
                        <th>Tên công ty</th>
                        <th> Loại </th>
                        <th>Dư nợ</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((pp) => {
                            return (
                                <tr key={pp.id}>
                                    <td/>
                                    <td>
                                       {pp.partner_code}
                                    </td>
                                    <td>
                                        <a onClick={()=> this.props.openInfoModal(pp.id)}>{pp.name} </a>
                                        </td>
                                    <td>{
                                        (pp.type === "provided") ? "Cung cấp" :
                                            (pp.type === "share") ? "Phân phối" : "Khác"
                                    }</td>
                                    <td>
                                        {pp.account_value}
                                    </td>
                                    <td/>
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
CompaniesList.propTypes = {
    data: PropTypes.array.isRequired,
    openInfoModal: PropTypes.func.isRequired,
};
export  default (CompaniesList);