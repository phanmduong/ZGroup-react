import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../../components/common/Loading";
import PropTypes from 'prop-types';
import * as goodActions from '../../good/goodActions';
import BookList from "./BookList";
import {Link} from "react-router";
import Pagination from "../../../components/common/Pagination";
import Search from "../../../components/common/Search";

class GoodListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: ''
        };
        this.deleteBook = this.deleteBook.bind(this);
        this.loadBooks = this.loadBooks.bind(this);
        this.booksSearchChange = this.booksSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadBooks();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.props.goodActions.loadGoods(nextProps.params.type);
        }
    }

    booksSearchChange(value) {
        this.setState({
            page: 1,
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.goodActions.loadGoods("book", 1, value);
        }.bind(this), 500);
    }

    deleteBook(good) {
        this.props.goodActions.deleteGood(good.id);
    }

    loadBooks(page = 1) {
        this.setState({page: page});
        this.props.goodActions.loadGoods("book", page, this.state.query);
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
                            <h4 className="card-title">Sản phẩm</h4>
                            <div className="row">
                                <div className="col-md-2">
                                    <Link className="btn btn-rose" to="/book/book/create">
                                        Tạo
                                    </Link>
                                </div>
                                <div className="col-md-10">
                                    <Search
                                        onChange={this.booksSearchChange}
                                        value={this.state.query}
                                        placeholder="Nhập tên hoặc mã sách"
                                    />
                                </div>
                            </div>
                            {
                                this.props.isLoading ? <Loading/> :
                                    <BookList goods={this.props.goods} deleteBook={this.deleteBook}/>
                            }
                            <Pagination
                                totalPages={this.props.totalPages}
                                currentPage={this.state.page}
                                loadDataPage={this.loadBooks}
                            />
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
    goods: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        goods: state.good.goodList.goods,
        currentPage: state.good.goodList.currentPage,
        totalPages: state.good.goodList.totalPages,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodListContainer);