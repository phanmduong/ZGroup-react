import React from 'react';
import PropTypes from 'prop-types';


class GroupCustomerItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let groupCustomerForm = this.props.groupCustomerForm;
        return (
            <div className="col-md-4 col-sm-6" key={groupCustomerForm.id}>
                <a className="btn btn-default btn-lg"
                   style={{
                       width: '100%',
                       background: 'white',
                       color: 'rgb(69, 90, 100)',
                       textAlign: 'left'
                   }}
                   onClick={(e) => {
                       this.props.openEditModal(groupCustomerForm);
                       e.stopPropagation();
                   }}
                >






                    <div className="dropdown" style={{position: "absolute", top: "10px", right: "10px"}}>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown">
                            <i className="material-icons">more_horiz</i>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-right hover-dropdown-menu">

                            <li className="more-dropdown-item">
                                <a onClick={() => {
                                       this.props.openEditModal(groupCustomerForm);
                                   }}
                                >
                                    <i className="material-icons">edit</i> Sửa nhóm
                                </a>
                            </li>
                            <li className="more-dropdown-item">
                                <a onClick={(event) => {
                                    event.stopPropagation(event);
                                    this.props.deleteGroupCustomer(groupCustomerForm.id, groupCustomerForm.name);}}
                                >
                                    <i className="material-icons">delete</i> Xóa nhóm
                                </a>
                            </li>
                        </ul>
                    </div>












                    <div className="row" style={{fontSize: 16, fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> {groupCustomerForm.name}
                    </div>
                    <div className="row" style={{
                        height: 5,
                        marginTop: 10,
                        marginBottom: 10,
                        background: groupCustomerForm.color
                    }}/>
                    <div className="row" style={{textTransform: 'none', marginBottom: 10}}>
                        <span>{groupCustomerForm.description}</span>
                        <br/>
                        <br/>
                        1
                        thẻ
                        | {groupCustomerForm.customers.length}
                        khách hàng<br/>
                    </div>






                            {/*                           AVATAR                             */}

                    {/*<div className="row"*/}
                         {/*style={{display: 'flex', flexFlow: 'row-reverse wrap', height: 29}}>*/}
                        {/*<div style={{padding: '2px 0px'}}>*/}
                            {/*<div style={{*/}
                                {/*width: 25,*/}
                                {/*marginRight: 5,*/}
                                {/*height: 25,*/}

                            {/*}}>*/}
                                {/*<div style={{*/}
                                    {/*backgroundPosition: 'center center',*/}
                                    {/*backgroundSize: 'cover',*/}
                                    {/*borderRadius: 4,*/}
                                {/*}}*/}

                                {/*>*/}
                                    {/*{groupCustomerForm.customers.map((customer) => {*/}
                                        {/*return (*/}
                                            {/*<Avatar size={20} url={customer.avatar_url} key={customer.id}*/}
                                            {/*/>*/}
                                        {/*);*/}
                                    {/*})}*/}
                                {/*</div>*/}
                            {/*</div>*/}

                        {/*</div>*/}
                    {/*</div>                                   THÊM AVATAR VÀO THẺ              */}







                    <div className="ripple-container"/>
                </a>
            </div>

        );
    }
}

GroupCustomerItem.propTypes = {
    openEditModal: PropTypes.func,
    deleteGroupCustomer: PropTypes.func,
    groupCustomerForm: PropTypes.object,

};
export default GroupCustomerItem;