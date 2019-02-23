import React from "react";
import PropTypes from "prop-types";
import * as blogActions from "./blogActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Avatar from "../../../components/common/Avatar";
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import {loadGapi} from "../GapiClass";
import FormInputDate from "../../../components/common/FormInputDate";
import {googleAnalyticMetrics, googleAnalyticDimensions} from "../../../constants/constants";

class ListPost extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.data =
            [
                {
                    id: this.props.id,
                    query: {
                        metrics: googleAnalyticMetrics.bounceRate,
                        dimensions: googleAnalyticDimensions.date,
                        filters: 'ga:pagePath==/blog/' + this.props.slug,
                    },
                    chart: {
                        type: 'LINE',
                        options: {
                            // legend: 'none',
                            lineWidth: "10px",
                            "line-width": "10px",

                            width: '100%'
                        }
                    }
                },

            ];

        this.state = {
            selectedMenu: []
        };
    }

    componentDidMount() {
        let now = moment();
        this.data = this.props.posts.map(obj => {
            return {
                id: obj.id,
                query: {
                    metrics:
                        googleAnalyticMetrics.pageViews
                        + "," + googleAnalyticMetrics.bounceRate
                        + "," + googleAnalyticMetrics.sessions
                        + "," + googleAnalyticMetrics.averageTimeOnPage
                    ,

                    dimensions: googleAnalyticDimensions.date,
                    filters: 'ga:pagePath==/' + obj.kind + "/" + obj.slug,
                    // filters: 'ga:pagePath==/blog/don-dau-xu-huong-2019-bold-typography-54722',
                    'start-date': moment(now).subtract(7, 'day').day(0).format(DATE_FORMAT_SQL),
                    'end-date': moment(now).format(DATE_FORMAT_SQL),
                },
                chart: {
                    type: 'LINE',
                    options: {
                        width: '100%',
                        animation: {
                            startup: true,
                            duration: 500,
                            easing: 'out',
                        },
                        lineWidth: 1,
                        pointSize: 0,
                        colors: ['#4285f4', '#e94335', '#f5bc04', '#52a853'],
                        // legend: { position: 'right' },
                        chartArea: {
                            right: 20,
                            left: 0,
                            // bottom:20,
                            // top:15
                        },

                    },

                    // legend: "left",


                }
            };
        });
        this.setState({selectedMenu: this.props.posts.map(() => 0)});
        loadGapi(this.data);

    }


    // componentWillReceiveProps(nextProps) {
    //
    // }

    onChangeDate = (e, name, index) => {
        let obj = {...this.data[index]};
        obj.query = {...obj.query, [name]: e.target.value};
        this.data[index] = obj;
        if (this.props.inited) {
            loadGapi([this.data[index]]);
        }

    }

    render() {
        return (
            <div>

                {this.props.posts && this.props.posts.map((post, index) => {
                    let dataObj = this.data[index] ? this.data[index] : {query: {}};
                    return (

                        <div className="" key={post.id}>
                            <div
                                // className="col-md-12"
                                className="col-md-9"
                            >

                                <div className="card">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="card-content">
                                                <div
                                                    id="simpleBarChart"
                                                    className="ct-chart"
                                                    style={{
                                                        width: "100%",
                                                        background:
                                                            "url(" +
                                                            post.image_url +
                                                            ")",
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                        height: "200px",
                                                        borderRadius: "10px",
                                                        position: "relative"
                                                    }}
                                                >

                                                </div>
                                                <div className="card-action">
                                                    <h4 className="card-title" style={{margin: "20px 0px"}}>
                                                        <a href={`/blog/${post.id}/editor`} target="_blank">
                                                            {post.title ? post.title : "Chưa có tên"}
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    height: 40
                                                }}>
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}>
                                                        {post.author.avatar_url ? (<Avatar
                                                            size={40}
                                                            url={post.author.avatar_url}
                                                            style={{borderRadius: 6}}
                                                        />) : null}
                                                        <div>
                                                            <strong>{post.author.name}</strong>
                                                            <br/>
                                                            <p className="category"
                                                               style={{fontSize: 12}}>{post.created_at}</p>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-8 padding-horizontal-30px">

                                            <div id={"chart-" + post.id + "-container"}></div>

                                            {!this.props.isLoadingPosts && <div className="row">
                                                <div className="col-md-2">
                                                    <FormInputDate value={dataObj.query['start-date']}
                                                                   format={DATE_FORMAT_SQL}
                                                                   name={'start-date' + index}
                                                                   id={'start-date' + index}
                                                                   updateFormData={(e) => this.onChangeDate(e, 'start-date', index)}
                                                    /></div>
                                                <div className="col-md-2">
                                                    <FormInputDate value={dataObj.query['end-date']}

                                                                   format={DATE_FORMAT_SQL}
                                                                   name={'end-date' + index}
                                                                   id={'end-date-' + index}
                                                                   updateFormData={e => this.onChangeDate(e, 'end-date', index)}
                                                    /></div>
                                            </div>}

                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="col-md-3">

                                <div className="card" style={{
                                    backgroundColor: "#4285f4",
                                    paddingBottom: "100%",
                                    // borderRadius: 10
                                }}></div>

                            </div>

                        </div>
                    );
                })}

            </div>
        );
    }
}

ListPost.propTypes = {
    posts: PropTypes.array.isRequired,
    blogActions: PropTypes.object.isRequired
    // loadByCategories: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        posts: state.blog.posts,
        categories: state.blog.categories,
        isLoadingPosts: state.blog.isLoadingPosts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
