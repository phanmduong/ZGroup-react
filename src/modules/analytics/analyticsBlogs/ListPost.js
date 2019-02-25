import React from "react";
import PropTypes from "prop-types";
import * as blogActions from "./blogActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Avatar from "../../../components/common/Avatar";
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import {loadGapi, googleCodes} from "../GapiClass";
import FormInputDate from "../../../components/common/FormInputDate";
import {googleAnalyticMetrics, googleAnalyticDimensions} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";

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
        this.facebookCode=[
            {label:"Like", icon_url:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzAiIGhlaWdodD0iMzAiCnZpZXdCb3g9IjAgMCAyMjQgMjI0IgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDIyNHYtMjI0aDIyNHYyMjR6IiBmaWxsPSIjNDI4NWY0Ij48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE3OS4yLDI5Ljg2NjY3aC0xMzQuNGMtOC4yNTA2NywwIC0xNC45MzMzMyw2LjY4MjY3IC0xNC45MzMzMywxNC45MzMzM3YxMzQuNGMwLDguMjUwNjcgNi42ODI2NywxNC45MzMzMyAxNC45MzMzMywxNC45MzMzM2g3NC42NjY2N3YtNjcuMmgtMjIuNHYtMjIuNGgyMi40di0xMi4wMjg4YzAsLTIyLjc3MzMzIDExLjA5NTQ3LC0zMi43NzEyIDMwLjAyMzQ3LC0zMi43NzEyYzkuMDY0NTMsMCAxMy44NTgxMywwLjY3MiAxNi4xMjgsMC45NzgxM3YyMS40MjE4N2gtMTIuOTA5ODdjLTguMDM0MTMsMCAtMTAuODQxNiw0LjI0MTA3IC0xMC44NDE2LDEyLjgyNzczdjkuNTcyMjdoMjMuNTQ5ODdsLTMuMTk1NzMsMjIuNGgtMjAuMzU0MTN2NjcuMmgzNy4zMzMzM2M4LjI1MDY3LDAgMTQuOTMzMzMsLTYuNjgyNjcgMTQuOTMzMzMsLTE0LjkzMzMzdi0xMzQuNGMwLC04LjI1MDY3IC02LjY5MDEzLC0xNC45MzMzMyAtMTQuOTMzMzMsLTE0LjkzMzMzeiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"},
            {label:"Share", icon_url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVEhL5ZTdCcIwGEXji08dwxU6jvNYBEdwnk5SqSOIiN4DLYSQiqY3IHjhQEjh+71N+HttxVEME910Z9NBPBO4s+ki0gR0YtFO3IU9QSMYw02kwaF4RBuxF/NYHuIsTuIqqJzgRUtuRS/mKjlz97Vi21EV1VEl1RKY6umCboqUsx0wb74x/1XK2Q6n4BiLqieoPiKWTCCWPAr7kpdks+k7ffKjWV7Tak9FqmqPXaycra0Jcra2jQjFtgbOq5f8SwrhBVurcqwHat4EAAAAAElFTkSuQmCC"},
        ];
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
                                    // padding: "10px 30px"
                                }}>
                                    <div className="row" style={{padding:"10px 30px"}}>
                                        {googleCodes.map((element, key) => {
                                            return (
                                                <div className="col-md-6" key={key}
                                                     style={{padding: 10, color: "white"}}>
                                                    <div style={{fontWeight: 600,}}>{element.label}</div>
                                                    <div
                                                        style={{fontSize: 20, lineHeight: "20px"}}
                                                         id={"side-info-" + key + "-" + post.id}><Loading text={" "}/></div>
                                                </div>
                                            );
                                        })}


                                    </div>
                                    <div
                                        // className="col-md-12"
                                        style={{height: 1, backgroundColor: "white"}}/>
                                    <div className="row" style={{padding:"10px 30px"}}>

                                        {this.facebookCode.map((element, key) => {
                                            return (
                                                <div className="col-md-6" key={key}
                                                     style={{padding: 10, color: "white"}}>
                                                    <div style={{fontWeight: 600,}}>{element.label}</div>
                                                    <img src={element.icon_url}/>
                                                    {/*<div style={{fontSize: 50, lineHeight: "55px"}}*/}
                                                         {/*id={"side-info-" + key + "-" + post.id}></div>*/}
                                                </div>
                                            );
                                        })}


                                    </div>
                                </div>

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
