import React from "react";
import PropTypes from "prop-types";
import * as blogActions from "../../blog/actions/blogActions";
// import * as blogActions from "./blogActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Avatar from "../../../components/common/Avatar";
import moment from "moment";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import {loadGapi, googleCodes} from "./GapiClass";
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
                    },

                },

            ];
        this.state = {
            selectedMenu: []
        };
        this.facebookCode = [
            {
                label: "Like",
                code: "like",
                icon_url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTAiIGhlaWdodD0iOTAiCnZpZXdCb3g9IjAgMCAxOTIgMTkyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE5MnYtMTkyaDE5MnYxOTJ6IiBmaWxsPSIjNDI4NWY0Ij48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE1My42LDI1LjZoLTExNS4yYy03LjA3MiwwIC0xMi44LDUuNzI4IC0xMi44LDEyLjh2MTE1LjJjMCw3LjA3MiA1LjcyOCwxMi44IDEyLjgsMTIuOGg2NHYtNTcuNmgtMTkuMnYtMTkuMmgxOS4ydi0xMC4zMTA0YzAsLTE5LjUyIDkuNTEwNCwtMjguMDg5NiAyNS43MzQ0LC0yOC4wODk2YzcuNzY5NiwwIDExLjg3ODQsMC41NzYgMTMuODI0LDAuODM4NHYxOC4zNjE2aC0xMS4wNjU2Yy02Ljg4NjQsMCAtOS4yOTI4LDMuNjM1MiAtOS4yOTI4LDEwLjk5NTJ2OC4yMDQ4aDIwLjE4NTZsLTIuNzM5MiwxOS4yaC0xNy40NDY0djU3LjZoMzJjNy4wNzIsMCAxMi44LC01LjcyOCAxMi44LC0xMi44di0xMTUuMmMwLC03LjA3MiAtNS43MzQ0LC0xMi44IC0xMi44LC0xMi44eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
            },
            {
                label: "Share", code: "share",
                icon_url: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1551255153IaI1vtKPyfPZSpI.jpg"
            },
            {
                label: "Lead", code: "lead",
                icon_url: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1551517037Ss3wPNM2BDGw5r5.jpg"
            },
            {
                label: "Comment", code: "comment",
                icon_url: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1551522963BHMrgQm0MjecV4F.jpg"
            },
        ];
    }

    componentDidMount() {
        if (this.props.posts.length == 0) return;
        let now = moment();
        this.data = this.props.posts.map(obj => {
            let kind = this.getKind(obj.kind);
            return {
                id: obj.id,
                // post_url: "https://colorme.vn/" + obj.kind + "/" + obj.slug,
                post_url: "https://colorme.vn/" + kind + "/" + obj.slug,
                query: {
                    metrics:
                        googleAnalyticMetrics.pageViews
                        + "," + googleAnalyticMetrics.bounceRate
                        + "," + googleAnalyticMetrics.sessions
                        + "," + googleAnalyticMetrics.averageTimeOnPage
                    ,

                    dimensions: googleAnalyticDimensions.date,
                    filters: 'ga:pagePath==/' + kind + "/" + obj.slug,
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
                        },

                    },


                }
            };
        });
        this.setState({selectedMenu: this.props.posts.map(() => 0)});
        loadGapi(this.data);
        this.props.blogActions.loadFacebookStatistic(this.props.posts.map(obj => {
            let kind = this.getKind(obj.kind);
            return {
                url: "https://colorme.vn/" + kind + "/" + obj.slug,
                // url: "https://colorme.vn/" + obj.kind + "/" + obj.slug,
                lead: obj.lead,
            };
        }));
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

    getKind = (inp) => {
        return inp === "resource" ? "blog" : inp;
    }

    render() {

        return (
            <div>

                {this.props.posts && this.props.posts.map((post, index) => {
                    let dataObj = this.data[index] ? this.data[index] : {query: {}};
                    let fbInfo = this.props.facebookStatistic[index];
                    return (

                        <div className="flex-container" key={post.id}>
                            <div className="flex-col-9">
                                <div style={{backgroundColor:"white", borderRadius: 6, height:"100%", padding:20}}>
                                    <div className="row">
                                        <div className="col-lg-4">
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
                                                 />
                                                <div className="card-action">
                                                    <h4 className="card-title" style={{margin: "30px 0px"}}>
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
                                        <div className="col-lg-8 padding-horizontal-30px">

                                            <div id={"chart-" + post.id + "-container"} />

                                            {!this.props.isLoadingPosts && <div className="row">
                                                <div className="col-md-4">
                                                    <FormInputDate value={dataObj.query['start-date']}
                                                                   format={DATE_FORMAT_SQL}
                                                                   name={'start-date' + index}
                                                                   id={'start-date' + index}
                                                                   updateFormData={(e) => this.onChangeDate(e, 'start-date', index)}
                                                    /></div>
                                                <div className="col-md-4">
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
                            <div className="flex-col-3">

                                <div style={{backgroundColor: "#4285f4",borderRadius: 6, height:"100%"}}>
                                    <div>
                                        <div className="row">
                                            {googleCodes.map((element, key) => {
                                                return (
                                                    <div className="col-lg-6" key={key}>
                                                        <div style={{color: "white", margin: "15%"}}>
                                                            <div>{element.label}</div>
                                                            <div
                                                                style={{fontSize: 24, lineHeight: "24px"}}
                                                                id={"side-info-" + key + "-" + post.id}><Loading
                                                                text={" "}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}


                                        </div>
                                    </div>
                                    <div style={{height: 1, backgroundColor: "white",margin: "0px 0px"}}/>
                                    <div style={{color: "white"}}>
                                        <div className="row">

                                            {this.props.isLoadingFacebookStatistic ? <Loading/> :
                                                this.facebookCode.map((element, key) => {

                                                    return (
                                                        <div className="col-lg-6" key={key}>
                                                            <div style={{ margin: "15%"}}>
                                                                <img src={element.icon_url}
                                                                     style={{width: 25, height: 25}}/>
                                                                <div style={{lineHeight: "25px", marginLeft: 5}}>
                                                                    {(fbInfo && element.code) ? fbInfo[element.code] : 0} {element.label}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                        </div>
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
    blogActions: PropTypes.object.isRequired,
    facebookStatistic: PropTypes.array,
    isLoadingFacebookStatistic: PropTypes.bool,

    // loadByCategories: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        posts: state.blog.posts,
        categories: state.blog.categories,
        isLoadingPosts: state.blog.isLoadingPosts,
        isLoadingFacebookStatistic: state.blog.isLoadingFacebookStatistic,
        facebookStatistic: state.blog.facebookStatistic,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        blogActions: bindActionCreators(blogActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPost);
