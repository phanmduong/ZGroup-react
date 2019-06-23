// import axios from 'axios';
// import * as env from '../../constants/env';

// eslint-disable
export function load(query,callback) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr.responseText);
            callback(JSON.parse(xhr.responseText));
        }

    }
    // xhr.open('GET', 'http://clients1.google.com/complete/search?hl=en&output=toolbar&q=kha%20banh');
    xhr.open('GET', 'https://cor-everywhere.herokuapp.com/' +
        'http://suggestqueries.google.com/complete/search?client=firefox&hl=vn' +
        '&q=' + query);

    // xhr.open('GET', 'https://cor-everywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?q=ob&client=firefox&hl=fr');
    xhr.send();

}
export function test(callback) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log(xhr);
            callback(xhr);
        }

    }
    // xhr.open('GET', 'http://clients1.google.com/complete/search?hl=en&output=toolbar&q=kha%20banh');
    xhr.open('GET', 'https://cor-everywhere.herokuapp.com/' +
        'https://trends.google.com/trends/api/explore?hl=en-US&req=%7B%22comparisonItem%22%3A%5B%7B%22keyword%22%3A%22Women%27s%20march%22%2C%22hl%22%3A%22en-US%22%2C%22category%22%3A0%2C%22timezone%22%3A-420%2C%22property%22%3A%22%22%2C%22endTime%22%3A%222019-04-11T06%3A54%3A44.160Z%22%2C%22startTime%22%3A%222004-01-01T00%3A00%3A00.000Z%22%2C%22time%22%3A%222004-01-1%202019-04-11%22%7D%5D%2C%22category%22%3A0%2C%22property%22%3A%22%22%7D&tz=-420'
        );

    // xhr.open('GET', 'https://cor-everywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?q=ob&client=firefox&hl=fr');
    xhr.send();

}
