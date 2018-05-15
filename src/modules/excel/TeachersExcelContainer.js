import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as excelAction from './excelAction';
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';

class TeachersExcelContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.exportExcel = this.exportExcel.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);

    }

    componentWillMount() {
        this.props.excelAction.exportExcel(this.props.params.genId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isLoading && !nextProps.isLoading)
            this.exportExcel(nextProps);
    }

    exportExcel(nextProps) {
        let wb = helper.newWorkBook();
        let cols = [{"wch": 5}, {"wch": 12}, {"wch": 25},];//độ rộng cột
        //begin sheet
        /* eslint-disable */
        nextProps.data.teachers.forEach((item) => {
            let sheet =
                item.classes.map((obj, index) => {
                    let res = {
                        'STT': index + 1,
                        'Môn học': obj.name,
                        'Mô tả': obj.description,
                    };
                    obj.lesson.forEach((lesson, id) => {
                        res = {...res, [`Buổi ${id + 1}`]: lesson.attended_student + '/' + lesson.total_students};
                    });
                    return res;
                });
            //console.log('sheet',sheet);
            helper.appendJsonToWorkBook(sheet, wb, item.teacher.name, cols, []);
        });
        /* eslint-enable */
        //end sheet

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách điểm danh theo giảng viên - Khóa ' + nextProps.data.gen.name);

    }

    onButtonClick() {
        this.props.excelAction.exportExcel(this.props.params.genId);
    }

    render() {

        return (
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-content">
                                    <h4 className="card-title">
                                        <strong>Xuất file Excel</strong>
                                    </h4>
                                    <br/>
                                    <div className="row">
                                        <div className="col-md-4"/>
                                        <div className="col-md-4">
                                            {
                                                this.props.isLoading ?
                                                    <Loading/>
                                                    :
                                                    <button style={{width: "100%"}} className="btn btn-rose"
                                                            onClick={this.onButtonClick}>Xuất file</button>
                                            }
                                        </div>
                                        <div className="col-md-4"/>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TeachersExcelContainer.propTypes = {
    params: PropTypes.object,
    excelAction: PropTypes.object,
    data: PropTypes.object,
    isLoading: PropTypes.bool,
};

function mapStateToProps(state) {
    return {
        isLoading: state.excel.isLoading,
        data: state.excel.data,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        excelAction: bindActionCreators(excelAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeachersExcelContainer);
