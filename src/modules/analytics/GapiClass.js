/* eslint-disable */
import {GAPI_CLIENT_ID, googleAnalyticMetrics} from "../../constants/constants";

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

export const googleCodes = [
    {code: googleAnalyticMetrics.pageViews, label: "Total Pageviews", des:""},
    {code: googleAnalyticMetrics.averageTimeOnPage, label: "Avg. Time on Page", des:"s"},
    {code: googleAnalyticMetrics.sessions, label: "Total Sessions", des:""},
    {code: googleAnalyticMetrics.bounceRate, label: "Bounce Rate", des:"%"},
];

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
            // "side-info-" +post.id


            chart.on('success', function (result) {
                // Print the total pageview count to the console.
                // console.log(result.response.totalsForAllResults['ga:pageviews']);
                // console.log("#side-info-ga:pageviews-" + props.id, result.response.totalsForAllResults['ga:pageviews']);
                // $("#test-123").html(result.response.totalsForAllResults['ga:pageviews']);
                for (let j = 0; j < 4; j++) {
                    let tmp = result.response.totalsForAllResults[googleCodes[j].code];
                    $("#side-info-" + j + "-" + props.id).html(tmp.substr(0, 5)+googleCodes[j].des);
                    $("#side-info-" + j + "-" + props.id).css({fontSize: 50, lineHeight: "55px"});
                }
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