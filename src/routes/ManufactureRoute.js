import BookBoardListContainer from "../modules/book/BookBoardListContainer";
import GoodListContainer from "../modules/good/GoodListContainer";
import CreateGoodContainer from "../modules/good/CreateGoodContainer";
import BarcodesContainer from "../modules/book/barcode/BarcodesContainer";
import ProcessListContainer from "../modules/book/ProcessListContainer";
import GoodDetailContainer from "../modules/good/GoodDetailContainer";
import PropertiesListContainer from "../modules/good/PropertiesListContainer";
import CreateGoodPropertyContainer from "../modules/good/CreateGoodPropertyContainer";
import TaskListTemplateContainer from "../modules/good/TaskListTemplateContainer";

/**
 * Tab Sản xuất
 */
export default [
    {
        // path: "/:type/manufacture",
        path: "/manufacture/:type/manufacture",
        component: BookBoardListContainer,
    },
    {
        path: "/manufacture/good/:type/all",
        // path: "/good/:type/all",
        component: GoodListContainer,
    },
    {
        // path: "/good/:goodId/edit",
        path: "/manufacture/good/:goodId/edit",
        component: CreateGoodContainer,
        type: "edit",
    },
    {
        // path: "good/:type/create",
        path: "/manufacture/good/:type/create",
        component: CreateGoodContainer,
        type: "create",
    },
    {
        // path: "good/create",
        path: "/manufacture/good/create",
        component: CreateGoodContainer,
        type: "create",
    },
    {
        // path: "/barcodes",
        path: "/manufacture/barcodes",
        component: BarcodesContainer,
    },
    {
        // path: "/good/:type/process",
        path: "/manufacture/good/:type/process",
        component: ProcessListContainer,
    },
    {
        // path: "/good/:goodId/detail",
        path: "/manufacture/good/:goodId/detail",
        component: GoodDetailContainer,
    },
    {
        // path: "/good/:type/properties",
        path: "/manufacture/good/:type/properties",
        component: PropertiesListContainer,
    },
    {
        // path: "/good/:type/property/create",
        path: "/manufacture/good/:type/property/create",
        component: CreateGoodPropertyContainer,
    },
    {
        // path: "/property-item/:id/edit",
        path: "/manufacture/property-item/:id/edit",
        component: CreateGoodPropertyContainer,
    },
    {
        // path: "/tasklist-template/:id",
        path: "/manufacture/tasklist-template/:id",
        component: TaskListTemplateContainer,
    },
];
