import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import Search from "../../components/common/Search";
import * as goodActions from './goodActions';
import * as _ from "lodash";
import Loading from "../../components/common/Loading";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import {confirm} from "../../helpers/helper";


class PropertiesListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.propertiesSearchChange = this.propertiesSearchChange.bind(this);
        this.state = {
            query: ""
        };
        this.loadPropertyItems = this.loadPropertyItems.bind(this);
        this.timeOut = null;
    }

    componentWillMount() {
        this.props.goodActions.loadGoodPropertyItems(1, this.state.query, this.props.route.type);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.route.type !== this.props.route.type) {
            this.props.goodActions.loadGoodPropertyItems(1, this.state.query, nextProps.route.type);
        }

    }

    propertiesSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.goodActions.loadGoodPropertyItems(this.state.page, this.state.query, this.props.route.type);
        }.bind(this), 500);
    }

    loadPropertyItems(page = 1) {
        this.setState({page});
        this.props.goodActions.loadGoodPropertyItems(page, this.state.query, this.props.route.type);
    }

    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">


                    <div className="card">

                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>

                        <div className="card-content">
                            <h4 className="card-title">Thuộc tính sách</h4>

                            <div style={{marginTop: "15px"}}>
                                <Link to={`/${this.props.route.type}-property/create`} className="btn btn-rose">
                                    Thêm thuộc tính
                                </Link>
                            </div>

                            <Search
                                onChange={this.propertiesSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm thuộc tính"
                            />

                            <table className="table table-responsive">
                                <thead>
                                <tr className="text-rose">
                                    <th>Tên thuộc tính</th>
                                    <th>Giá trị khả dụng</th>
                                    <th>Đơn vị khả dụng</th>
                                    <th>Người tạo</th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    !this.props.isLoading && this.props.propertyItems.map((item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{item.name}</td>
                                                <td>{item.prevalue}</td>
                                                <td>{item.preunit}</td>
                                                <td>{item.creator.name}</td>
                                                <td>
                                                    <ButtonGroupAction
                                                        editUrl={"/property-item/" + item.id + "/edit"}
                                                        delete={() => {
                                                            if (confirm("warning", "Xác nhận xoá", "Bạn có chắc chắc muốn xoá thuộc tính này?",
                                                                    () => {
                                                                        this.props.goodActions.deletePropertyItem(item.id);
                                                                    })) ;

                                                        }}
                                                        object={item}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                            {this.props.isLoading && <Loading/>}
                        </div>

                        <div className="card-content">
                            <ul className="pagination pagination-primary">
                                {_.range(1, this.props.totalPages + 1).map(page => {
                                    if (Number(this.props.currentPage) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadPropertyItems(page)}>{page}</a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadPropertyItems(page)}>{page}</a>
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

PropertiesListContainer.propTypes = {
    propertyItems: PropTypes.array.isRequired,
    route: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    goodActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        propertyItems: state.good.propertyItem.propertyItems,
        isLoading: state.good.propertyItem.isLoading,
        currentPage: state.good.propertyItem.currentPage,
        totalPages: state.good.propertyItem.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesListContainer);