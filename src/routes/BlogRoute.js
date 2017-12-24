import StorePostContainer from "../modules/blog/StorePostContainer";
import PostsContainer from "../modules/blog/PostsContainer";

/**
 * Tab Blog
 */
export default [
    {
        path: "/blog/new-post",
        component: StorePostContainer,
        type: "create"
    },
    {
        path: "/blog/post/:postId/edit",
        component: StorePostContainer,
        type: "edit"
    },
    {
        path: "/blog/posts",
        component: PostsContainer
    }
];
