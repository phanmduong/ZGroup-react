import React  from "react";
import {Link} from 'react-router';

class ItemOrderContainer extends React.Component{
    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-3">
                            <Link className="btn btn-rose" to="/business/import-order/item/create">
                                <i className="material-icons">add
                                </i>
                                    Tạo đơn nhập hàng
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (ItemOrderContainer);