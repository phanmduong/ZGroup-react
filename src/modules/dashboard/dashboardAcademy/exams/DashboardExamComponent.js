import React from 'react';
import {observer} from 'mobx-react';
import FilterExam from "./FilterExam";
import filterExamStore from "./filterExamStore";
import CardAcademy from "../CardAcademy";
import Loading from "../../../../components/common/Loading";
import DashboardExamStore from "./DashboardExamStore";
import Barchart from "./BarChart";
import MNABarChart from "./MNABarChart";
import * as helper from "../../../../helpers/helper";
import {NO_AVATAR} from "../../../../constants/env";
import EmptyData from "../../../../components/common/EmptyData";
import {openModalRegisterDetail} from "../../../globalModal/globalModalActions";

const labels = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7', '7-8', '8-9', '9-10'];

const analytic_exam = [
    {
        id: 267,
        title: "Reading",
        group_exam_id: 113,
        exam_template_id: 472,
        class: {
            id: 3815,
            name: "E8A5_200319_NTH",
            status: 1,
            type: "active",
            status_id: null,
            course_id: 56,
            datestart: "17 Tháng Ba, 2020"
        },
        group_exam: {
            id: 113,
            name: "Midterm test "
        },
        user_exams: [
            {
                id: 129,
                score: 8,
                user_id: 26687,
                exam_id: 267,
                user: {
                    id: 26687,
                    name: "Nguyen Khánh Chi",
                    email: "nguyenkhanhchi2007@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 130,
                score: 7.5,
                user_id: 42644,
                exam_id: 267,
                user: {
                    id: 42644,
                    name: "Nguyễn Gia Huy",
                    email: "lanhuyen80@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 131,
                score: 8.5,
                user_id: 26586,
                exam_id: 267,
                user: {
                    id: 26586,
                    name: "Mai Nam Khánh",
                    email: "dung.mard@yahoo.com.vn",
                    avatar_url: null
                }
            },
            {
                id: 132,
                score: 0,
                user_id: 29476,
                exam_id: 267,
                user: {
                    id: 29476,
                    name: "Vũ Hồng Hà Linh",
                    email: "ha.tanky@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 133,
                score: 8.5,
                user_id: 26587,
                exam_id: 267,
                user: {
                    id: 26587,
                    name: "Trần Đức Mạnh",
                    email: "hanhdh333@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 134,
                score: 0,
                user_id: 26039,
                exam_id: 267,
                user: {
                    id: 26039,
                    name: "Trần Hiểu Linh",
                    email: "dothulysmbc@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 135,
                score: 7.5,
                user_id: 25825,
                exam_id: 267,
                user: {
                    id: 25825,
                    name: "Hà Linh",
                    email: "nguyen.minhtan@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 136,
                score: 7.1,
                user_id: 42645,
                exam_id: 267,
                user: {
                    id: 42645,
                    name: "Nguyễn Khánh Linh Đan",
                    email: "hangpt76@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 137,
                score: 0,
                user_id: 42646,
                exam_id: 267,
                user: {
                    id: 42646,
                    name: "Phạm Nhật Minh",
                    email: "lan.lp@theolympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 138,
                score: 5.1,
                user_id: 25980,
                exam_id: 267,
                user: {
                    id: 25980,
                    name: "Lê Trần Công Duy",
                    email: "Tranthuhang@hmu.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 139,
                score: 7.5,
                user_id: 26429,
                exam_id: 267,
                user: {
                    id: 26429,
                    name: "Ngô Quang Minh",
                    email: "huyen.ptp@olympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 140,
                score: 0,
                user_id: 45916,
                exam_id: 267,
                user: {
                    id: 45916,
                    name: "Mào Khang Luân",
                    email: "ngockhangbds@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 141,
                score: 8,
                user_id: 45826,
                exam_id: 267,
                user: {
                    id: 45826,
                    name: "Nguyễn Chính Nam Khánh",
                    email: "namhatt@yahoo.com",
                    avatar_url: null
                }
            }
        ]
    },
    {
        id: 276,
        title: "Reading",
        group_exam_id: 113,
        exam_template_id: 472,
        class: {
            id: 38155,
            name: "2_E8A5_200319_NTH",
            status: 1,
            type: "active",
            status_id: null,
            course_id: 56,
            datestart: "17 Tháng Ba, 2020"
        },
        group_exam: {
            id: 113,
            name: "Midterm test "
        },
        user_exams: [
            {
                id: 129,
                score: 8,
                user_id: 26687,
                exam_id: 267,
                user: {
                    id: 26687,
                    name: "Nguyen Khánh Chi",
                    email: "nguyenkhanhchi2007@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 130,
                score: 7.5,
                user_id: 42644,
                exam_id: 267,
                user: {
                    id: 42644,
                    name: "Nguyễn Gia Huy",
                    email: "lanhuyen80@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 131,
                score: 8.5,
                user_id: 26586,
                exam_id: 267,
                user: {
                    id: 26586,
                    name: "Mai Nam Khánh",
                    email: "dung.mard@yahoo.com.vn",
                    avatar_url: null
                }
            },
            {
                id: 132,
                score: 0,
                user_id: 29476,
                exam_id: 267,
                user: {
                    id: 29476,
                    name: "Vũ Hồng Hà Linh",
                    email: "ha.tanky@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 133,
                score: 8.5,
                user_id: 26587,
                exam_id: 267,
                user: {
                    id: 26587,
                    name: "Trần Đức Mạnh",
                    email: "hanhdh333@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 134,
                score: 0,
                user_id: 26039,
                exam_id: 267,
                user: {
                    id: 26039,
                    name: "Trần Hiểu Linh",
                    email: "dothulysmbc@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 135,
                score: 7.5,
                user_id: 25825,
                exam_id: 267,
                user: {
                    id: 25825,
                    name: "Hà Linh",
                    email: "nguyen.minhtan@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 136,
                score: 7.1,
                user_id: 42645,
                exam_id: 267,
                user: {
                    id: 42645,
                    name: "Nguyễn Khánh Linh Đan",
                    email: "hangpt76@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 137,
                score: 0,
                user_id: 42646,
                exam_id: 267,
                user: {
                    id: 42646,
                    name: "Phạm Nhật Minh",
                    email: "lan.lp@theolympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 138,
                score: 5.1,
                user_id: 25980,
                exam_id: 267,
                user: {
                    id: 25980,
                    name: "Lê Trần Công Duy",
                    email: "Tranthuhang@hmu.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 139,
                score: 7.5,
                user_id: 26429,
                exam_id: 267,
                user: {
                    id: 26429,
                    name: "Ngô Quang Minh",
                    email: "huyen.ptp@olympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 140,
                score: 0,
                user_id: 45916,
                exam_id: 267,
                user: {
                    id: 45916,
                    name: "Mào Khang Luân",
                    email: "ngockhangbds@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 141,
                score: 8,
                user_id: 45826,
                exam_id: 267,
                user: {
                    id: 45826,
                    name: "Nguyễn Chính Nam Khánh",
                    email: "namhatt@yahoo.com",
                    avatar_url: null
                }
            }
        ]
    },
    {
        id: 268,
        title: "Listening",
        group_exam_id: 113,
        exam_template_id: 473,
        class: {
            id: 3815,
            name: "E8A5_200319_NTH",
            status: 1,
            type: "active",
            status_id: null,
            course_id: 56,
            datestart: "17 Tháng Ba, 2020"
        },
        group_exam: {
            id: 113,
            name: "Midterm test "
        },
        user_exams: [
            {
                id: 142,
                score: 7.5,
                user_id: 26687,
                exam_id: 268,
                user: {
                    id: 26687,
                    name: "Nguyen Khánh Chi",
                    email: "nguyenkhanhchi2007@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 143,
                score: 9,
                user_id: 42644,
                exam_id: 268,
                user: {
                    id: 42644,
                    name: "Nguyễn Gia Huy",
                    email: "lanhuyen80@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 144,
                score: 8.5,
                user_id: 26586,
                exam_id: 268,
                user: {
                    id: 26586,
                    name: "Mai Nam Khánh",
                    email: "dung.mard@yahoo.com.vn",
                    avatar_url: null
                }
            },
            {
                id: 145,
                score: 0,
                user_id: 29476,
                exam_id: 268,
                user: {
                    id: 29476,
                    name: "Vũ Hồng Hà Linh",
                    email: "ha.tanky@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 146,
                score: 9.5,
                user_id: 26587,
                exam_id: 268,
                user: {
                    id: 26587,
                    name: "Trần Đức Mạnh",
                    email: "hanhdh333@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 147,
                score: 0,
                user_id: 26039,
                exam_id: 268,
                user: {
                    id: 26039,
                    name: "Trần Hiểu Linh",
                    email: "dothulysmbc@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 148,
                score: 6.1,
                user_id: 25825,
                exam_id: 268,
                user: {
                    id: 25825,
                    name: "Hà Linh",
                    email: "nguyen.minhtan@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 149,
                score: 9.5,
                user_id: 42645,
                exam_id: 268,
                user: {
                    id: 42645,
                    name: "Nguyễn Khánh Linh Đan",
                    email: "hangpt76@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 150,
                score: 0,
                user_id: 42646,
                exam_id: 268,
                user: {
                    id: 42646,
                    name: "Phạm Nhật Minh",
                    email: "lan.lp@theolympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 151,
                score: 9.5,
                user_id: 25980,
                exam_id: 268,
                user: {
                    id: 25980,
                    name: "Lê Trần Công Duy",
                    email: "Tranthuhang@hmu.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 152,
                score: 10,
                user_id: 26429,
                exam_id: 268,
                user: {
                    id: 26429,
                    name: "Ngô Quang Minh",
                    email: "huyen.ptp@olympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 153,
                score: 0,
                user_id: 45916,
                exam_id: 268,
                user: {
                    id: 45916,
                    name: "Mào Khang Luân",
                    email: "ngockhangbds@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 154,
                score: 9.5,
                user_id: 45826,
                exam_id: 268,
                user: {
                    id: 45826,
                    name: "Nguyễn Chính Nam Khánh",
                    email: "namhatt@yahoo.com",
                    avatar_url: null
                }
            }
        ]
    },
    {
        id: 269,
        title: "Use of English",
        group_exam_id: 113,
        exam_template_id: 474,
        class: {
            id: 3815,
            name: "E8A5_200319_NTH",
            status: 1,
            type: "active",
            status_id: null,
            course_id: 56,
            datestart: "17 Tháng Ba, 2020"
        },
        group_exam: {
            id: 113,
            name: "Midterm test "
        },
        user_exams: [
            {
                id: 155,
                score: 6,
                user_id: 26687,
                exam_id: 269,
                user: {
                    id: 26687,
                    name: "Nguyen Khánh Chi",
                    email: "nguyenkhanhchi2007@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 156,
                score: 6.3,
                user_id: 42644,
                exam_id: 269,
                user: {
                    id: 42644,
                    name: "Nguyễn Gia Huy",
                    email: "lanhuyen80@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 157,
                score: 6.6,
                user_id: 26586,
                exam_id: 269,
                user: {
                    id: 26586,
                    name: "Mai Nam Khánh",
                    email: "dung.mard@yahoo.com.vn",
                    avatar_url: null
                }
            },
            {
                id: 158,
                score: 0,
                user_id: 29476,
                exam_id: 269,
                user: {
                    id: 29476,
                    name: "Vũ Hồng Hà Linh",
                    email: "ha.tanky@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 159,
                score: 7,
                user_id: 26587,
                exam_id: 269,
                user: {
                    id: 26587,
                    name: "Trần Đức Mạnh",
                    email: "hanhdh333@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 160,
                score: 0,
                user_id: 26039,
                exam_id: 269,
                user: {
                    id: 26039,
                    name: "Trần Hiểu Linh",
                    email: "dothulysmbc@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 161,
                score: 3.6,
                user_id: 25825,
                exam_id: 269,
                user: {
                    id: 25825,
                    name: "Hà Linh",
                    email: "nguyen.minhtan@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 162,
                score: 7.3,
                user_id: 42645,
                exam_id: 269,
                user: {
                    id: 42645,
                    name: "Nguyễn Khánh Linh Đan",
                    email: "hangpt76@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 163,
                score: 0,
                user_id: 42646,
                exam_id: 269,
                user: {
                    id: 42646,
                    name: "Phạm Nhật Minh",
                    email: "lan.lp@theolympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 164,
                score: 6.6,
                user_id: 25980,
                exam_id: 269,
                user: {
                    id: 25980,
                    name: "Lê Trần Công Duy",
                    email: "Tranthuhang@hmu.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 165,
                score: 6.6,
                user_id: 26429,
                exam_id: 269,
                user: {
                    id: 26429,
                    name: "Ngô Quang Minh",
                    email: "huyen.ptp@olympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 166,
                score: 0,
                user_id: 45916,
                exam_id: 269,
                user: {
                    id: 45916,
                    name: "Mào Khang Luân",
                    email: "ngockhangbds@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 167,
                score: 7.3,
                user_id: 45826,
                exam_id: 269,
                user: {
                    id: 45826,
                    name: "Nguyễn Chính Nam Khánh",
                    email: "namhatt@yahoo.com",
                    avatar_url: null
                }
            }
        ]
    },
    {
        id: 270,
        title: "Writing",
        group_exam_id: 113,
        exam_template_id: 475,
        class: {
            id: 3815,
            name: "E8A5_200319_NTH",
            status: 1,
            type: "active",
            status_id: null,
            course_id: 56,
            datestart: "17 Tháng Ba, 2020"
        },
        group_exam: {
            id: 113,
            name: "Midterm test "
        },
        user_exams: [
            {
                id: 168,
                score: 7.5,
                user_id: 26687,
                exam_id: 270,
                user: {
                    id: 26687,
                    name: "Nguyen Khánh Chi",
                    email: "nguyenkhanhchi2007@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 169,
                score: 8,
                user_id: 42644,
                exam_id: 270,
                user: {
                    id: 42644,
                    name: "Nguyễn Gia Huy",
                    email: "lanhuyen80@yahoo.com",
                    avatar_url: null
                }
            },
            {
                id: 170,
                score: 9,
                user_id: 26586,
                exam_id: 270,
                user: {
                    id: 26586,
                    name: "Mai Nam Khánh",
                    email: "dung.mard@yahoo.com.vn",
                    avatar_url: null
                }
            },
            {
                id: 171,
                score: 0,
                user_id: 29476,
                exam_id: 270,
                user: {
                    id: 29476,
                    name: "Vũ Hồng Hà Linh",
                    email: "ha.tanky@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 172,
                score: 8,
                user_id: 26587,
                exam_id: 270,
                user: {
                    id: 26587,
                    name: "Trần Đức Mạnh",
                    email: "hanhdh333@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 173,
                score: 0,
                user_id: 26039,
                exam_id: 270,
                user: {
                    id: 26039,
                    name: "Trần Hiểu Linh",
                    email: "dothulysmbc@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 174,
                score: 8,
                user_id: 25825,
                exam_id: 270,
                user: {
                    id: 25825,
                    name: "Hà Linh",
                    email: "nguyen.minhtan@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 175,
                score: 0,
                user_id: 42645,
                exam_id: 270,
                user: {
                    id: 42645,
                    name: "Nguyễn Khánh Linh Đan",
                    email: "hangpt76@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 176,
                score: 0,
                user_id: 42646,
                exam_id: 270,
                user: {
                    id: 42646,
                    name: "Phạm Nhật Minh",
                    email: "lan.lp@theolympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 177,
                score: 8.2,
                user_id: 25980,
                exam_id: 270,
                user: {
                    id: 25980,
                    name: "Lê Trần Công Duy",
                    email: "Tranthuhang@hmu.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 178,
                score: 9.7,
                user_id: 26429,
                exam_id: 270,
                user: {
                    id: 26429,
                    name: "Ngô Quang Minh",
                    email: "huyen.ptp@olympiaschools.edu.vn",
                    avatar_url: null
                }
            },
            {
                id: 179,
                score: 0,
                user_id: 45916,
                exam_id: 270,
                user: {
                    id: 45916,
                    name: "Mào Khang Luân",
                    email: "ngockhangbds@gmail.com",
                    avatar_url: null
                }
            },
            {
                id: 180,
                score: 9,
                user_id: 45826,
                exam_id: 270,
                user: {
                    id: 45826,
                    name: "Nguyễn Chính Nam Khánh",
                    email: "namhatt@yahoo.com",
                    avatar_url: null
                }
            }
        ]
    },

];

@observer
class DashboardExamComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new DashboardExamStore();
    }

    componentDidMount() {
        filterExamStore.loadData();
    }

    loadData = (filter) => {
        // this.store.loadAnalytic(filter);
    }

    getScore = (analytic, template) => {
        const analyticTemplate = analytic.filter((item) => template.exam_template_id == item.exam_template_id);

        let scores = [];


        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                scores = [...scores, {...user_exam, 'class': item.class}];
            });
        });

        return scores.sort((a, b) => b.score - a.score);

    }
    getGroupScore = (analytic, group) => {
        const analyticTemplate = analytic.filter((item) => item.group_exam_id == group.id);

        let scores = [];


        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                scores = [...scores, {...user_exam, 'class': item.class}];
            });
        });

        return scores.sort((a, b) => b.score - a.score);

    }
    getGroupStudent = (analytic, group) => {
        const analyticTemplate = analytic.filter((item) => item.group_exam_id == group.id);

        let students = [];
        let student_ids = [];


        analyticTemplate.forEach((item) => {
            item.user_exams.forEach((user_exam) => {
                if (student_ids.indexOf(user_exam.user_id) < 0) {
                    students = [...students, {...user_exam.user, 'class': item.class}];

                }
            });
        });

        return students;

    }
    getAnalyticsMna = (scores) => {
        let class_ids = [];
        let classes = [];
        scores.forEach((o) => {
            if (class_ids.indexOf(o.class.id) < 0) {
                classes.push(o.class);
                class_ids.push(o.class.id);
            }
        });

        let labels = classes.map(c=>c.name);


        let data = [

            {name:'Max',fill: false,data:[]},
            {name:'Avg',fill: false,data:[]},
            {name:'Min',fill: false,data:[]},
        ];
        classes.forEach(c => {
            let min = 10, max = 0, sum = 0, count = 0;
            scores.forEach(score => {
                if (score.class.id == c.id) {
                    if (score.score) {
                        sum += score.score;
                        count++;
                        min = Math.min(score.score, min);
                        max = Math.max(score.score, max);
                    }
                }
            });

            data[0].data.push(max);
            data[1].data.push(sum/count);
            data[2].data.push(min);
        });

        return {
            labels,
            data
        };
    }

    getAnalytics = (scores) => {

        let class_ids = [];
        let classes = [];
        scores.forEach((o) => {
            if (class_ids.indexOf(o.class.id) < 0) {
                classes.push(o.class);
                class_ids.push(o.class.id);
            }
        });

        let res = classes.map(c => {
            let data = labels.map((item, index) => {
                return scores.filter(score => {
                    if (index == 0) {
                        return score.score >= index && score.score <= index + 1 && score.class.id == c.id;
                    } else {
                        return score.score > index && score.score <= index + 1 && score.class.id == c.id;
                    }
                }).length;

            });
            return {
                label: c.name,
                name: c.name,
                color: '#c50000',
                // yAxisID: 'A',
                data
            };
        });

        // let res2 = labels.map((item, index) => {
        //     let val = scores.filter(score => {
        //         if (index == 0) {
        //             return score.score >= index && score.score <= index + 1;
        //         } else {
        //             return score.score > index && score.score <= index + 1;
        //         }
        //     }).length;
        //
        //     return {
        //         label: 1,
        //             // yAxisID: 'A',
        //         data: [100, 96, 84, 76, 69]
        //     };
        // });
        // {
        //     label: 'A',
        //         yAxisID: 'A',
        //     data: [100, 96, 84, 76, 69]
        // }
        return res;
    };

    getGroupExams = () => {
        let groupExamIds = [];
        let groupExams = [];
        analytic_exam.forEach(itm => {
            if (groupExamIds.indexOf(itm.group_exam_id) == -1) {
                groupExamIds.push(itm.group_exam_id);
                groupExams.push(itm.group_exam);
            }
        });
        return [...groupExams, {id: null, name: 'Không có nhóm'}];
    }

    render() {
        let {isLoading,} = this.store;
        let {course_id, class_id} = filterExamStore.filter;
        const emptyTitle = (course_id || class_id) ? "Không có dữ liệu" : "Chọn môn học hoặc lớp để xem thống kê bài kiểm tra";
        let groupExams = this.getGroupExams();
        console.log(analytic_exam)
        return (
            <div>
                <FilterExam loadData={this.loadData}/>
                <CardAcademy/>

                <div className="row gutter-20 margin-top-20">
                    <div className="col-md-12">
                        {(isLoading || filterExamStore.isLoading) && <Loading/>}
                        {!(isLoading || filterExamStore.isLoading) && analytic_exam.length == 0 &&
                        <EmptyData title={emptyTitle}/>}


                        {!(isLoading || filterExamStore.isLoading) && groupExams.map((group, key_group) => {
                            let templates = analytic_exam.filter((template) => template.group_exam_id == group.id);
                            let groupScores = this.getGroupScore(analytic_exam, group);
                            let groupStudents = this.getGroupStudent(analytic_exam, group);
                            console.log(group.id, groupScores);
                            if (templates.length) return (
                                <div className="card" key={key_group}>
                                    <div className="card-content">

                                        <div className="flex flex-row flex-align-items-center" style={{
                                            fontWeight: 'bold',
                                            fontSize: 30,
                                            marginTop: 30,
                                            marginBottom: 40,
                                        }}>
                                            {group.name}
                                        </div>
                                        <div>
                                            {templates.map((template, key_temp) => {

                                                const scores = this.getScore(analytic_exam, template);
                                                const data = this.getAnalytics(scores);
                                                let barchartId = `barchart-analytics-exam-${key_group}-${key_temp}-${template.group_exam_id}-${template.exam_template_id}`;
                                                // console.log(barchartId, data);
                                                return (
                                                    <div key={key_temp}>
                                                        <div><h6><strong>{template.title}</strong></h6></div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div>Phân tích phổ điểm</div>
                                                                <Barchart
                                                                    label={labels}
                                                                    data={data}
                                                                    id={barchartId}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <h6 className="margin-bottom-20"><strong>Bảng điểm chi tiết
                                                    ({groupStudents.length})</strong>
                                                </h6>
                                                <div style={{height: 300, overflowY: 'scroll'}}
                                                     className="smooth-scroll-y tableFixHead">
                                                    <table
                                                        className="table table-responsive white-table table-striped table-no-bordered table-hover"
                                                        cellSpacing="0" width="100%"
                                                        style={{width: "100%"}}>
                                                        <thead>
                                                        <th></th>
                                                        <th>Học viên</th>
                                                        <th>Lớp</th>
                                                        {templates.map(t => {
                                                            return (<th>{t.name}</th>);
                                                        })}
                                                        </thead>
                                                        <tbody>
                                                        {groupStudents.map((item, index) => {
                                                            let avatar = helper.avatarEmpty(item.avatar_url) ?
                                                                NO_AVATAR : item.avatar_url;
                                                            return (
                                                                <tr key={`${item.id}-${index}`}>
                                                                    <td>
                                                                        <div style={{
                                                                            background: "url('" + avatar + "') center center / cover",
                                                                            display: 'inline-block',
                                                                            width: '30px',
                                                                            height: '30px',
                                                                            borderRadius: '50%',
                                                                            verticalAlign: 'middle'
                                                                        }}
                                                                        />
                                                                    </td>
                                                                    <td onClick={() => openModalRegisterDetail(`/sales/info-student/${item.user.id}`)}>
                                                                        <strong>{item.name}</strong>
                                                                    </td>
                                                                    <td><strong>{item.class.name}</strong></td>
                                                                    {templates.map(t => {
                                                                        let userExam = groupScores.filter(gs => gs.class.id == item.class.id && t.id == gs.exam_id && gs.user_id == item.id)[0];
                                                                        return (
                                                                            <td>{userExam ? userExam.score : '-'}</td>);
                                                                    })}
                                                                </tr>
                                                            );
                                                        })}
                                                        </tbody>
                                                    </table>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="margin-top-20">
                                            {templates.map((template, key_temp) => {

                                                const scores = this.getScore(analytic_exam, template);
                                                const analyticsMna = this.getAnalyticsMna(scores);
                                                // console.log('temp :' + template.id, scores);
                                                return (
                                                    <div key={key_temp}>
                                                        <div><h6><strong>Tổng quan {template.title}</strong></h6></div>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                {/*<div>Phân tích phổ điểm</div>*/}
                                                                <MNABarChart
                                                                    label={analyticsMna.labels}
                                                                    data={analyticsMna.data}
                                                                    id={`barchart-mna-analytics-exam-${key_group}-${key_temp}-${template.group_exam_id}-${template.exam_template_id}`}
                                                                />
                                                            </div>
                                                            <div className="col-md-6">
                                                                {/*<div>Danh sách học viên({scores.length})</div>*/}
                                                                <div style={{height: 300, overflowY: 'scroll'}}
                                                                     className="smooth-scroll-y">
                                                                    <table id={`datatables-${key_group}-${key_temp}`}
                                                                           className="table table-responsive white-table table-striped table-no-bordered table-hover"
                                                                           cellSpacing="0" width="100%"
                                                                           style={{width: "100%"}}>
                                                                        <tbody>
                                                                        {[...scores,].map((item, index) => {
                                                                            let avatar = helper.avatarEmpty(item.user.avatar_url) ?
                                                                                NO_AVATAR : item.user.avatar_url;
                                                                            return (
                                                                                <tr key={item.id}>
                                                                                    <td>
                                                                                        <div style={{
                                                                                            background: "url('" + avatar + "') center center / cover",
                                                                                            display: 'inline-block',
                                                                                            width: '30px',
                                                                                            height: '30px',
                                                                                            borderRadius: '50%',
                                                                                            verticalAlign: 'middle'
                                                                                        }}
                                                                                        />
                                                                                    </td>
                                                                                    <td onClick={() => openModalRegisterDetail(`/sales/info-student/${item.user.id}`)}>
                                                                                        <strong>{item.user.name}</strong>
                                                                                    </td>
                                                                                    <td><a style={{color: 'black'}}
                                                                                           href={`/teaching/class/${item.class.id}`}
                                                                                           target="_blank"><strong>{item.class.name}</strong></a>
                                                                                    </td>
                                                                                    <td>{item.score}</td>
                                                                                    <td>#{index + 1}</td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                </div>
                            );
                        })}


                    </div>

                </div>
            </div>

        );
    }
}


export default DashboardExamComponent;
