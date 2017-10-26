import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {Link} from "react-router";
import Loading from "../../components/common/Loading";
import PropTypes from 'prop-types';
import * as goodActions from './goodActions';
import {Link} from "react-router";
import GoodList from "./GoodList";

class GoodListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.goodsSearchChange = this.goodsSearchChange.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
        this.loadGoods = this.loadGoods.bind(this);
        this.timeOut = null;
    }

    componentWillMount() {
        this.loadGoods();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.setState({page: 1});
            this.props.goodActions.loadGoods(1, "", nextProps.params.type);
        }
    }

    loadGoods(page = 1) {
        this.setState({page});
        this.props.goodActions.loadGoods(page, this.state.query, this.props.params.type);
    }

    goodsSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.goodActions.loadGoods(this.state.page, this.state.query);
        }.bind(this), 500);

    }

    render() {
        // const currentPage = this.state.page;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Sản phẩm</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to={`/good/${this.props.params.type}/create`} className="btn btn-rose">
                                    Thêm sản phẩm
                                </Link>
                            </div>

                            {/*<Search*/}
                            {/*onChange={this.goodsSearchChange}*/}
                            {/*value={this.state.query}*/}
                            {/*placeholder="Tìm kiếm sản phẩm (tên, mô tả)"/>*/}

                            {
                                this.props.isLoading ? <Loading/> : <GoodList goods={this.props.goods}/>
                            }
                        </div>

                        {/*<div className="card-content">*/}
                        {/*<ul className="pagination pagination-primary">*/}
                        {/*{_.range(1, this.props.totalPages + 1).map(page => {*/}
                        {/*if (Number(currentPage) === page) {*/}
                        {/*return (*/}
                        {/*<li key={page} className="active">*/}
                        {/*<a onClick={() => this.loadGoods(page)}>{page}</a>*/}
                        {/*</li>*/}
                        {/*);*/}
                        {/*} else {*/}
                        {/*return (*/}
                        {/*<li key={page}>*/}
                        {/*<a onClick={() => this.loadGoods(page)}>{page}</a>*/}
                        {/*</li>*/}
                        {/*);*/}
                        {/*}*/}

                        {/*})}*/}
                        {/*</ul>*/}
                        {/*</div>*/}
                    </div>


                </div>
            </div>
        );
    }
}

GoodListContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    goodActions: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    goods: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        totalPages: state.good.goodList.totalPages,
        currentPage: state.good.goodList.currentPage,
        goods: state.good.goodList.goods
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodListContainer);