import {observable, action} from "mobx";
import {getHonors} from './queries.graphql';
import {graphqlClient} from "../../graphql/graphqlClient";
import {graphqlSuccess} from "../../graphql/graphqlSuccess";

class Store {
    @observable data = {};
    @observable isLoading = false;
    @observable error = null;

    @action
    async getData() {
        this.isLoading = true;
        this.error = null;

        const variables = {};

        try {
            const res = await graphqlClient
                .query({
                    query: getHonors,
                    variables: variables
                });
            const data = res.data;

            if (graphqlSuccess(res.networkStatus)) {
                this.data = data;
            } else {
                this.error = "Có lỗi xảy ra";
            }
        }
        catch (error) {
            this.error = "Có lỗi xảy ra";
        } finally {
            this.isLoading = false;
        }
    }
}

export default Store;