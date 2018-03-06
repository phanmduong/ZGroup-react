import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderGoodActions from "./orderGoodAction";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";
//import * as helper from "../../../helpers/helper";

class OrderGoodContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
        };
    }

    componentWillMount() {
        
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    

    render() {
        let {isLoading} = this.props;
        //let {data, showAddModal, addModalData} = this.state;
        
        return (
                    <div className="content">
                        <div className="container-fluid">
                            {(isLoading) ? <Loading/> :
                                <Loading/>}
                        </div>
                        
                    </div>

        );
    }
}

OrderGoodContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    orderGoodActions: PropTypes.object,
    
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderGood.isLoading,
        
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderGoodActions: bindActionCreators(orderGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderGoodContainer);
