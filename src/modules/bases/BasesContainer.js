import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Link from "react-router/es/Link";
import Search from "../../components/common/Search";
import ListBase from "./ListBase";
import Loading from "../../components/common/Loading";
// Import actions here!!
import * as baseListActions from './baseListActions';

class BasesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.basesSearchChange = this.basesSearchChange.bind(this);
    }

    componentWillMount() {
        let page = 1;
        if (this.props.location.query.page) {
            page = 1;
        }
        page = this.props.location.query.page;

    }

    basesSearchChange() {

    }


    render() {
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <ul className="nav nav-tabs">
                        <li className="active"><Link to="/manage/quan-li-nhan-su">Cơ sở</Link></li>
                    </ul>

                    <div style={{marginTop: "15px"}}>
                        <Link to="/create-base" className="btn btn-primary">
                            Thêm cơ sở
                        </Link>
                    </div>
                    <Search
                        onChange={this.basesSearchChange}
                        value={this.value}
                        placeholder="Tìm kiếm cơ sở (tên, địa chỉ)"
                    />
                    {this.props.isLoadingBases ? <Loading/> : <ListBase bases={this.props.bases}/>}
                    <ul className="pagination">

                        <li><a href="#">1</a></li>
                        <li><Link to={"/base/list?page=" + 2}>2</Link></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

BasesContainer.propTypes = {
    isLoadingBases: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    baseListActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        bases: state.baseList.bases,
        isLoadingBases: state.baseList.isLoadingBases,
        totalPages: state.baseList.totalPages,
        currentPage: state.baseList.currentPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        baseListActions: bindActionCreators(baseListActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BasesContainer);