import React                        from 'react';
import {connect}                    from 'react-redux';
import {bindActionCreators}         from 'redux';
import * as    attendanceActions    from '../attendance/attendanceActions';
import ListClassComponent           from './ListClassComponent';
import Search                       from '../../components/common/Search';
import _                            from 'lodash';
import ListLessonModal              from './ListLessonModal';
import LessonDetailModal            from './LessonDetailModal';
import PropTypes                    from 'prop-types';
import Select                       from '../../components/common/Select';
import Loading                      from "../../components/common/Loading";

class AttendanceContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query : "",
            page  :  1,
            showModalLesson: false,
            showModalDetailLesson: false,
            selectedLessonId: 1,
            selectedClass: {
                id : 0,
                course:{
                    icon_url: "",
                },
            },
            gens:[
                {
                    key: 0,
                    value: 'Tất cả0'
                },{
                    key: 1,
                    value: 'Tất cả1'
                },{
                    key: 2,
                    value: 'Tất cả2'
                },
            ],
            bases:[
                {
                    key: 0,
                    value: 'Tất cả0'
                },{
                    key: 1,
                    value: 'Tất cả1'
                },{
                    key: 2,
                    value: 'Tất cả2'
                },
            ],
            selectBaseId: 0,
            selectGenId: 0,
        };


        this.classesSearchChange        = this.classesSearchChange.bind(this);
        this.loadClasses                = this.loadClasses.bind(this);
        this.closeModalLesson           = this.closeModalLesson.bind(this);
        this.openModalLesson            = this.openModalLesson.bind(this);
        this.openModalDetailLesson      = this.openModalDetailLesson.bind(this);
        this.closeModalDetailLesson     = this.closeModalDetailLesson.bind(this);
        this.takeAttendance             = this.takeAttendance.bind(this);
        this.getBases                   = this.getBases.bind(this);
        this.getGens                    = this.getGens.bind(this);
        this.onChangeBase               = this.onChangeBase.bind(this);
        this.onChangeGen                = this.onChangeGen.bind(this);
    }

    componentWillMount(){
        this.props.attendanceActions.loadGensData();
        this.props.attendanceActions.loadBasesData();
        this.props.attendanceActions.loadClasses();
    }

    componentWillReceiveProps(nextProps){
        console.log('AttendanceContainer',nextProps);
        console.log('state',this.state);
        if(nextProps.isLoadingGens !== this.props.isLoadingGens && !nextProps.isLoadingGens) {
            this.setState({
                gens: this.getGens(nextProps.gens),
                selectGenId: nextProps.currentGen.id
            });
            this.loadClasses(1,'','',this.state.selectBaseId,nextProps.currentGen.id);
        }
        if (nextProps.isLoadingBases !== this.props.isLoadingBases && !nextProps.isLoadingBases) {
            this.setState({
                bases: this.getBases(nextProps.bases),
            });
            this.loadClasses(1,'','','',this.state.selectGenId);
        }
    }

    loadClasses(page = 1, query = '', teacherid, baseid, genid) {
        this.setState({page});
        console.log( page,  this.state.selectBaseId , this.state.selectGenId);
        console.log( page,  baseid , genid);
        this.props.attendanceActions.loadClasses(query, page, teacherid, baseid == 0 ? '' : baseid , genid);
    }

    classesSearchChange(value) {
        this.setState({
            page: 1,
            query: value,
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.loadClasses(1, value, '', this.state.selectBaseId, this.state.selectGenId);
        }.bind(this), 500);
    }

    openModalLesson(index){
        this.setState({
            showModalLesson: true,
            selectedClass:  this.props.data.classes[index]});
        this.props.attendanceActions.loadClassLessonModal(this.props.data.classes[index].id);
    }

    closeModalLesson(){
        this.setState({showModalLesson: false});
    }

    openModalDetailLesson(id){
        this.setState({
            showModalDetailLesson: true,
            selectedLessonId: id
        });
        this.props.attendanceActions.loadLessonDetailModal(this.state.selectedClass.id,id);
    }

    closeModalDetailLesson(){
        this.setState({showModalDetailLesson: false});
        this.props.attendanceActions.loadClassLessonModal(this.state.selectedClass.id);
    }

    takeAttendance(classid, lessonid, studentid, index){

        if(!this.props.isTakingAttendance) {
            //console.log(classid, lessonid, studentid, index);
            this.props.attendanceActions.takeAttendance(classid, lessonid, studentid, index);
        }
    }

    getGens(gens) {
        return gens.map(function (gen) {
            return {
                key: gen.id,
                value: 'Khóa ' + gen.name
            };
        });
    }

    getBases(bases) {
        let baseData = bases.map(function (base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        return [{
            key: 0,
            value: 'Tất cả'
        }, ...baseData];
    }

    onChangeBase(value) {
        this.setState({selectBaseId: value});
        //this.loadDashboard(this.state.selectBaseId, value);
        this.loadClasses(1,'','', value, this.state.selectGenId);
    }

    onChangeGen(value) {
        this.setState({selectGenId: value});
        //this.loadDashboard(value, this.state.selectGenId);
        this.loadClasses(1,'','', this.state.selectBaseId, value);
    }

    render(){
        return(

            <div className="row">
                <div className="col-md-12">
                    {this.props.isLoadingBases || this.props.isLoadingGens
                        ?
                        <Loading/>
                        :
                        <div>
                            <div className="col-sm-6 col-xs-5"></div>
                            <div className="col-sm-3 col-xs-5">
                                <Select
                                defaultMessage={'Chọn cơ sở'}
                                options={this.state.bases}
                                disableRound
                                value={this.state.selectBaseId}
                                onChange={this.onChangeBase}
                                /></div>
                            <div className="col-sm-3 col-xs-5">
                                <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.state.gens}
                                disableRound
                                value={this.state.selectGenId}
                                onChange={this.onChangeGen}
                            /></div>
                        </div>
                    }
                    <div className="card">
                        <div className="card-header card-header-icon" data-background-color="rose">
                            <i className="material-icons">assignment</i>
                        </div>
                        <div className="card-content">
                            <h4 className="card-title">Danh sách lớp</h4>
                            <Search
                                onChange={this.classesSearchChange}
                                value={this.state.query}
                                placeholder="Tìm kiếm lớp"
                            />
                            {this.props.isLoading ?
                                <Loading/>
                                :
                                <ListClassComponent
                                    classes={this.props.data.classes}
                                    isLoading={this.props.isLoading}
                                    searchByTeacher={this.loadClasses}
                                    openModalLesson={this.openModalLesson}
                                />
                            }
                            <ul className="pagination pagination-primary">
                                { _.range(1, (this.props.data.paginator? this.props.data.paginator.total_pages :0) + 1).map(page => {
                                    if (Number(this.state.page) === page) {
                                        return (
                                            <li key={page} className="active">
                                                <a onClick={() => this.loadClasses(page, this.state.query,'', this.state.selectBaseId, this.state.selectGenId)}>
                                                    {page}
                                                </a>
                                            </li>
                                        );
                                    } else {
                                        return (
                                            <li key={page}>
                                                <a onClick={() => this.loadClasses(page, this.state.query,'', this.state.selectBaseId, this.state.selectGenId)}>
                                                    {page}
                                                </a>
                                            </li>
                                        );
                                    }

                                })}
                            </ul>

                        </div>
                    </div>
                    <ListLessonModal
                        lessondata={this.props.class ? this.props.class : []}
                        show={this.state.showModalLesson}
                        onHide={this.closeModalLesson}
                        class={this.state.selectedClass}
                        openModalDetailLesson={this.openModalDetailLesson}
                        isLoadingLessonClassModal={this.props.isLoadingLessonClassModal}
                    />
                    <LessonDetailModal
                        show={this.state.showModalDetailLesson}
                        onHide={this.closeModalDetailLesson}
                        class={this.state.selectedClass}
                        list={this.props.lesson}
                        takeAttendance={this.takeAttendance}
                        selectedLessonId={this.state.selectedLessonId}
                        isLoadingLessonDetailModal={this.props.isLoadingLessonDetailModal}
                    />
                </div>

            </div>


        );
    }

}
/**/

AttendanceContainer.propTypes = {
    isLoading: PropTypes.bool,
    isLoadingGens: PropTypes.bool,
    isLoadingBases: PropTypes.bool,
    isTakingAttendance: PropTypes.bool,
    isLoadingLessonClassModal: PropTypes.bool,
    isLoadingLessonDetailModal: PropTypes.bool,
    data: PropTypes.object,
    currentGen: PropTypes.object,
    class: PropTypes.array,
    lesson: PropTypes.array,
    gens: PropTypes.array,
    bases: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading:                      state.attendance.isLoading,
        isLoadingGens:                  state.attendance.isLoadingGens,
        isLoadingBases:                 state.attendance.isLoadingBases,
        isTakingAttendance:             state.attendance.isTakingAttendance,
        isLoadingLessonClassModal:      state.attendance.isLoadingLessonClassModal,
        isLoadingLessonDetailModal:     state.attendance.isLoadingLessonDetailModal,
        data:                           state.attendance.data,
        currentGen:                     state.attendance.currentGen,
        class:                          state.attendance.class,
        lesson:                         state.attendance.lesson,
        gens:                           state.attendance.gens,
        bases:                          state.attendance.bases,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        attendanceActions: bindActionCreators(attendanceActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceContainer);
