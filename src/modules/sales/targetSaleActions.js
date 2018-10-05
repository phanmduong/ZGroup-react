import {
    BEGIN_TARGET_SALE_LOAD,
    TARGET_SALE_CHANGE_GEN,
    TARGET_SALE_LOAD_GENS,
    TARGET_SALE_LOAD_GENS_SUCCESS, TARGET_SALE_LOAD_SUCCESS
} from "./targetSaleActionType";
import {loadGens} from "../dashboard/dashboardApi";
import {graphqlClient} from "../../graphql/graphqlClient";
import {fetchTargetApi} from './queries.graphql';


const fetchTargetSale = async (dispatch, genId) => {
    dispatch({
        type: BEGIN_TARGET_SALE_LOAD
    });

    const res1 = await graphqlClient
        .query({
            query: fetchTargetApi,
            variables: {
                genId: genId
            }
        });
    const targetSale = res1.data.targetSale;
    dispatch({
        type: TARGET_SALE_LOAD_SUCCESS,
        targetSale
    });
};

export const loadGensList = () => {
    return async (dispatch) => {
        dispatch({
            type: TARGET_SALE_LOAD_GENS,
            isLoadingGens: true
        });


        const res = await loadGens();

        const {gens, current_gen} = res.data.data;
        dispatch({
            type: TARGET_SALE_LOAD_GENS_SUCCESS,
            isLoadingGens: false,
            gens,
            currentGenId: current_gen.id
        });


        fetchTargetSale(dispatch, current_gen.id);
    };
};



export const changeCurrentGen = (currentGenId) => {
    return (dispatch) => {
        dispatch({
            type: TARGET_SALE_CHANGE_GEN,
            currentGenId: currentGenId
        });

        fetchTargetSale(dispatch, currentGenId);
    };
};
