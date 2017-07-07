import axios from 'axios';
import {BASE_URL} from './const';

export default {
    createStudySession(studySession){
        return axios.post(BASE_URL + "createstudysession", studySession);
    },
    getStudySessions(){
        return axios.get(BASE_URL + "studysessions");
    },
    getSchedules(){
        return axios.get(BASE_URL + "schedules");
    },
    createSchedule(schedule){
        return axios.post(BASE_URL + "createschedule", schedule);
    },
    deleteSchedule(id){
        return axios.post(BASE_URL + "deleteschedule/" + id, {id});
    },
    deleteStudySession(id){
        return axios.post(BASE_URL + "deletestudysession/" + id, {id});
    }
}
