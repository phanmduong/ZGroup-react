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
        path: "/:type/manufacture",
        component: BookBoardListContainer
    },
    {
        path: "/good/:type/all",
        component: GoodListContainer
    },
    {
        path: "/good/:goodId/edit",
        component: CreateGoodContainer,
        type: "edit"
    },
    {
        path: "good/:type/create",
        component: CreateGoodContainer,
        type: "create"
    },
    {
        path: "good/create",
        component: CreateGoodContainer,
        type: "create"
    },
    {
        path: "/barcodes",
        component: BarcodesContainer
    },
    {
        path: "/good/:type/process",
        component: ProcessListContainer
    },
    {
        path: "/good/:goodId/detail",
        component: GoodDetailContainer
    },
    {
        path: "/good/:type/properties",
        component: PropertiesListContainer
    },
    {
        path: "/good/:type/property/create",
        component: CreateGoodPropertyContainer
    },
    {
        path: "/property-item/:id/edit",
        component: CreateGoodPropertyContainer
    },
    {
        path: "/tasklist-template/:id",
        component: TaskListTemplateContainer
    }
];
