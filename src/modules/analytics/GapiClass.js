/* eslint-disable */
import {GAPI_CLIENT_ID} from "../../constants/constants";

export const initGapi = () => {
    (function (w, d, s, g, js, fjs) {
        g = w.gapi || (w.gapi = {});
        g.analytics = {
            q: [], ready: function (cb) {
                this.q.push(cb)
            }
        };
        js = d.createElement(s);
        fjs = d.getElementsByTagName(s)[0];
        js.src = 'https://apis.google.com/js/platform.js';
        fjs.parentNode.insertBefore(js, fjs);
        js.onload = function () {
            g.load('analytics')
        };
    }(window, document, 'script'));
}

export const authGapi = () => {
    gapi.analytics.ready(() => {
        gapi.analytics.auth.authorize({
            container: 'embed-api-auth-container',
            clientid: GAPI_CLIENT_ID
        });

    });
}

export const loadGapi = (data) => {

    gapi.analytics.ready(() => {

        let viewSelector = new gapi.analytics.ViewSelector({
            container: 'view-selector-container'
        });

        viewSelector.execute();
        let dataChart = [];

        for (let i = 0; i < data.length; i++) {
            let props = data[i];
            let chart = new gapi.analytics.googleCharts.DataChart({
                query: {
                    ...props.query,
                },
                chart: {
                    ...props.chart,
                    container: 'chart-' + props.id + '-container',
                },
            });
            dataChart.push(chart);
        }


        viewSelector.on('change', function (ids) {
            for (let i = 0; i < data.length; i++) {
                dataChart[i].set({query: {ids: ids}}).execute();
            }
        });

    });
}