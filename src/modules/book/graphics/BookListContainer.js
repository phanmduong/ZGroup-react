import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Loading from "../../../components/common/Loading";
import PropTypes from 'prop-types';
import * as goodActions from '../../good/goodActions';
import BookList from "./BookList";
import {Link} from "react-router";

class GoodListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentWillMount() {
        this.props.goodActions.loadGoods("book");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.props.goodActions.loadGoods(nextProps.params.type);
        }
    }

    deleteBook(good) {
        this.props.goodActions.deleteGood(good.id);
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
                                <div className="col-md-3">
                                    <Link className="btn btn-rose" to="/book/book/create">
                                        Tạo
                                    </Link>
                                </div>
                            </div>
                            {
                                this.props.isLoading ? <Loading/> :
                                    <BookList goods={this.props.goods} deleteBook={this.deleteBook}/>
                            }
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
    params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        goods: state.good.goodList.goods
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodListContainer);