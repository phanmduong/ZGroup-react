import React                            from 'react';
import PropTypes                        from 'prop-types';
import {bindActionCreators}             from 'redux';
import {connect}                        from 'react-redux';
import  * as landingPageActions            from './landingPageActions';
// import {linkUploadImageEditor}          from '../../constants/constants';
// import ReactEditor                      from '../../components/common/ReactEditor';
// import FormInputText                    from '../../components/common/FormInputText';
// import {Link}                           from 'react-router';
// import Loading                          from "../../components/common/Loading";
// import * as helper                      from '../../helpers/helper';
// import Search from "../../components/common/Search";

class LandingPageContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }

    render(){
        return (
            <div className="content">
                {/*<div className="container-fluid">*/}
                    {/*<div className="row">*/}
                        {/*<div className="col-md-12">*/}

                            {/*<div className="card">*/}
                                {/*<div className="card-header card-header-icon" data-background-color="rose">*/}
                                    {/*<i className="material-icons">assignment</i>*/}
                                {/*</div>*/}

                                {/*<div className="card-content">*/}
                                    {/*<h4 className="card-title">Danh sách Landing Page</h4>*/}
                                    {/*<div className="row">*/}
                                        {/*<div className="col-md-12">*/}
                                            {/*<div className="col-md-3">*/}
                                                {/*<a className="btn btn-rose" href="/build-landing-page">*/}
                                                    {/*Tạo landing page*/}
                                                {/*</a>*/}
                                            {/*</div>*/}
                                            {/*<Search*/}
                                                {/*className="col-md-9"*/}
                                                {/*placeholder="Tìm kiếm"*/}
                                                {/*value={this.state.query}*/}
                                                {/*onChange={this.courseSearchChange}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}

                                    {/*{this.props.isLoading ? <Loading/> :*/}
                                        {/*<ListCourse*/}
                                            {/*courses={this.props.coursesList}*/}
                                            {/*deleteCourse={this.deleteCourse}*/}
                                        {/*/>*/}
                                    {/*}*/}
                                    {/*<ul className="pagination pagination-primary">*/}
                                        {/*{_.range(1, this.props.paginator.total_pages + 1).map(page => {*/}

                                            {/*if (Number(this.state.page) === page) {*/}
                                                {/*return (*/}
                                                    {/*<li key={page} className="active">*/}
                                                        {/*<a onClick={() => {*/}
                                                            {/*this.loadCourses(page);*/}
                                                        {/*}}>{page}</a>*/}
                                                    {/*</li>*/}
                                                {/*);*/}
                                            {/*} else {*/}
                                                {/*return (*/}
                                                    {/*<li key={page}>*/}
                                                        {/*<a onClick={() => {*/}
                                                            {/*this.loadCourses(page);*/}
                                                        {/*}}>{page}</a>*/}
                                                    {/*</li>*/}
                                                {/*);*/}
                                            {/*}*/}
                                        {/*})}*/}
                                    {/*</ul>*/}
                                {/*</div>*/}


                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</div>*/}
            </div>
        );
    }
}


LandingPageContainer.propTypes = {
    isLoading           : PropTypes.bool.isRequired,
    isCommitting        : PropTypes.bool,
    data                : PropTypes.object,
    landingPageActions  : PropTypes.object.isRequired,
    params              : PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading           : state.lessons.isLoading,
        isCommitting        : state.lessons.isCommitting,
        data                : state.lessons.data
    };
}

function mapDispatchToProps(dispatch) {
    return {
        landingPageActions: bindActionCreators(landingPageActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPageContainer);

