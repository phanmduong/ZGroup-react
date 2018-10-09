import {observable, action} from "mobx";
import {graphqlClient} from "../../graphql/graphqlClient";
import {fetchPersonTargetApi} from "./queries.graphql";

export const store = new class TargetPersonStore {
    @observable isLoading = false;
    @observable targetSales = [];

    @action async loadPersonTargetSale(userId) {
        this.isLoading = true;

        const res = await graphqlClient
            .query({
                query: fetchPersonTargetApi,
                variables: {
                    userId: userId
                }
            });
        this.targetSales = res.data.targetSale;
        this.isLoading = false;
    }
};