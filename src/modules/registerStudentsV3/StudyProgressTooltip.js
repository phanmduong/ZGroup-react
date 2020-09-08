import React from 'react';
import * as env from "../../constants/env";
import axios from "axios";
import {renderToString} from "react-dom/lib/ReactDOMServer";
import Loading from "../../components/common/Loading";
import Attendances from "../infoStudent/progress/Attendances";
import TooltipButton from "../../components/common/TooltipButton";


class StudyProgressTooltip extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.loaded = false;
        this.mouseOver = false;
        this.state = {
            isLoading: false,
            progress: [],
        };
    }

    componentDidMount() {
        $('[data-toggle="tooltip"]').tooltip();

    }

    loadProgress = () => {
        if (this.loaded) return;
        this.mouseOver = true;
        this.setState({isLoading: true});
        let studentId = this.props.register.student.id;
        let url = env.MANAGE_API_URL + `/student/${studentId}/progress`;
        let token = localStorage.getItem('token');
        if (token) {
            url += "?token=" + token;
        }
        axios.get(url)
            .then(res => {
                this.loaded = true;
                this.setState({isLoading: false, progress: res.data.data.progress});
                $("#progress-" + this.props.register.id).attr('data-original-title', this.component());
                if(this.mouseOver)
                    $("#progress-" + this.props.register.id).tooltip('show');

            }).catch(() => {
            this.setState({isLoading: false});
        });
    };

    onMouseLeave = ()=>{
        this.mouseOver = false;
    }

    component = () => {
        return renderToString(
            <div>{this.state.progress.map((progressClass, index) => {
                return (
                    <div key={index}>
                        <div className="flex-row-center flex-space-between margin-top-10">
                            <img className="circle" style={{width:30}} src={progressClass.icon_url} alt=""/>
                            <div className="margin-left-15">
                                <b>{progressClass.name}</b>
                            </div>
                            <div className="margin-left-15">{progressClass.datestart}</div>
                            <Attendances
                                attendances={progressClass.attendances}
                            />
                        </div>
                        <div className="flex-row-center" />
                    </div>
                );
            })}
                {this.state.progress.length == 0 && <div>Chưa có dữ liệu</div>}
            </div>
        );
    };

    render() {
        return (
            <div id={"progress-" + this.props.register.id} data-html="true"
                 data-toggle="tooltip" type="button" rel="tooltip" title=""
                 onMouseEnter={this.loadProgress}
                 onMouseLeave={this.onMouseLeave}
                 data-original-title={renderToString(<Loading/>)}
                 data-placement="right"
            >
                {/*<Link to={`/sales/info-student/${this.props.register.student_id}`}*/}
                {/*      className="text-name-student-register">*/}
                {/*    {this.props.register.name}*/}
                {/*</Link>*/}
                <a onClick={()=>this.props.openModalRegisterDetail(`/sales/info-student/${this.props.register.student.id}`)}
                      className="text-name-student-register">
                    {this.props.register.student.name}
                    {this.props.register.is_retention_course == 0 &&
                    <TooltipButton text="Đây là đăng kí đầu tiên của học viên này"
                                   placement="top">
                                                                    <span className="btn-danger btn-xs margin-left-5"
                                                                          style={{
                                                                              fontSize: 10,
                                                                              padding: '3px'
                                                                          }}>NEW</span>
                    </TooltipButton>}
                </a>
            </div>
        );
    }
}

export default StudyProgressTooltip;