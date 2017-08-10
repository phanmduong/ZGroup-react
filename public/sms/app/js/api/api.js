import {BASE_URL} from '../const';
import axios from 'axios';

export default {
    getSmsList(page = 1){
        return axios.get(BASE_URL + "smslist" + "?page=" + page);
    },
    submitSmsTemplate(template){
        return axios.post(BASE_URL + "create-sms-template", template);
    },
    getSmsTemplates(page = 1){
        return axios.get(BASE_URL + "sms-templates" + "?page=" + page);
    },
    getClasses(page = 1, search = ""){
        return axios.get(BASE_URL + "sms-classes" + "?page=" + page + "&search=" + search);
    },
    sendSms(classes, smsId){
        return axios.post(BASE_URL + "send-sms", {classes: classes.map(c = > c.id), smsId
    })
    }
}