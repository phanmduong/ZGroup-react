import React from "react";
import * as helper from "../../helpers/helper";
import Barchart from './Barchart';
import Loading from '../../components/common/Loading';
import TooltipButton from '../../components/common/TooltipButton';
class DashBoardUpComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dashboard: {
                "total_classes": 58,
                "count_total": 0,
                "count_paid": 0,
                "classes": [
                    {
                        "id": 578,
                        "name": "AI 1-1",
                        "datestart": "13 Tháng Mười, 2017",
                        "datestart_en": "2017-10-13",
                        "study_time": "Tuỳ theo sự sắp xếp của trợ giảng và giảng viên",
                        "description": "Học riêng với giảng viên (Học phí: 2.500.000đ)",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 1,
                        "target": 1,
                        "total_register": 1,
                        "regis_target": 1,
                        "type": "active",
                        "created_at": "13:50, 14 Tháng Tư, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "room": {
                            "id": 17,
                            "name": "Tầng 3",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 834,
                        "name": "Thiết kế chuyên sâu 1.2",
                        "datestart": "01 Tháng M. một, 2017",
                        "datestart_en": "2017-11-01",
                        "study_time": "(19h-21h) Thứ 2 - Thứ 4 - Thứ 6 ",
                        "description": "Khai giảng ngày 1 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 24,
                        "total_paid": 11,
                        "target": 15,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "13:32, 31 Tháng Tám, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 7,
                            "name": "Thiết Kế Chuyên Sâu",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1494575688odFkdXzweOeXMpO.jpg"
                        },
                        "room": {
                            "id": 17,
                            "name": "Tầng 3",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 909,
                        "name": "XD 30.1",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(15h-17h) Thứ 7 - Chủ nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 19,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "22:03, 26 Tháng Chín, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 8,
                            "name": "UI UX",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/150643679690MuQbClSmXQ7ug.jpg"
                        },
                        "room": {
                            "id": 17,
                            "name": "Tầng 3",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 914,
                        "name": "PS - Danh Sách Chờ (Cơ sở 4)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "description": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 10,
                        "target": 1,
                        "total_register": 15,
                        "regis_target": 1,
                        "type": "waiting",
                        "created_at": "21:11, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher_assistant": {
                            "id": 1,
                            "name": "Cao Anh Quan",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 19,
                            "name": "Tầng 3",
                            "base": "Cơ sở 4",
                            "address": "Số 15 ngõ 2 Thọ Tháp (Trần Thái Tông rẽ vào) - Cầu Giấy - Hà Nội",
                            "base_id": 8
                        }
                    },
                    {
                        "id": 916,
                        "name": "PS 30.11 (Cơ sở 4)",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 20,
                        "target": 20,
                        "total_register": 20,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:11, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 708,
                            "name": "Hoàng Minh Tùng ",
                            "color": "ffc107"
                        },
                        "teacher_assistant": {
                            "id": 587,
                            "name": "Nguyễn Ngọc Xuyến",
                            "color": "cddc39"
                        },
                        "room": {
                            "id": 19,
                            "name": "Tầng 3",
                            "base": "Cơ sở 4",
                            "address": "Số 15 ngõ 2 Thọ Tháp (Trần Thái Tông rẽ vào) - Cầu Giấy - Hà Nội",
                            "base_id": 8
                        }
                    },
                    {
                        "id": 917,
                        "name": "PS - Danh Sách Chờ (Cơ sở 3)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "description": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 25,
                        "target": 1,
                        "total_register": 57,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:12, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher_assistant": {
                            "id": 41,
                            "name": "Con Cá",
                            "color": "673ab7"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 919,
                        "name": "PS - Danh Sách Chờ (Cơ sở 2)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "ColorME sẽ gọi cho bạn ngay khi có khoá mới. ",
                        "description": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 6,
                        "target": 1,
                        "total_register": 27,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:12, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher_assistant": {
                            "id": 336,
                            "name": "Nguyễn Kiều Trang",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 14,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        }
                    },
                    {
                        "id": 920,
                        "name": "PS - Danh Sách Chờ (Cơ sở 1)",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "description": "ColorME sẽ gọi cho bạn ngay khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 34,
                        "target": 1,
                        "total_register": 85,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:12, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher_assistant": {
                            "id": 41,
                            "name": "Con Cá",
                            "color": "673ab7"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 921,
                        "name": "PS 30.13 (Sài Gòn)",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(9h-11h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 17,
                        "total_paid": 19,
                        "target": 20,
                        "total_register": 23,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:12, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 4252,
                            "name": "Đạt Lương",
                            "color": "f44336"
                        },
                        "teacher_assistant": {
                            "id": 6123,
                            "name": "Toàn Juno",
                            "color": "4caf50"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 922,
                        "name": "PS 30.12 (Sài Gòn)",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(9h-11h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 14,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 18,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:12, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 6017,
                            "name": "Dương Thị Quản Hậu",
                            "color": "9c27b0"
                        },
                        "teacher_assistant": {
                            "id": 6123,
                            "name": "Toàn Juno",
                            "color": "4caf50"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 923,
                        "name": "PS 30.14 (Sài Gòn)",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 18,
                        "target": 20,
                        "total_register": 18,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:13, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 4092,
                            "name": "Nguyễn Huỳnh Vĩ Hòa",
                            "color": "ff5722"
                        },
                        "teacher_assistant": {
                            "id": 5364,
                            "name": "Vũ Khánh Phượng",
                            "color": "ffeb3b"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 925,
                        "name": "PS 30.8 (Cơ sở 2)",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(9h-11h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 17,
                        "total_paid": 12,
                        "target": 15,
                        "total_register": 14,
                        "regis_target": 15,
                        "type": "",
                        "created_at": "21:13, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 708,
                            "name": "Hoàng Minh Tùng ",
                            "color": "ffc107"
                        },
                        "teacher_assistant": {
                            "id": 3790,
                            "name": "Hưng Hin",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 14,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        }
                    },
                    {
                        "id": 927,
                        "name": "PS 30.6",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(19h-21h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 19,
                        "total_paid": 11,
                        "target": 20,
                        "total_register": 13,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:13, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 708,
                            "name": "Hoàng Minh Tùng ",
                            "color": "ffc107"
                        },
                        "teacher_assistant": {
                            "id": 5162,
                            "name": "Ba Ba",
                            "color": "8bc34a"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 928,
                        "name": "PS 30.5",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(15h-17h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 21,
                        "target": 20,
                        "total_register": 23,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:13, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 2975,
                            "name": "Lê Anh Đức",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 2996,
                            "name": "Minh Triều",
                            "color": "9c27b0"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 930,
                        "name": "PS 30.3",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(09h-11h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 14,
                        "total_paid": 16,
                        "target": 20,
                        "total_register": 17,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:13, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 38,
                            "name": "Trịnh Thanh Hà",
                            "color": "8bc34a"
                        },
                        "teacher_assistant": {
                            "id": 3253,
                            "name": "Hương Phan",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 931,
                        "name": "PS 30.2",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 19,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:14, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 40,
                            "name": " Đức Hoàng",
                            "color": "2196f3"
                        },
                        "teacher_assistant": {
                            "id": 2975,
                            "name": "Lê Anh Đức",
                            "color": "e91e63"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 932,
                        "name": "PS 30.4",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 14,
                        "target": 20,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:14, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 3253,
                            "name": "Hương Phan",
                            "color": "2196f3"
                        },
                        "teacher_assistant": {
                            "id": 38,
                            "name": "Trịnh Thanh Hà",
                            "color": "8bc34a"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 933,
                        "name": "PS 30.1",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 12,
                        "total_paid": 14,
                        "target": 20,
                        "total_register": 14,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:14, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 40,
                            "name": " Đức Hoàng",
                            "color": "2196f3"
                        },
                        "teacher_assistant": {
                            "id": 708,
                            "name": "Hoàng Minh Tùng ",
                            "color": "ffc107"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 935,
                        "name": "AI - Danh Sách Chờ (Cơ sở 4)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 15,
                        "target": 1,
                        "total_register": 21,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:34, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher_assistant": {
                            "id": 336,
                            "name": "Nguyễn Kiều Trang",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 18,
                            "name": "Tầng 2",
                            "base": "Cơ sở 4",
                            "address": "Số 15 ngõ 2 Thọ Tháp (Trần Thái Tông rẽ vào) - Cầu Giấy - Hà Nội",
                            "base_id": 8
                        }
                    },
                    {
                        "id": 937,
                        "name": "PS 30.9 (Cơ sở 2)",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 16,
                        "target": 15,
                        "total_register": 17,
                        "regis_target": 15,
                        "type": "",
                        "created_at": "21:38, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 708,
                            "name": "Hoàng Minh Tùng ",
                            "color": "ffc107"
                        },
                        "teacher_assistant": {
                            "id": 3798,
                            "name": "Dương Thủy Tùng",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 14,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        }
                    },
                    {
                        "id": 939,
                        "name": "AI - Danh Sách Chờ (Cơ sở 1)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 50,
                        "target": 1,
                        "total_register": 97,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:45, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher_assistant": {
                            "id": 336,
                            "name": "Nguyễn Kiều Trang",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 940,
                        "name": "AI - Danh Sách Chờ (Cơ sở 2)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 7,
                        "target": 1,
                        "total_register": 13,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:45, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher_assistant": {
                            "id": 336,
                            "name": "Nguyễn Kiều Trang",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 15,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        }
                    },
                    {
                        "id": 941,
                        "name": "AI - Danh Sách Chờ (Cơ sở 3)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "Nhận ưu đãi tốt nhất từ colorME",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 35,
                        "target": 1,
                        "total_register": 70,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "21:45, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher_assistant": {
                            "id": 336,
                            "name": "Nguyễn Kiều Trang",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 942,
                        "name": "AI 30.1",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(9h-11h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 3,
                        "total_paid": 13,
                        "target": 20,
                        "total_register": 13,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:45, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4628,
                            "name": "Hoàng Hiệp",
                            "color": "3f51b5"
                        },
                        "teacher_assistant": {
                            "id": 2531,
                            "name": "Huyền Thanh",
                            "color": "8bc34a"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 943,
                        "name": "AI 30.2",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 17,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:45, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 45,
                            "name": "Nguyen Mine Linh",
                            "color": "cddc39"
                        },
                        "teacher_assistant": {
                            "id": 4068,
                            "name": "Ngọc Diệp",
                            "color": "e91e63"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 947,
                        "name": "AI 30.3",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(15h-17h) thứ 4 - thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017 ",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 15,
                        "total_paid": 15,
                        "target": 20,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:49, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4068,
                            "name": "Ngọc Diệp",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 2531,
                            "name": "Huyền Thanh",
                            "color": "8bc34a"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 948,
                        "name": "AI 30.4",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 20,
                        "target": 20,
                        "total_register": 21,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:49, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4068,
                            "name": "Ngọc Diệp",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 2233,
                            "name": "Ngô Thị Thuỳ Duyên",
                            "color": "ff5722"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 949,
                        "name": "AI 30.5",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(19h-21h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 19,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 22,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:49, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 3270,
                            "name": "Nguyễn Khánh Linh",
                            "color": "009688"
                        },
                        "teacher_assistant": {
                            "id": 2569,
                            "name": " Công Thành",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 950,
                        "name": "AI 30.6 (cơ sở 2)",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 10,
                        "target": 20,
                        "total_register": 11,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:49, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 3078,
                            "name": "Ninh Văn Quân ",
                            "color": "673ab7"
                        },
                        "teacher_assistant": {
                            "id": 2569,
                            "name": " Công Thành",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 15,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        }
                    },
                    {
                        "id": 951,
                        "name": "AI 30.7 (cơ sở 2)",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(15h-17h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017 ",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 9,
                        "target": 15,
                        "total_register": 10,
                        "regis_target": 15,
                        "type": "",
                        "created_at": "21:49, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 5159,
                            "name": "Nguyễn Quang Hải",
                            "color": "4caf50"
                        },
                        "teacher_assistant": {
                            "id": 2233,
                            "name": "Ngô Thị Thuỳ Duyên",
                            "color": "ff5722"
                        },
                        "room": {
                            "id": 15,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        }
                    },
                    {
                        "id": 952,
                        "name": "AI 30.8 (cơ sở 4)",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) thứ 4 - thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017 ",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 7,
                        "target": 15,
                        "total_register": 7,
                        "regis_target": 15,
                        "type": "",
                        "created_at": "21:49, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 3270,
                            "name": "Nguyễn Khánh Linh",
                            "color": "009688"
                        },
                        "teacher_assistant": {
                            "id": 2569,
                            "name": " Công Thành",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 19,
                            "name": "Tầng 3",
                            "base": "Cơ sở 4",
                            "address": "Số 15 ngõ 2 Thọ Tháp (Trần Thái Tông rẽ vào) - Cầu Giấy - Hà Nội",
                            "base_id": 8
                        }
                    },
                    {
                        "id": 955,
                        "name": "AI 30.11 (Sài Gòn)",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) thứ 4 - thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 11,
                        "target": 20,
                        "total_register": 14,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:50, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4280,
                            "name": "Lê Huỳnh Mai Phương",
                            "color": "3f51b5"
                        },
                        "teacher_assistant": {
                            "id": 6017,
                            "name": "Dương Thị Quản Hậu",
                            "color": "9c27b0"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 956,
                        "name": "AI 30.12 (Sài Gòn)",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(15h-17h) thứ 3 - thứ 5",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 12,
                        "total_paid": 13,
                        "target": 20,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:50, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 6124,
                            "name": "Khanh Nguyễn",
                            "color": "f44336"
                        },
                        "teacher_assistant": {
                            "id": 4512,
                            "name": "Võ Vân Anh",
                            "color": "ffeb3b"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 957,
                        "name": "AI 30.10 (Sài Gòn)",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(9h-11h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 07 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 3,
                        "total_paid": 10,
                        "target": 20,
                        "total_register": 11,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "22:00, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4249,
                            "name": "Vũ Duy",
                            "color": "607d8b"
                        },
                        "teacher_assistant": {
                            "id": 4092,
                            "name": "Nguyễn Huỳnh Vĩ Hòa",
                            "color": "ff5722"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 958,
                        "name": "ID 30.1",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 14,
                        "target": 20,
                        "total_register": 14,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "22:04, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 6,
                            "name": "InDesign",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481440169SyPRLsY5aXZOL6d.jpg"
                        },
                        "teacher": {
                            "id": 4628,
                            "name": "Hoàng Hiệp",
                            "color": "3f51b5"
                        },
                        "teacher_assistant": {
                            "id": 3078,
                            "name": "Ninh Văn Quân ",
                            "color": "673ab7"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 959,
                        "name": "ID - Khoá Sau (Danh Sách Chờ)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 25,
                        "target": 1,
                        "total_register": 57,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "22:04, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 6,
                            "name": "InDesign",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481440169SyPRLsY5aXZOL6d.jpg"
                        },
                        "teacher_assistant": {
                            "id": 3078,
                            "name": "Ninh Văn Quân ",
                            "color": "673ab7"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 961,
                        "name": "PT 30.2",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 10,
                        "target": 10,
                        "total_register": 10,
                        "regis_target": 10,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher": {
                            "id": 3474,
                            "name": "Hoàng Nam Dương",
                            "color": "cddc39"
                        },
                        "teacher_assistant": {
                            "id": 3475,
                            "name": "Hà Phương Thảo",
                            "color": ""
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 962,
                        "name": "PT 30.1",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(15h-17h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 12,
                        "total_paid": 10,
                        "target": 10,
                        "total_register": 10,
                        "regis_target": 10,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher": {
                            "id": 1193,
                            "name": "Son Pham",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 5164,
                            "name": "Lê Minh Anh",
                            "color": "009688"
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 963,
                        "name": "PT - Khoá Sau (Danh Sách Chờ)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "Nhận ưu đãi tốt nhất từ colorME",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 14,
                        "target": 1,
                        "total_register": 38,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher_assistant": {
                            "id": 1193,
                            "name": "Son Pham",
                            "color": "e91e63"
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 964,
                        "name": "PT 30.4",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(15h-17h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 4,
                        "target": 10,
                        "total_register": 6,
                        "regis_target": 10,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher": {
                            "id": 1193,
                            "name": "Son Pham",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 3150,
                            "name": "Nguyễn Thành Trung",
                            "color": "3f51b5"
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 965,
                        "name": "PT 30.3",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 9,
                        "target": 10,
                        "total_register": 10,
                        "regis_target": 10,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher": {
                            "id": 3474,
                            "name": "Hoàng Nam Dương",
                            "color": "cddc39"
                        },
                        "teacher_assistant": {
                            "id": 2333,
                            "name": "Wato",
                            "color": "795548"
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 967,
                        "name": "PR 30.1",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(19h-21h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 19,
                        "total_paid": 18,
                        "target": 20,
                        "total_register": 20,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 5,
                            "name": "Premiere",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                        },
                        "teacher": {
                            "id": 3269,
                            "name": "Trần Quang Vũ",
                            "color": "00bcd4"
                        },
                        "teacher_assistant": {
                            "id": 7884,
                            "name": "Nguyễn Anh Quân",
                            "color": "3f51b5"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 968,
                        "name": "PR - Danh Sách Chờ (Cơ sở 1)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "Nhận ưu đãi tốt nhất từ colorME",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 25,
                        "target": 1,
                        "total_register": 58,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "22:05, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 5,
                            "name": "Premiere",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                        },
                        "teacher_assistant": {
                            "id": 46,
                            "name": "Thu Trang",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 969,
                        "name": "AE - Danh Sách Chờ (Cơ sở 1)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 41,
                        "target": 1,
                        "total_register": 68,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "22:06, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "teacher_assistant": {
                            "id": 46,
                            "name": "Thu Trang",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 970,
                        "name": "AE - Danh Sách Chờ (Cơ sở 3)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 19,
                        "target": 1,
                        "total_register": 38,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "22:06, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "teacher_assistant": {
                            "id": 46,
                            "name": "Thu Trang",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 971,
                        "name": "AE 30.1",
                        "datestart": "07 Tháng M. một, 2017",
                        "datestart_en": "2017-11-07",
                        "study_time": "(19h-21h) Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 7 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 18,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "22:06, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "teacher": {
                            "id": 74,
                            "name": "Phạm Khánh Huyền",
                            "color": "00bcd4"
                        },
                        "teacher_assistant": {
                            "id": 507,
                            "name": "Le Tuan Dat",
                            "color": "4caf50"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 972,
                        "name": "AE 30.3",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(15h-17h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 15,
                        "target": 20,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "22:06, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "teacher": {
                            "id": 1298,
                            "name": "Vũ Thanh Bình",
                            "color": "ff9800"
                        },
                        "teacher_assistant": {
                            "id": 3285,
                            "name": "Nguyễn Văn Thành",
                            "color": "ff5722"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 974,
                        "name": "PR - Danh Sách Chờ (Cơ sở 4)",
                        "datestart": "10 Tháng Mười, 2017",
                        "datestart_en": "2017-10-10",
                        "study_time": "colorME sẽ gọi cho bạn mỗi khi có khoá mới.",
                        "description": "Nhận ưu đãi tốt nhất từ colorME",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 0,
                        "total_paid": 5,
                        "target": 1,
                        "total_register": 12,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "22:15, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 5,
                            "name": "Premiere",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                        },
                        "teacher_assistant": {
                            "id": 46,
                            "name": "Thu Trang",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 19,
                            "name": "Tầng 3",
                            "base": "Cơ sở 4",
                            "address": "Số 15 ngõ 2 Thọ Tháp (Trần Thái Tông rẽ vào) - Cầu Giấy - Hà Nội",
                            "base_id": 8
                        }
                    },
                    {
                        "id": 975,
                        "name": "PT 30.5",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(9h-11h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 17,
                        "total_paid": 9,
                        "target": 10,
                        "total_register": 11,
                        "regis_target": 10,
                        "type": "",
                        "created_at": "22:20, 10 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher": {
                            "id": 650,
                            "name": "Nguyễn Việt Anh",
                            "color": "ffeb3b"
                        },
                        "teacher_assistant": {
                            "id": 40,
                            "name": " Đức Hoàng",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 976,
                        "name": "AE 30.4 (Sài Gòn)",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(19h-21h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 19,
                        "total_paid": 16,
                        "target": 20,
                        "total_register": 19,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "23:30, 11 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "teacher": {
                            "id": 41,
                            "name": "Con Cá",
                            "color": "673ab7"
                        },
                        "teacher_assistant": {
                            "id": 5708,
                            "name": "Phan Minh Tú",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 977,
                        "name": "AE 30.5 (Sài Gòn)",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "(15h-17h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 8 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 15,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 17,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "14:08, 12 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "teacher": {
                            "id": 4249,
                            "name": "Vũ Duy",
                            "color": "607d8b"
                        },
                        "teacher_assistant": {
                            "id": 4254,
                            "name": "Huỳnh Vũ Hoài Nhân",
                            "color": "795548"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 979,
                        "name": "PR 30.3 (Sài Gòn)",
                        "datestart": "11 Tháng M. một, 2017",
                        "datestart_en": "2017-11-11",
                        "study_time": "(15h-17h) Thứ 7 - Chủ Nhật",
                        "description": "Khai giảng ngày 11 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 18,
                        "total_paid": 18,
                        "target": 20,
                        "total_register": 19,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "14:10, 12 Tháng Mười, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 5,
                            "name": "Premiere",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                        },
                        "teacher": {
                            "id": 41,
                            "name": "Con Cá",
                            "color": "673ab7"
                        },
                        "teacher_assistant": {
                            "id": 4481,
                            "name": "Việt Hùng Đoàn",
                            "color": "3f51b5"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 981,
                        "name": "PS - VN Airline",
                        "datestart": "01 Tháng M. một, 2017",
                        "datestart_en": "2017-11-01",
                        "study_time": "(17h15-19h15) Thứ 2 - Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 1 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 6,
                        "target": 4,
                        "total_register": 6,
                        "regis_target": 6,
                        "type": "active",
                        "created_at": "17:04, 3 Tháng M. một, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 982,
                        "name": "PR - VN Airline",
                        "datestart": "01 Tháng M. một, 2017",
                        "datestart_en": "2017-11-01",
                        "study_time": "(17h15-19h15) Thứ 2 - Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 1 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 6,
                        "target": 4,
                        "total_register": 6,
                        "regis_target": 6,
                        "type": "active",
                        "created_at": "17:05, 3 Tháng M. một, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 5,
                            "name": "Premiere",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                        },
                        "teacher": {
                            "id": 650,
                            "name": "Nguyễn Việt Anh",
                            "color": "ffeb3b"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 983,
                        "name": "AE - VN Airline",
                        "datestart": "01 Tháng M. một, 2017",
                        "datestart_en": "2017-11-01",
                        "study_time": "(17h15-19h15) Thứ 2 - Thứ 3 - Thứ 5",
                        "description": "Khai giảng ngày 1 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 6,
                        "target": 4,
                        "total_register": 6,
                        "regis_target": 6,
                        "type": "active",
                        "created_at": "17:07, 3 Tháng M. một, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 3,
                            "name": "After Effects",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    },
                    {
                        "id": 986,
                        "name": "PS 30.15 (Sài Gòn)",
                        "datestart": "15 Tháng M. một, 2017",
                        "datestart_en": "2017-11-15",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 15 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 17,
                        "target": 20,
                        "total_register": 19,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "19:20, 3 Tháng M. một, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 4281,
                            "name": "Nguyễn Duy Gia Trí",
                            "color": "2196f3"
                        },
                        "teacher_assistant": {
                            "id": 4092,
                            "name": "Nguyễn Huỳnh Vĩ Hòa",
                            "color": "ff5722"
                        },
                        "room": {
                            "id": 20,
                            "name": "Tầng 5",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 987,
                        "name": "AI 30.13 (Sài Gòn)",
                        "datestart": "14 Tháng M. một, 2017",
                        "datestart_en": "2017-11-14",
                        "study_time": "(19h-21h) thứ 3 - thứ 5",
                        "description": "Khai giảng ngày 14 tháng 11 năm 2017",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 13,
                        "total_paid": 8,
                        "target": 20,
                        "total_register": 9,
                        "regis_target": 20,
                        "type": "",
                        "created_at": "21:15, 4 Tháng M. một, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4280,
                            "name": "Lê Huỳnh Mai Phương",
                            "color": "3f51b5"
                        },
                        "teacher_assistant": {
                            "id": 4281,
                            "name": "Nguyễn Duy Gia Trí",
                            "color": "2196f3"
                        },
                        "room": {
                            "id": 20,
                            "name": "Tầng 5",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        }
                    },
                    {
                        "id": 988,
                        "name": "ID 1-1",
                        "datestart": "08 Tháng M. một, 2017",
                        "datestart_en": "2017-11-08",
                        "study_time": "Tuỳ theo sự sắp xếp của trợ giảng và giảng viên",
                        "description": "Học riêng với giảng viên (Học phí: 2.500.000đ)",
                        "status": 0,
                        "activated": 0,
                        "link_drive": null,
                        "schedule_id": 15,
                        "total_paid": 1,
                        "target": 1,
                        "total_register": 1,
                        "regis_target": 1,
                        "type": "",
                        "created_at": "23:54, 5 Tháng M. một, 2017",
                        "gen": {
                            "id": 23,
                            "name": "30"
                        },
                        "course": {
                            "id": 6,
                            "name": "InDesign",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481440169SyPRLsY5aXZOL6d.jpg"
                        },
                        "teacher": {
                            "id": 3078,
                            "name": "Ninh Văn Quân ",
                            "color": "673ab7"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        }
                    }
                ],
                "now_classes": [
                    {
                        "id": 1073,
                        "name": "PS 32.11 (Sài Gòn)",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 201",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 19,
                        "target": 20,
                        "total_register": 19,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "22:13, 1 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 6017,
                            "name": "Dương Thị Quản Hậu",
                            "color": "9c27b0"
                        },
                        "teacher_assistant": {
                            "id": 5364,
                            "name": "Vũ Khánh Phượng",
                            "color": "ffeb3b"
                        },
                        "room": {
                            "id": 20,
                            "name": "Tầng 5",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8130,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 6017,
                                "name": "Dương Thị Quản Hậu",
                                "phone": "0943161435",
                                "email": "hauduong2812@gmail.com",
                                "color": "9c27b0",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1505413051Ir7cfcsdmlUCihU.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:48",
                                "check_out_time": "21:20"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8130,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 5364,
                                "name": "Vũ Khánh Phượng",
                                "phone": "0947045011",
                                "email": "khanhphuongvu311@gmail.com",
                                "color": "ffeb3b",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1514693309A2HNuclyG9lHPrv.jpg"
                            }
                        }
                    },
                    {
                        "id": 1074,
                        "name": "PS 32.15 (Sài Gòn)",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(15h-17h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 15,
                        "total_paid": 15,
                        "target": 20,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "22:13, 1 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 4481,
                            "name": "Việt Hùng Đoàn",
                            "color": "3f51b5"
                        },
                        "teacher_assistant": {
                            "id": 4092,
                            "name": "Nguyễn Huỳnh Vĩ Hòa",
                            "color": "ff5722"
                        },
                        "room": {
                            "id": 20,
                            "name": "Tầng 5",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        },
                        "time": "2018-01-31",
                        "start_time": "15:00",
                        "end_time": "17:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8138,
                            "order": 5,
                            "start_teaching_time": "15:00:00",
                            "end_teaching_time": "17:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4481,
                                "name": "Việt Hùng Đoàn",
                                "phone": "0938175143",
                                "email": "dvh.viethung0905@gmail.com",
                                "color": "3f51b5",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1494396792JkCMJIRQdtfqaXs.jpg"
                            },
                            "attendance": {
                                "check_in_time": "14:25",
                                "check_out_time": "17:24"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8138,
                            "order": 5,
                            "start_teaching_time": "15:00:00",
                            "end_teaching_time": "17:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4092,
                                "name": "Nguyễn Huỳnh Vĩ Hòa",
                                "phone": "0906878704",
                                "email": "Nguyenhuynhvihoa@gmail.com",
                                "color": "ff5722",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1510053483hNhRGDDD4hag0Jr.jpg"
                            },
                            "attendance": {
                                "check_in_time": "14:57",
                                "check_out_time": "17:20"
                            }
                        }
                    },
                    {
                        "id": 1078,
                        "name": "AI 32.14 (Sài Gòn)",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 11,
                        "target": 20,
                        "total_register": 15,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "22:40, 1 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4249,
                            "name": "Vũ Duy",
                            "color": "607d8b"
                        },
                        "teacher_assistant": {
                            "id": 8524,
                            "name": "Võ Bá Linh",
                            "color": "9c27b0"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8170,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4249,
                                "name": "Vũ Duy",
                                "phone": "0972268842",
                                "email": "gsvuduy2412@gmail.com",
                                "color": "607d8b",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1516195926NGV7MGrYr6L5t4X.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:59"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8170,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 8524,
                                "name": "Võ Bá Linh",
                                "phone": "01682128512",
                                "email": "vobalinh0@gmail.com",
                                "color": "9c27b0",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1513001127XleBomze1AGz1LJ.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:42",
                                "check_out_time": "21:03"
                            }
                        }
                    },
                    {
                        "id": 1079,
                        "name": "AI 32.13 (Sài Gòn)",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(15h-17h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 15,
                        "total_paid": 6,
                        "target": 20,
                        "total_register": 8,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "22:40, 1 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4280,
                            "name": "Lê Huỳnh Mai Phương",
                            "color": "3f51b5"
                        },
                        "teacher_assistant": {
                            "id": 6125,
                            "name": "Ngân",
                            "color": "00bcd4"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        },
                        "time": "2018-01-31",
                        "start_time": "15:00",
                        "end_time": "17:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8178,
                            "order": 5,
                            "start_teaching_time": "15:00:00",
                            "end_teaching_time": "17:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4280,
                                "name": "Lê Huỳnh Mai Phương",
                                "phone": "0969558278",
                                "email": "lephuong3107kts@gmail.com",
                                "color": "3f51b5",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1493191500V7JP3s2kdOZptZw.jpg"
                            },
                            "attendance": {
                                "check_out_time": "17:26"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8178,
                            "order": 5,
                            "start_teaching_time": "15:00:00",
                            "end_teaching_time": "17:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 6125,
                                "name": "Ngân",
                                "phone": "0939408557",
                                "email": "kimngan.ng.97@gmail.com",
                                "color": "00bcd4",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/151464391285NPbRPt7OPFwtN.jpg"
                            },
                            "attendance": {
                                "check_in_time": "14:58",
                                "check_out_time": "17:04"
                            }
                        }
                    },
                    {
                        "id": 1080,
                        "name": "AI 32.12 (Sài Gòn)",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(9h-11h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 14,
                        "total_paid": 21,
                        "target": 20,
                        "total_register": 22,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "22:40, 1 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4092,
                            "name": "Nguyễn Huỳnh Vĩ Hòa",
                            "color": "ff5722"
                        },
                        "teacher_assistant": {
                            "id": 4481,
                            "name": "Việt Hùng Đoàn",
                            "color": "3f51b5"
                        },
                        "room": {
                            "id": 16,
                            "name": "Tầng 4",
                            "base": "Cơ sở 3",
                            "address": "Số 835/14 Trần Hưng Đạo, Phường 1, Quận 5, TP HCM",
                            "base_id": 6
                        },
                        "time": "2018-01-31",
                        "start_time": "09:00",
                        "end_time": "11:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8186,
                            "order": 5,
                            "start_teaching_time": "09:00:00",
                            "end_teaching_time": "11:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4092,
                                "name": "Nguyễn Huỳnh Vĩ Hòa",
                                "phone": "0906878704",
                                "email": "Nguyenhuynhvihoa@gmail.com",
                                "color": "ff5722",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1510053483hNhRGDDD4hag0Jr.jpg"
                            },
                            "attendance": {
                                "check_in_time": "08:57",
                                "check_out_time": "11:22"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8186,
                            "order": 5,
                            "start_teaching_time": "09:00:00",
                            "end_teaching_time": "11:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4481,
                                "name": "Việt Hùng Đoàn",
                                "phone": "0938175143",
                                "email": "dvh.viethung0905@gmail.com",
                                "color": "3f51b5",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1494396792JkCMJIRQdtfqaXs.jpg"
                            },
                            "attendance": {
                                "check_in_time": "08:37",
                                "check_out_time": "11:08"
                            }
                        }
                    },
                    {
                        "id": 1089,
                        "name": "AI 32.3",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(15h-17h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 15,
                        "total_paid": 21,
                        "target": 20,
                        "total_register": 22,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "14:15, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4068,
                            "name": "Ngọc Diệp",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 7150,
                            "name": "Lưu Như Ngọc Thảo ",
                            "color": "ffc107"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        },
                        "time": "2018-01-31",
                        "start_time": "15:00",
                        "end_time": "17:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8258,
                            "order": 5,
                            "start_teaching_time": "15:00:00",
                            "end_teaching_time": "17:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4068,
                                "name": "Ngọc Diệp",
                                "phone": "01667525988",
                                "email": "Haraairi@gmail.com",
                                "color": "e91e63",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/149309022495t7mhYBRHDar6J.jpg"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8258,
                            "order": 5,
                            "start_teaching_time": "15:00:00",
                            "end_teaching_time": "17:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 7150,
                                "name": "Lưu Như Ngọc Thảo ",
                                "phone": "01678516979",
                                "email": "thaoji198@gmail.com",
                                "color": "ffc107",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1508124570BDMgNLa1cYigepG.jpg"
                            },
                            "attendance": {
                                "check_in_time": "14:48",
                                "check_out_time": "17:23"
                            }
                        }
                    },
                    {
                        "id": 1100,
                        "name": "AI 32.4",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 16 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 19,
                        "target": 20,
                        "total_register": 21,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "14:38, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 2,
                            "name": "Illustrator",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                        },
                        "teacher": {
                            "id": 4068,
                            "name": "Ngọc Diệp",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 7151,
                            "name": "Nguyễn Nhật Minh",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 9,
                            "name": "Tầng 2",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8346,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 4068,
                                "name": "Ngọc Diệp",
                                "phone": "01667525988",
                                "email": "Haraairi@gmail.com",
                                "color": "e91e63",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/149309022495t7mhYBRHDar6J.jpg"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8346,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 7151,
                                "name": "Nguyễn Nhật Minh",
                                "phone": "0935351296",
                                "email": "nmmail555@gmail.com",
                                "color": "f44336",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/151724343220l4Ua4FWkrr6sH.jpg"
                            },
                            "attendance": {
                                "check_in_time": "19:07",
                                "check_out_time": "21:00"
                            }
                        }
                    },
                    {
                        "id": 1114,
                        "name": "PS 32.3",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(9h-11h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 14,
                        "total_paid": 21,
                        "target": 20,
                        "total_register": 21,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "15:12, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 3253,
                            "name": "Hương Phan",
                            "color": "2196f3"
                        },
                        "teacher_assistant": {
                            "id": 38,
                            "name": "Trịnh Thanh Hà",
                            "color": "8bc34a"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        },
                        "time": "2018-01-31",
                        "start_time": "09:00",
                        "end_time": "11:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8458,
                            "order": 5,
                            "start_teaching_time": "09:00:00",
                            "end_teaching_time": "11:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 3253,
                                "name": "Hương Phan",
                                "phone": "01213233597",
                                "email": "hphan20897@gmail.com",
                                "color": "2196f3",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1500137704bFVQSenGU8HbkMZ.jpg"
                            },
                            "attendance": {
                                "check_in_time": "08:51",
                                "check_out_time": "11:16"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8458,
                            "order": 5,
                            "start_teaching_time": "09:00:00",
                            "end_teaching_time": "11:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 38,
                                "name": "Trịnh Thanh Hà",
                                "phone": "01666575729",
                                "email": "trinhthanhha1105@gmail.com",
                                "color": "8bc34a",
                                "avatar_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/146229259379k739AO8l3Ssyt.jpg"
                            },
                            "attendance": {
                                "check_in_time": "08:57",
                                "check_out_time": "11:29"
                            }
                        }
                    },
                    {
                        "id": 1115,
                        "name": "PS 32.4",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 23,
                        "target": 20,
                        "total_register": 23,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "15:12, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 3253,
                            "name": "Hương Phan",
                            "color": "2196f3"
                        },
                        "teacher_assistant": {
                            "id": 5162,
                            "name": "Ba Ba",
                            "color": "8bc34a"
                        },
                        "room": {
                            "id": 6,
                            "name": "Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8466,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 3253,
                                "name": "Hương Phan",
                                "phone": "01213233597",
                                "email": "hphan20897@gmail.com",
                                "color": "2196f3",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1500137704bFVQSenGU8HbkMZ.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:32"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8466,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 5162,
                                "name": "Ba Ba",
                                "phone": "01692721387",
                                "email": "thienhoa1906@gmail.com",
                                "color": "8bc34a",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1504598527Wy8XrGjPJgCAU8N.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:31",
                                "check_out_time": "21:10"
                            }
                        }
                    },
                    {
                        "id": 1118,
                        "name": "PS 32.7 (Cơ sở 2)",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 15,
                        "target": 15,
                        "total_register": 15,
                        "regis_target": 15,
                        "type": "active",
                        "created_at": "15:12, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 1,
                            "name": "Photoshop",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                        },
                        "teacher": {
                            "id": 587,
                            "name": "Nguyễn Ngọc Xuyến",
                            "color": "cddc39"
                        },
                        "teacher_assistant": {
                            "id": 3798,
                            "name": "Dương Thủy Tùng",
                            "color": "f44336"
                        },
                        "room": {
                            "id": 14,
                            "name": "Tầng 5",
                            "base": "Cơ sở 2",
                            "address": "Số 162 phố Phương Liệt ( số 83 Trường Chinh rẽ vào)  - Thanh Xuân - Hà Nội",
                            "base_id": 4
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8490,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 587,
                                "name": "Nguyễn Ngọc Xuyến",
                                "phone": "01662164306",
                                "email": "thaonguyencass25897@gmail.com",
                                "color": "cddc39",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1483364168VmBoUA5pF3RzuWb.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:42",
                                "check_out_time": "21:09"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8490,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 3798,
                                "name": "Dương Thủy Tùng",
                                "phone": "0966334999",
                                "email": "thuytungars1797@gmail.com",
                                "color": "f44336",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1489920493XF0vKLo4hgmAeQp.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:46",
                                "check_out_time": "21:07"
                            }
                        }
                    },
                    {
                        "id": 1129,
                        "name": "PT 32.3",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 1,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 9,
                        "target": 10,
                        "total_register": 9,
                        "regis_target": 10,
                        "type": "active",
                        "created_at": "15:55, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 4,
                            "name": "Photography",
                            "icon_url": "http://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                        },
                        "teacher": {
                            "id": 1193,
                            "name": "Son Pham",
                            "color": "e91e63"
                        },
                        "teacher_assistant": {
                            "id": 5164,
                            "name": "Lê Minh Anh",
                            "color": "009688"
                        },
                        "room": {
                            "id": 8,
                            "name": "Studio Tầng 5",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8578,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 1193,
                                "name": "Son Pham",
                                "phone": "0900000000",
                                "email": "phamthaison306d6@gmail.com",
                                "color": "e91e63",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1476506495V1mas2EP9izgHJR.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:25",
                                "check_out_time": "21:28"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8578,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 5164,
                                "name": "Lê Minh Anh",
                                "phone": "01683702016",
                                "email": "minhtit96@gmail.com",
                                "color": "009688",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1496899336X5OvpUQyMa5207E.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:54",
                                "check_out_time": "21:02"
                            }
                        }
                    },
                    {
                        "id": 1137,
                        "name": "ID 32.1",
                        "datestart": "17 Tháng Một, 2018",
                        "datestart_en": "2018-01-17",
                        "study_time": "(19h-21h) Thứ 4 - Thứ 6",
                        "description": "Khai giảng ngày 17 tháng 1 năm 2018",
                        "status": 0,
                        "activated": 1,
                        "link_drive": null,
                        "schedule_id": 16,
                        "total_paid": 20,
                        "target": 20,
                        "total_register": 21,
                        "regis_target": 20,
                        "type": "active",
                        "created_at": "16:15, 13 Tháng M. hai, 2017",
                        "gen": {
                            "id": 26,
                            "name": "32"
                        },
                        "course": {
                            "id": 6,
                            "name": "InDesign",
                            "icon_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1481440169SyPRLsY5aXZOL6d.jpg"
                        },
                        "teacher": {
                            "id": 3078,
                            "name": "Ninh Văn Quân ",
                            "color": "673ab7"
                        },
                        "teacher_assistant": {
                            "id": 3270,
                            "name": "Nguyễn Khánh Linh",
                            "color": "009688"
                        },
                        "room": {
                            "id": 4,
                            "name": "Tầng 4",
                            "base": "Cơ sở 1",
                            "address": " Số 175 phố Chùa Láng - Đống Đa - Hà Nội",
                            "base_id": 3
                        },
                        "time": "2018-01-31",
                        "start_time": "19:00",
                        "end_time": "21:00",
                        "attendance_teacher": {
                            "class_lesson_id": 8642,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 3078,
                                "name": "Ninh Văn Quân ",
                                "phone": "01648129097",
                                "email": "ninhquan97@gmail.com",
                                "color": "673ab7",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1498065283U5vO3LMcjc6eDCL.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:42",
                                "check_out_time": "21:32"
                            }
                        },
                        "attendance_teacher_assistant": {
                            "class_lesson_id": 8642,
                            "order": 5,
                            "start_teaching_time": "19:00:00",
                            "end_teaching_time": "21:00:00",
                            "is_change": false,
                            "staff": {
                                "id": 3270,
                                "name": "Nguyễn Khánh Linh",
                                "phone": "0941079880",
                                "email": "linhnk.tec@gmail.com",
                                "color": "009688",
                                "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/15082334082o0FRWYc6YtqE5H.jpg"
                            },
                            "attendance": {
                                "check_in_time": "18:26"
                            }
                        }
                    }
                ],
                "courses": [
                    {
                        "total_classes": 18,
                        "id": 1,
                        "name": "Photoshop",
                        "color": "#3F51B5"
                    },
                    {
                        "total_classes": 17,
                        "id": 2,
                        "name": "Illustrator",
                        "color": "#ff5722"
                    },
                    {
                        "total_classes": 7,
                        "id": 3,
                        "name": "After Effects",
                        "color": "#673AB7"
                    },
                    {
                        "total_classes": 6,
                        "id": 4,
                        "name": "Photography",
                        "color": "#000000"
                    },
                    {
                        "total_classes": 5,
                        "id": 5,
                        "name": "Premiere",
                        "color": "#9C27B0"
                    },
                    {
                        "total_classes": 3,
                        "id": 6,
                        "name": "InDesign",
                        "color": "#E91E63"
                    },
                    {
                        "total_classes": 1,
                        "id": 7,
                        "name": "Thiết Kế Chuyên Sâu",
                        "color": "#F44336"
                    },
                    {
                        "total_classes": 1,
                        "id": 8,
                        "name": "UI UX",
                        "color": ""
                    }
                ],
                "bonus": 0,
                "total_money": 468660000,
                "target_revenue": 519970000,
                "paid_number": 591,
                "zero_paid_number": 278,
                "register_number": 1266,
                "remain_days": -85.02,
                "percent_remain_days": 0,
                "registers_by_date": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    83,
                    26,
                    30,
                    10,
                    20,
                    29,
                    34,
                    38,
                    37,
                    38,
                    25,
                    64,
                    23,
                    27,
                    21,
                    44,
                    30,
                    17,
                    21,
                    12
                ],
                "paid_by_date": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    38,
                    8,
                    17,
                    5,
                    10,
                    16,
                    24,
                    18,
                    22,
                    30,
                    19,
                    49,
                    12,
                    23,
                    14,
                    25,
                    9,
                    12,
                    16,
                    9
                ],
                "date_array": [
                    "2017-10-01",
                    "2017-10-02",
                    "2017-10-03",
                    "2017-10-04",
                    "2017-10-05",
                    "2017-10-06",
                    "2017-10-07",
                    "2017-10-08",
                    "2017-10-09",
                    "2017-10-10",
                    "2017-10-11",
                    "2017-10-12",
                    "2017-10-13",
                    "2017-10-14",
                    "2017-10-15",
                    "2017-10-16",
                    "2017-10-17",
                    "2017-10-18",
                    "2017-10-19",
                    "2017-10-20",
                    "2017-10-21",
                    "2017-10-22",
                    "2017-10-23",
                    "2017-10-24",
                    "2017-10-25",
                    "2017-10-26",
                    "2017-10-27",
                    "2017-10-28",
                    "2017-10-29",
                    "2017-10-30",
                    "2017-10-31"
                ],
                "money_by_date": [
                    "10780000",
                    "31580000",
                    "4450000",
                    "13160000",
                    "15230000",
                    "9410000",
                    "21610000",
                    "6550000",
                    "19670000",
                    "19120000",
                    "15560000",
                    "9500000",
                    "11430000",
                    "6300000",
                    "12210000",
                    "1550000",
                    "4000000",
                    "8810000",
                    "17200000",
                    "6950000",
                    "17560000",
                    "18290000",
                    "69370000",
                    "33310000",
                    "13980000",
                    "3410000",
                    "2620000",
                    "10970000",
                    "5770000",
                    "22900000",
                    "25410000"
                ],
                "user": {
                    "id": 2,
                    "name": "Nguyễn Việt Hùng",
                    "email": "thanghungkhi@gmail.com",
                    "phone": "01684026343",
                    "username": "thanghungkhi",
                    "avatar_url": "http://d1j8r0kxyu9tj8.cloudfront.net/images/1503369355g3nTaVigDKKyjUQ.jpg",
                    "color": "009688",
                    "current_role": {
                        "id": 9,
                        "role_title": "CEO"
                    },
                    "role": 2,
                    "is_saler": false,
                    "rating": {
                        "rating_number_teach": 20,
                        "rating_avg_teach": "4.7500",
                        "rating_number_ta": 20,
                        "rating_avg_ta": "4.5000"
                    }
                },
                "time": 1517419486,
                "current_date": "01/02/2018",
                "end_time_gen": "08/11/2017"

            }
        };
    }

    componentWillMount() {
       // this.props.loadDashboard();
    }

    render() {
        if (this.props.isLoadingDashBoard) {
            return <Loading/>;
        } else {
            let {
                total_money, target_revenue, register_number, paid_number, zero_paid_number, remain_days,
                percent_remain_days, total_classes, courses, user, count_paid, count_total, registers_by_date, date_array,
                paid_by_date, money_by_date, classes, shifts, now_classes, current_date, end_time_gen

            } = this.state.dashboard;
            let classProfile = user.is_saler && user.rating ? 'col-md-3' : 'col-md-4';
            if (this.props.dashboard.user) {
                return (
                    <div>
                        <div className="row">
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Doanh
                                            thu</p>
                                        <h3 className="card-title">{helper.convertDotMoneyToK(helper.dotNumber(total_money))}/{helper.convertDotMoneyToK(helper.dotNumber(target_revenue))}</h3>
                                        <TooltipButton placement="top"
                                                       text={Math.round(total_money * 100 / target_revenue) + '%'}>
                                            <div className="progress progress-line-primary"
                                            >
                                                <div className="progress-bar" role="progressbar"
                                                     style={{width: total_money * 100 / target_revenue + '%'}}/>
                                            </div>
                                        </TooltipButton>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">timeline</i>
                                            <a href="#money-by-date">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Đã thanh toán</p>
                                        <h3 className="card-title">{paid_number}/{register_number}</h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton placement="top"
                                                           text={`${paid_number} học viên đã nộp tiền`}>
                                                <div className="progress-bar progress-bar-success"
                                                     style={{width: paid_number * 100 / register_number + '%'}}/>
                                            </TooltipButton>
                                            <TooltipButton placement="top"
                                                           text={`${zero_paid_number} học viên nộp 0 đồng`}>
                                                <div className="progress-bar progress-bar-warning"
                                                     style={{width: zero_paid_number * 100 / register_number + '%'}}/>
                                            </TooltipButton>
                                            <TooltipButton placement="top"
                                                           text={`${register_number - zero_paid_number - paid_number} chưa nộp tiền`}>
                                                <div className="progress progress-line-danger"
                                                     style={{width: (register_number - zero_paid_number - paid_number) * 100 / register_number + '%'}}/>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a href="">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Số phòng còn lại</p>
                                        <h3 className="card-title">{total_classes}</h3>
                                        <div className="progress progress-line-danger">
                                            {courses.map((course, index) => {
                                                return (
                                                    <TooltipButton placement="top" key={index}
                                                                   text={`${course.name}: ${course.total_classes} lớp`}>
                                                        <div className="progress-bar"
                                                             style={{
                                                                 width: (course.total_classes * 100 / total_classes) + '%',
                                                                 background: course.color
                                                             }}/>
                                                    </TooltipButton>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">list</i>
                                            <a href="">Chi tiết</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="card card-stats">
                                    <div className="card-content text-align-left">
                                        <p className="category">Số ngày còn lại</p>
                                        <h3 className="card-title">{remain_days}</h3>
                                        <div className="progress progress-line-danger">
                                            <TooltipButton placement="top"
                                                           text={`${Math.round((100 - percent_remain_days))}%`}>
                                                <div className="progress progress-line-rose">
                                                    <div className="progress-bar progress-bar-rose" role="progressbar"
                                                         style={{width: (100 - percent_remain_days) + '%'}}/>
                                                </div>
                                            </TooltipButton>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">update</i> {end_time_gen}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-stats">
                                    <div className="card-content">
                                        <div className="row">
                                            <div className={"text-align-left " + classProfile}>
                                                <p className="category">Nhân viên</p>
                                                <h3 className="card-title">{user.name}</h3>
                                                <div className="card-footer" style={{
                                                    margin: '10px 0 10px',
                                                }}>
                                                    <div className="stats">
                                                        <i className="material-icons">account_box</i>
                                                        <a href="/profile/my-profile">Trang cá nhân</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"text-align-left " + classProfile}>
                                                <p className="category">Chức vụ</p>
                                                <h3 className="card-title">{user.current_role.role_title}</h3>
                                            </div>
                                            {(user.is_saler) &&
                                            <div className={"text-align-left " + classProfile}>
                                                <p className="category">Chỉ tiêu</p>
                                                <h3 className="card-title">{`${count_paid}/${count_total}`}</h3>
                                                <TooltipButton placement="top"
                                                               text={`${count_paid}/${count_total}`}>
                                                    <div className="progress progress-line-rose">
                                                        <div className="progress-bar progress-bar-rose"
                                                             role="progressbar"
                                                             style={{width: `${count_paid * 100 / count_total}%`}}/>
                                                    </div>
                                                </TooltipButton>
                                                <div className="card-footer" style={{margin: '0 0 10px'}}>
                                                    <div className="stats">
                                                        <i className="material-icons">list</i>
                                                        <a href={"/teaching/registerlist/" + user.id}>Danh sách đăng
                                                            kí</a>
                                                    </div>
                                                </div>
                                            </div>
                                            }
                                            {
                                                (user.rating) &&
                                                <div className={"text-align-left " + classProfile}>
                                                    <p className="category">Đánh giá</p>
                                                    <TooltipButton placement="top"
                                                                   text={helper.calculatorRating([user.rating.rating_number_teach, user.rating.rating_number_ta],
                                                                       [user.rating.rating_avg_teach, user.rating.rating_avg_ta])}>
                                                        <div className="star-rating float-left">
                                            <span style={{
                                                width: 20 * helper.calculatorRating([user.rating.rating_number_teach, user.rating.rating_number_ta],
                                                    [user.rating.rating_avg_teach, user.rating.rating_avg_ta]) + '%'
                                            }}/>
                                                        </div>
                                                    </TooltipButton>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row" id="register-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">insert_chart</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Số lượng đăng kí theo ngày
                                            <small/>
                                        </h4>
                                        <Barchart
                                            label={date_array}
                                            data={[registers_by_date, paid_by_date]}
                                            id="barchar_register_by_date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" id="money-by-date">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">insert_chart</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Doanh thu theo ngày
                                            <small/>
                                        </h4>
                                        <Barchart
                                            label={date_array}
                                            data={[money_by_date]}
                                            id="barchar_money_by_date"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                );
            } else {
                return (
                    <h1>Có lỗi xảy ra</h1>
                );
            }
        }
    }
}

export default DashBoardUpComponent;