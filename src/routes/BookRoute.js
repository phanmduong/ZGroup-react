/**
 * Tab Nhân sự
 */
import BookListContainer from "../modules/book/graphics/BookListContainer";
import CreateGoodContainer from "../modules/good/CreateGoodContainer";

export default [
    {
        path: "/book/all",
        component: BookListContainer,
    },
    {
        path: "/book/create",
        component: CreateGoodContainer,
        type: "create"
    },

];
