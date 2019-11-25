import React from 'react';
import * as env from "../../constants/env";
import axios from "axios";
import {renderToString} from "react-dom/lib/ReactDOMServer";
import Loading from "../../components/common/Loading";
import Attendances from "../infoStudent/progress/Attendances";


class StudyProgressTooltip extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.loaded = false;
        this.state = {
            isLoading: false,
            progress: [],
        };
    }

    componentDidMount() {
    }

    loadProgress = () => {
        if (this.loaded) return;
        this.setState({isLoading: true});
        let studentId = this.props.register.student_id;
        let url = env.MANAGE_API_URL + `/student/${studentId}/progress`;
        let token = localStorage.getItem('token');
        if (token) {
            url += "?token=" + token;
        }
        axios.get(url)
            .then(res => {
                this.loaded = true;
                this.setState({isLoading: false, progress: res.data.data.progress});

                $("#progress-" + this.props.register.id).attr('data-original-title', this.component()).tooltip('show');

            }).catch(() => {
            this.setState({isLoading: false});
        });
    };

    component = () => {
        return renderToString(
            <div>{this.state.progress.map((progressClass, index) => {
                return (
                    <div key={index}>
                        <div className="flex-row-center flex-space-between margintop-10">
                            <img className="circle" style={{width:30}} src={progressClass.icon_url} alt=""/>
                            <div className="margin-left-15">
                                <b>{progressClass.name}</b>
                            </div>
                            <div className="margin-left-15">{progressClass.datestart}</div>
                            <Attendances
                                attendances={progressClass.attendances}
                            />
                        </div>
                        <div className="flex-row-center">

                        </div>
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
                 data-original-title={renderToString(<Loading/>)}
                 data-placement="right"
            >
                {/*<Link to={`/sales/info-student/${this.props.register.student_id}`}*/}
                {/*      className="text-name-student-register">*/}
                {/*    {this.props.register.name}*/}
                {/*</Link>*/}
                <a onClick={()=>this.props.openModalRegisterDetail(this.props.register.student_id)}
                      className="text-name-student-register">
                    {this.props.register.name}
                </a>
            </div>
        );
    }
}

export default StudyProgressTooltip;