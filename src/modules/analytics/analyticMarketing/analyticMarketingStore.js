import {action, observable} from "mobx";
import {loadPosts,loadPaginatePosts} from "./analyticMarketingApi";
import * as env from "../../../constants/env";



export const store = new class Store {
    @observable isLoading = false;
    @observable posts = [];
    @observable paginator = {};

    @action
    loadPosts() {
        this.isLoading = true;
        loadPosts(
            '/868843516517008/posts',
            'GET',
            {
                fields:
                    "shares" +
                    ",promotion_status" +
                    ",reactions" +
                    ",full_picture" +
                    ",name" +
                    ",message" +
                    ",link" +
                    ",permalink_url" +
                    ",created_time" +
                    ",comments",
                access_token: env.FB_PAGE_TOKEN,
                limit:25,
                // limit:1,
            },
            (response) => {
                console.log("res", response);
                this.posts = response.data.map((obj) => {
                    return {...obj,
                        share_count: obj.shares ? obj.shares.count : 0,
                        like_count:obj.reactions ? obj.reactions.data.length : 0,
                        comment_count:obj.comments ? obj.comments.data.length : 0,
                    };
                });
                this.paginator = response.paging;
                this.isLoading = false;
            }
        );
    }

    @action
    loadPaginatePosts(url) {
        this.isLoading = true;
        loadPaginatePosts(url).then((response) => {
            console.log("res", response);
            this.posts = response.data.data.map((obj) => {
                return {...obj,
                    share_count: obj.shares ? obj.shares.count : 0,
                    like_count:obj.reactions ? obj.reactions.data.length : 0,
                    comment_count:obj.comments ? obj.comments.data.length : 0,
                };
            });
            this.paginator = response.data.paging;
            this.isLoading = false;
        });
    }
    // @action
    // loadAdsPosts() {
    //     console.log("load ads");
    //     this.isLoading = true;
    //     loadPosts(
    //         '/868843516517008/ads_posts',
    //         'GET',
    //         {
    //             fields:
    //                 "shares" +
    //                 ",promotion_status" +
    //                 ",reactions" +
    //                 ",full_picture" +
    //                 ",name" +
    //                 ",link" +
    //                 ",permalink_url" +
    //                 ",message" +
    //                 ",admin_creator" +
    //                 ",thumbnail" +
    //                 ",insights" +
    //                 ",comments",
    //             access_token: env.FB_ADS_TOKEN,
    //             sort: ["creation_time_descending"],
    //             summary: true,
    //             suppress_http_code: 1,
    //             filtering: [{"field":"message","operator":"CONTAIN","value":" "}],
    //
    //
    //
    //         },
    //         (response) => {
    //             console.log("res", response);
    //             this.posts = response.data.map((obj) => {
    //                 return {...obj,
    //                     link: "https://facebook.com" + obj.permalink_url,
    //                     full_picture: obj.thumbnail
    //                 };
    //             });
    //             this.isLoading = false;
    //         }
    //     );
    //
    //
    // }
}();
