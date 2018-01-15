import React from 'react';

class CompaniesList extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state          = {
        };
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
                        <th>Địa chỉ văn phòng</th>
                        <th>Lĩnh vực</th>
                        <th>Số điện thoại liên hệ</th>
                        <th>Mã số thuế</th>
                        <th>Loại</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.data.map((pp) => {
                           return(
                                <tr key={pp.id}>
                                    <td/>
                                    <td>{pp.partner_code}</td>
                                    <td>{pp.name}</td>
                                    <td>{pp.office_address}</td>
                                    <td>{pp.field.name}</td>
                                    <td>{pp.phone_company}</td>
                                    <td>{pp.tax_code}</td>
                                    <td>{
                                        (pp.type === "provided") ? "Cung cấp" :
                                            (pp.type === "share") ? "Phân phối" : "Khác"
                                    }</td>
                                    <td/>
                                </tr>
                           );
                        })
                    }
                    </tbody>
                    <table>

                    </table>
                </table>
            </div>
        );
    }
}
export default CompaniesList;