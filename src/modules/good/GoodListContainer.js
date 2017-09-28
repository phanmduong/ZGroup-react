import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Link} from "react-router";
import Search from "../../components/common/Search";
import _ from 'lodash';
import Loading from "../../components/common/Loading";
import PropTypes from 'prop-types';
import * as goodActions from './goodActions';

class GoodListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.goodsSearchChange = this.goodsSearchChange.bind(this);
        this.state = {
            page: 1,
            query: ""
        };
        this.loadGoods = this.loadGoods.bind(this);
    }

    componentWillMount() {
        this.loadGoods();
    }

    loadGoods(page = 1) {
        this.setState({page})

    }

    goodsSearchChange() {

    }

    render() {
        const currentPage = this.state.page;
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
                                <Link to="/good/create" className="btn btn-rose">
                                    Thêm sản phẩm
                                </Link>
                            </div>


                            <Search
                                onChange={this.goodsSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                            />

                            {
                                this.props.isLoading ? <Loading/> : (
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr className="text-rose">
                                                <th>Tên sản phẩm</th>
                                                <th>Mã sản phẩm</th>
                                                <th>Thêm vào lúc</th>
                                                <th>Sửa gần nhất</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>

                                            </tbody>
                                        </table>
                                    </div>
                                )
                            }
                        </div>

                        <div className="card-content">
                            <ul className="pagination pagination-primary">
                                {_.range(1, this.props.totalPages + 1).map(page => {
                                    if (Number(currentPage) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadBases(page)}>{page}</a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadBases(page)}>{page}</a>
                                            </li>
                                        );
                                    }

                                })}
                            </ul>
                        </div>
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
    currentPage: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        totalPages: state.good.goodList.totalPages,
        currentPage: state.good.goodList.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodListContainer);