import React, {Component} from "react";
import {store} from "./analyticMarketingStore";
import {observer} from "mobx-react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import moment from "moment";
import {DATETIME_VN_FORMAT}from "../../../constants/constants";

@observer
class AnalyticMarketingContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.facebookCode = [
            {
                label: "Like",
                code: "like_count",
                icon_url: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iOTAiIGhlaWdodD0iOTAiCnZpZXdCb3g9IjAgMCAxOTIgMTkyIgpzdHlsZT0iIGZpbGw6IzAwMDAwMDsiPjxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIGZvbnQtZmFtaWx5PSJub25lIiBmb250LXdlaWdodD0ibm9uZSIgZm9udC1zaXplPSJub25lIiB0ZXh0LWFuY2hvcj0ibm9uZSIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0wLDE5MnYtMTkyaDE5MnYxOTJ6IiBmaWxsPSIjNDI4NWY0Ij48L3BhdGg+PGcgZmlsbD0iI2ZmZmZmZiI+PHBhdGggZD0iTTE1My42LDI1LjZoLTExNS4yYy03LjA3MiwwIC0xMi44LDUuNzI4IC0xMi44LDEyLjh2MTE1LjJjMCw3LjA3MiA1LjcyOCwxMi44IDEyLjgsMTIuOGg2NHYtNTcuNmgtMTkuMnYtMTkuMmgxOS4ydi0xMC4zMTA0YzAsLTE5LjUyIDkuNTEwNCwtMjguMDg5NiAyNS43MzQ0LC0yOC4wODk2YzcuNzY5NiwwIDExLjg3ODQsMC41NzYgMTMuODI0LDAuODM4NHYxOC4zNjE2aC0xMS4wNjU2Yy02Ljg4NjQsMCAtOS4yOTI4LDMuNjM1MiAtOS4yOTI4LDEwLjk5NTJ2OC4yMDQ4aDIwLjE4NTZsLTIuNzM5MiwxOS4yaC0xNy40NDY0djU3LjZoMzJjNy4wNzIsMCAxMi44LC01LjcyOCAxMi44LC0xMi44di0xMTUuMmMwLC03LjA3MiAtNS43MzQ0LC0xMi44IC0xMi44LC0xMi44eiI+PC9wYXRoPjwvZz48L2c+PC9zdmc+"
            },
            {
                label: "Share", code: "share_count",
                icon_url: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1551255153IaI1vtKPyfPZSpI.jpg"
            },
            {
                label: "Promotion", code: "promotion_status",
                icon_url: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1551517037Ss3wPNM2BDGw5r5.jpg"
            },
            {
                label: "Comment", code: "comment_count",
                icon_url: "https://d1j8r0kxyu9tj8.cloudfront.net/images/1551522963BHMrgQm0MjecV4F.jpg"
            },
        ];
    }

    componentDidMount() {
        /* eslint-disable */
        window.fbAsyncInit = function () {
            FB.init({
                appId: '868843516517008',
                cookie: true,
                xfbml: true,
                version: 'v3.2'
            });

            FB.AppEvents.logPageView();

        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        setTimeout(function () {
            store.loadPosts();
            // store.loadAdsPosts();
        }, 1000);


        /* eslint-enable */
    }

    getPostName = (post) => {
        if (!post.message) {
            return "Không tên";
        }
        return post.message.substr(0, 100) + (post.message.length > 100 ? "..." : "");
    }

    render() {
        let {isLoading, posts, paginator} = store;
        //let { user } = this.props;

        return (
            <div>
                {!isLoading &&
                <div className="flex flex-row">
                    {paginator.previous &&
                    <button onClick={() => store.loadPaginatePosts(paginator.previous)} className="btn btn-rose btn-sm"
                            style={{width: 100}}>
                            <span className="btn-label">
                            <i className="material-icons">
                            keyboard_arrow_left
                            </i>
                            </span>
                        Trước
                    </button>}

                    {paginator.next &&
                    <button onClick={() => store.loadPaginatePosts(paginator.next)} className="btn btn-rose btn-sm"
                            style={{width: 100}}>
                        Sau
                        <span className="btn-label btn-label-right">
                            <i className="material-icons">
                            keyboard_arrow_right
                            </i>
                            </span>
                    </button>}
                </div>
                }
                {isLoading ? <Loading/> :
                    posts.map((post, index) => {
                        let created_time = moment(post.created_time);
                        return (

                            <div className="" key={index}>
                                <div className="col-md-9">

                                    <div className="card">
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
                                                                post.full_picture +
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
                                                            {this.getPostName(post)}
                                                            <a href={post.link} target="_blank"
                                                               className="open-new-tab-icon">
                                                                <i className="material-icons">open_in_new</i>
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
                                                            {/*{post.author.avatar_url ? (<Avatar*/}
                                                            {/*size={40}*/}
                                                            {/*url={post.author.avatar_url}*/}
                                                            {/*style={{borderRadius: 6}}*/}
                                                            {/*/>) : null}*/}
                                                            <div>
                                                                {/*<strong>{post.author.name}</strong>*/}
                                                                <br/>
                                                                <p className="category"
                                                                style={{fontSize: 12}}>{created_time.format(DATETIME_VN_FORMAT)}</p>
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-lg-8 padding-horizontal-30px">


                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-md-3">

                                    <div className="card" style={{backgroundColor: "#4285f4",}}>


                                        <div style={{color: "white"}}>
                                            <div className="row">

                                                {
                                                    this.facebookCode.map((element, key) => {
                                                        return (
                                                            <div className="col-lg-6" key={key}>
                                                                <div style={{margin: " 23px 27px"}}>
                                                                    <img src={element.icon_url}
                                                                         style={{width: 25, height: 25}}/>
                                                                    <div
                                                                        style={{lineHeight: "25px", marginLeft: 5}}>
                                                                        {post[element.code]} {element.label}
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

AnalyticMarketingContainer.propTypes = {
    user: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(AnalyticMarketingContainer);