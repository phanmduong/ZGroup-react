import moment from 'moment';

import {allowedDateFormats} from "../constants/constants";

const validation = {
    isEmailAddress: function (str) {
        // eslint-disable-next-line
        var pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return pattern.test(str.trim());  // returns a boolean
    },
    isNotEmpty: function (str) {
        let pattern = /\S+/;
        return pattern.test(str.trim());  // returns a boolean
    },
    isNumber: function (str) {
        let pattern = /^[0-9]*$/;
        return pattern.test(str.trim());  // returns a boolean
    },
    isDate: function (str) {
        return moment(str.trim(), allowedDateFormats, true).isValid();
    },
    isPhoneNumber: function (str) {
        let pattern = /^\+?[0-9]*$/;
        return pattern.test(str.trim());  // returns a boolean
    },
};

export default validation;