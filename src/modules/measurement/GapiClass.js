/* eslint-disable */
import {GAPI_CLIENT_ID, googleAnalyticMetrics} from "../../constants/constants";

var GoogleAuth; // Google Auth object.
export function initClient() {
    gapi.client.init({
        'apiKey': 'AIzaSyAyIFGRYKQPrxqyDzP04uHW3AgKvQl1AXY',
        'clientId': GAPI_CLIENT_ID,
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();


        GoogleAuth.isSignedIn.listen(updateSigninStatus);
    });
}