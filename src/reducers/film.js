import {combineReducers} from "redux";
import {LOG_OUT} from "../constants/actionTypes";
import commonReducer from "./commonReducer";
import filmReducer from "../modules/ZgroupFilm/filmReducer";
import blogFilmReducer from "../modules/ZgroupFilm/blogFilm/blogFilmReducer";

const appReducer = combineReducers({
    ...commonReducer,
    film: filmReducer,
    blogFilm: blogFilmReducer

});

const rootReducer = (state, action) => {
    if (action.type === LOG_OUT) {
        state = {};
    }

    return appReducer(state, action);
};

export default rootReducer;
