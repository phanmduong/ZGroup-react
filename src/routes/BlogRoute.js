import PostsContainer from "../modules/blog/PostsContainer";
import BlogTypeContainer from "../modules/blogType/BlogTypeContainer";

/**
 * Tab Blog
 */
export default [

    {
        path: "/blog/posts",
        component: PostsContainer
    },
    {
        path: "blog/blogtypes",
        component: BlogTypeContainer
    }
];
