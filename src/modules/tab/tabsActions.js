import * as types from '../../constants/actionTypes';
import * as tabsApi from './tabsApi';

export function beginLoadTabsData() {
    return {
        type: types.BEGIN_LOAD_TABS_DATA,
        isLoading: true,
        error: false,
        tabListData: []
    };
}

export function loadTabsData() {
    return function (dispatch) {
        dispatch(beginLoadTabsData());
        tabsApi.loadTabsApi()
            .then(function (res) {
                dispatch(loadTabsDataSucessful(res));
            }).catch(() => {
            dispatch(loadTabsDataError());
        });
    };
}

export function loadTabsDataSucessful(res) {
    return (
        {
            type: types.LOAD_TABS_DATA_SUCCESSFUL,
            tabListData: res.data.data.tabs.map(t => {
                if (t.url[0] === "/") {
                    return t;
                } else {
                    return {...t, url: "/" + t.url};
                }

            }),
            status: res.data.status,
            isLoading: false,
            error: false
        })
        ;
}

export function loadTabsDataError() {
    return (
        {
            type: types.LOAD_TABS_DATA_ERROR,
            isLoading: false,
            error: true
        })
        ;
}

export function beginLoadAllTabsData() {
    return {
        type: types.BEGIN_LOAD_ALL_TABS_DATA,
        isLoading: true,
        error: false,
        tabListData: []
    };
}

export function loadAllTabsData() {
    return function (dispatch) {
        dispatch(beginLoadAllTabsData());
        tabsApi.loadAllTabsApi()
            .then(function (res) {
                dispatch(loadAllTabsDataSucessful(res));
            }).catch(() => {
            dispatch(loadAllTabsDataError());
        });
    };
}

export function loadAllTabsDataSucessful(res) {
    return (
        {
            type: types.LOAD_ALL_TABS_DATA_SUCCESSFUL,
            tabListData: res.data.data.tabs,
            status: res.data.status,
            isLoading: false,
            error: false
        })
        ;
}

export function loadAllTabsDataError() {
    return (
        {
            type: types.LOAD_ALL_TABS_DATA_ERROR,
            isLoading: false,
            error: true
        })
        ;
}
