import React from 'react';
import PropTypes from 'prop-types';


class GroupCustomerItem extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="col-md-4 col-sm-6">
                <a className="btn btn-default btn-lg"
                   style={{
                       width: '100%',
                       background: 'white',
                       color: 'rgb(69, 90, 100)',
                       textAlign: 'left'
                   }}
                onClick={()=> {this.props.openModal();}}
                >
                    <div className="dropdown" style={{position: 'absolute', top: 10, right: 10}}>

                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown" aria-expanded="false"
                           onClick={()=> {this.props.openModal();}}
                        >
                            <i className="material-icons">edit</i>
                        </a>
                        <a className="dropdown-toggle btn-more-dropdown" type="button"
                           data-toggle="dropdown" aria-expanded="false">
                            <i className="material-icons">delete</i>
                        </a>
                    </div>
                    <div className="row" style={{fontSize: 16, fontWeight: 600}}>
                        <i className="material-icons">account_balance_wallet</i> Dự
                        án 1
                    </div>
                    <div className="row" style={{
                        height: 5,
                        marginTop: 10,
                        marginBottom: 10,
                        background: 'rgb(205, 220, 57)'
                    }}/>
                    <div className="row" style={{textTransform: 'none', marginBottom: 10}}>
                        <span>Mô tả: jsdfnks dnckjsnd kjndkjx sn</span>
                        <br/>
                        <br/>
                        1
                        thẻ
                        | 100
                        khách hàng<br/>
                    </div>
                    <div className="row"
                         style={{display: 'flex', flexFlow: 'row-reverse wrap', height: 29}}>
                        <div style={{padding: '2px 0px'}}>
                            <div style={{
                                width: 25,
                                marginRight: 5,
                                height: 25,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                borderRadius: 4,
                                backgroundImage: 'url("http://d1j8r0kxyu9tj8.cloudfront.net/user.png")'
                            }}/>
                        </div>
                    </div>
                    <div className="ripple-container"/>
                </a>
            </div>

        );
    }
}

GroupCustomerItem.propTypes = {
    openModal: PropTypes.func,

};
export default GroupCustomerItem;