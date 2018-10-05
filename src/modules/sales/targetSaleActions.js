import {TARGET_SALE_CHANGE_GEN, TARGET_SALE_LOAD_GENS, TARGET_SALE_LOAD_GENS_SUCCESS} from "./targetSaleActionType";
import {loadGens} from "../dashboard/dashboardApi";
import {graphqlClient} from "../../graphql/graphqlClient";
import {fetchTargetApi} from './queries.graphql';


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

        const res1 = await graphqlClient
            .query({
                query: fetchTargetApi,
                variables: {
                    genId: current_gen.id
                }
            });
        const targetSale = res1.data.targetSale;
        console.log(targetSale);
    };
};

export const changeCurrentGen = (currentGenId) => {
    return (dispatch) => {
        dispatch({
            type: TARGET_SALE_CHANGE_GEN,
            currentGenId: currentGenId
        });
    };
};
