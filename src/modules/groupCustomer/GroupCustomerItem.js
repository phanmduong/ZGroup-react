import React from 'react';
import PropTypes from 'prop-types';
import Avatar from "../../components/common/Avatar";


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
                   onClick={() => {
                       this.props.openEditModal(groupCustomerForm);
                   }}
                >
                    <div className="dropdown" style={{position: 'absolute', top: 10, right: 10}}>

                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown" aria-expanded="false"
                           onClick={() => {
                               this.props.openEditModal(groupCustomerForm);
                           }}
                        >
                            <i className="material-icons">edit</i>
                        </a>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                    <div className="row" style={{fontSize: 16, fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> {groupCustomerForm.name}
                    </div>
                    <div className="row" style={{
                        height: 5,
                        marginTop: 10,
                        marginBottom: 10,
                        background: 'rgb(205, 220, 57)'
                    }}/>
                    <div className="row" style={{textTransform: 'none', marginBottom: 10}}>
                        <span>{groupCustomerForm.description}</span>
                        <br/>
                        <br/>
                        1
                        thẻ
                        | {groupCustomerForm.customerCount}
                        khách hàng<br/>
                    </div>
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
                    {/*</div>*/}
                    <div className="ripple-container"/>
                </a>
            </div>

        );
    }
}

GroupCustomerItem.propTypes = {
    openEditModal: PropTypes.func,
    groupCustomerForm: PropTypes.object,

};
export default GroupCustomerItem;