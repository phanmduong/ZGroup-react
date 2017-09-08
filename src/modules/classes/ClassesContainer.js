/**
 * Created by phanmduong on 9/6/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import Loading from '../../components/common/Loading';
import Search from '../../components/common/Search';
import * as classActions from './classActions';
import ListClass from './ListClass';
import PropTypes from 'prop-types';

class ClassesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: "",
        };
        this.timeOut = null;
        this.loadClasses = this.loadClasses.bind(this);
        this.classesSearchChange = this.classesSearchChange.bind(this);
    }

    componentWillMount() {
        this.loadClasses();
    }

    classesSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.classActions.loadClasses(this.state.query, this.state.page);
        }.bind(this), 500);
    }

    loadClasses(page = 1) {
        this.setState({page});
        this.props.classActions.loadClasses(this.state.query, page);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Danh sách lớp học</h4>
                        <Search
                            onChange={this.classesSearchChange}
                            value={this.state.query}
                            placeholder="Tìm kiếm lớp"
                        />

                        {this.props.isLoading ? <Loading/> :
                            <div>
                                <ListClass
                                    classes={this.props.classes}
                                />
                                <ul className="pagination pagination-primary">
                                    {_.range(1, this.props.totalPages + 1).map(page => {
                                        if (Number(this.state.page) === page) {
                                            return (
                                                <li key={page} className="active">
                                                    <a onClick={() => this.loadClasses(page)}>{page}</a>
                                                </li>
                                            );
                                        } else {
                                            return (
                                                <li key={page}>
                                                    <a onClick={() => this.loadClasses(page)}>{page}</a>
                                                </li>
                                            );
                                        }

                                    })}
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

ClassesContainer.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    classes: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    classActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        currentPage: state.classes.currentPage,
        totalPages: state.classes.totalPages,
        classes: state.classes.classes,
        isLoading: state.classes.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        classActions: bindActionCreators(classActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesContainer);
