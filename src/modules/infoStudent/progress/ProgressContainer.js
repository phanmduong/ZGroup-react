/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import Attendances from './Attendances';
import _ from 'lodash';
import PropTypes from 'prop-types';

class ProgressContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.studentActions.loadProgress(this.props.params.studentId);
    }

    computeCertificate(items) {
        if (items[0] === null) {
            return 0;
        }
        let lessonsAttended = _.filter(items, {status: 1}).length;

        const percent = lessonsAttended * 100 / items.length;
        if (percent > 70) {
            return 1;
        } else {
            const sumAll = items.reduce((sum, i) => {
                return sum + i.status;
            }, 0);
            if (sumAll < 0) {
                return 0;
            } else {
                return -1;
            }
        }
    }

    renderCup(type) {
        switch (type) {
            case 1:
                return (
                    <div className="dot-bottom-right"
                         data-toggle="tooltip" title="" type="button" rel="tooltip"
                         data-placement="right"
                         data-original-title={'Bằng giỏi'}
                         style={{backgroundColor: '#ffc300'}}
                    >
                    </div>
                );
            case -1:
                return (
                    <div className="dot-bottom-right"
                         data-toggle="tooltip" title="" type="button" rel="tooltip"
                         data-placement="right"
                         data-original-title='Không có bằng'
                         style={{backgroundColor: '#909090'}}
                    >
                    </div>
                );
            default:
                return (<div>12</div>);
        }

    }

    render() {
        return (
            <div className="tab-pane active">

                {this.props.isLoadingProgress ? <Loading/>
                    :
                    <ul className="timeline timeline-simple">
                        {
                            this.props.progress.map((progressClass, index) => {
                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            <div className="container-dot-bottom-right">
                                                <img className="circle" src={progressClass.icon_url} alt=""/>
                                                {this.renderCup(this.computeCertificate(progressClass.attendances))}
                                            </div>

                                        </div>
                                        <div className="timeline-panel">
                                            <h4>
                                                <b>{progressClass.name}</b>
                                            </h4>
                                            <div className="timeline-body">
                                                <div className="row">
                                                    <div className="col-md-8 col-sm-9">
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">access_time</i>
                                                            <b>&nbsp; &nbsp; {progressClass.study_time} </b>
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">home</i>&nbsp; &nbsp;
                                                            {progressClass.room + ' - ' + progressClass.base}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">date_range</i>&nbsp; &nbsp; {progressClass.description}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">loop</i>&nbsp; &nbsp; Học lần
                                                            thứ {progressClass.time}
                                                        </div>
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">assignment_turned_in</i>&nbsp; &nbsp;
                                                            Điểm danh
                                                        </div>
                                                        <Attendances
                                                            attendances={progressClass.attendances}
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-sm-3">
                                                        <div className="content-qr-code">
                                                            <img
                                                                className="square-100"
                                                                src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + progressClass.code + "&bgcolor=000000&color=FFFFFF&qzone=2&format=svg"}/>
                                                            <div>{progressClass.code}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                }

            </div>
        );
    }
}

ProgressContainer.propTypes = {
    progress: PropTypes.object.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingProgress: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        progress: state.infoStudent.progress,
        isLoadingProgress: state.infoStudent.isLoadingProgress
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressContainer);
