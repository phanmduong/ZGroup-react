import PostsContainer from "../modules/blog/containers/PostsContainer";
import BlogTypeContainer from "../modules/blogType/BlogTypeContainer";
import BlogEditor from "../modules/blog/editor/BlogEditor";
import EvaluateContentsContainer from "../modules/evaluateContents/EvaluateContentsContainer";
import AnalyticsBlogsContainer from "../modules/analytics/analyticsBlogs/AnalyticsBlogsContainer";


/**
 * Tab Blog
 */
export default [
    {
        path: "/blog/posts",
        component: PostsContainer,
    },
    {
        path: "blog/blogtypes",
        component: BlogTypeContainer,
    },
    {
        path: "blog/editor",
        component: BlogEditor,
    },
    {
        path: "blog/:postId/editor",
        component: BlogEditor
    },
    {
        path: "blog/evaluate",
        component: EvaluateContentsContainer
    },
    {
        path: "blog/analytic",
        component: AnalyticsBlogsContainer,
    },
];
