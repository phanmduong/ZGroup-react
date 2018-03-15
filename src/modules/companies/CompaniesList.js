import React from 'react';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

class CompaniesList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
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
                        <th>Mã đối tác</th>
                        <th>Tên công ty</th>
                        <th>Địa chỉ văn phòng</th>
                        <th>Lĩnh vực</th>
                        <th>Số điện thoại liên hệ</th>
                        <th>Loại</th>
                        <th/>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {

                        this.props.data && this.props.data.map((pp) => {
                            return (
                                <tr key={pp.id}>
                                    <td/>
                                    <td>
                                        <a onClick={() => {
                                            return this.props.openInfoModal(pp);
                                        }}>
                                            {pp.partner_code}</a>

                                    </td>
                                    <td>{pp.name}</td>
                                    <td>{pp.office_address}</td>
                                    <td>{pp.field.name}</td>
                                    <td>{pp.phone_company}</td>
                                    <td>{
                                        (pp.type === "provided") ? "Cung cấp" :
                                            (pp.type === "share") ? "Phân phối" : "Khác"
                                    }</td>
                                    <td>
                                        <div className="btn-group-action">
                                            <div style={{display: "inline-block"}}>
                                                <Link data-toggle="tooltip" title="Sửa"
                                                      to={"/business/company/edit/" + pp.id}
                                                      type="button" rel="tooltip">
                                                    <i className="material-icons">edit</i>
                                                </Link>
                                            </div>
                                        </div>
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
    editCompany: PropTypes.func,
    openInfoModal: PropTypes.func,
};
export default CompaniesList;