import React from "react";
import {observer} from "mobx-react";

import {getShortName, validateLinkImage} from "../../../helpers/helper";
import Star from "../../../components/common/Star";


@observer
class RatingDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {

    }


    renderAttendance() {
        const {data} = this.props;
        const raitoRate = Math.round(data.rate_sum / (data.rate_total));

        return (
            <div>

                <div className="panel-group" id="accordion"
                     role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab"
                             id={"heading_"}>
                            <div className="flex flex flex-space-between" style={{marginTop: 10}}>
                                <div className="bold" style={{color: 'black'}}>Tổng thể</div>
                                {/*<div className="bold" style={{color: 'black'}}>*/}
                                    {/*{`${Math.round(raitoRate)}/5`}*/}
                                {/*</div>*/}
                            </div>

                            <div className="card-footer flex flex-space-between">

                                {data.rate_total != 0 ?
                                    `Độ hài lòng: ${raitoRate}/5`
                                    :
                                    "Chưa có lượt đánh giá"
                                }
                                {data.rate_total != 0 && <Star maxStar={5} value={raitoRate} disable={true}/>}
                            </div>

                        </div>

                        <div className="panel-body" style={{paddingLeft: 30}}>
                            {
                                data.registers.filter((obj)=>{return obj.rating_teacher > 0 || obj.rating_ta > 0;}).map((obj, index) => {

                                    return (
                                        <div key={index}>
                                        <div  style={{margin: "20px 0px", display:"-webkit-box"}}>
                                            <div className="img"
                                                 style={{
                                                     background: 'url(' + validateLinkImage(obj.user.avatar_url) + ') center center / cover',
                                                     width: '40px',
                                                     height: '40px',
                                                     borderRadius: '50%',
                                                 }}
                                            />
                                            <div className="flex flex-space-between"
                                                 style={{marginTop: 10, marginLeft: 5, width: "100%"}}>

                                                    <div className="bold">
                                                        {obj.user.name}
                                                    </div>

                                            </div>

                                        </div>
                                            <hr/>
                                            <div className="flex flex-space-between" style={{margin: "20px 0px", marginLeft:50}}>
                                                <div>
                                                    Giảng viên
                                                </div>
                                                <div className="flex flex-space-between"
                                                     style={{marginTop: 10, marginLeft: 5}}>

                                                    <div className="flex flex-space-between">
                                                        {(obj.rating_teacher > 0) &&
                                                        <Star maxStar={5} value={obj.rating_teacher} disable={true}/>}
                                                        {(obj.rating_teacher > 0) ?
                                                            `${obj.rating_teacher}/5`
                                                            :
                                                            "Chưa đánh giá"
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="flex flex-space-between" style={{margin: "20px 0px", marginLeft:50}}>
                                                <div>
                                                    Trợ giảng
                                                </div>
                                                <div className="flex flex-space-between"
                                                     style={{marginTop: 10, marginLeft: 5}}>

                                                    <div className="flex flex-space-between">
                                                        {obj.rating_ta > 0 &&
                                                        <Star maxStar={5} value={obj.rating_ta} disable={true}/>}
                                                        {obj.rating_ta > 0 ?
                                                            `${obj.rating_ta}/5`
                                                            :
                                                            "Chưa đánh giá"
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                            <hr/>
                                        </div>
                                    );
                                })
                            }

                        </div>

                    </div>
                </div>

            </div>

        );
    }

    render() {
        const {data} = this.props;
        return (
            <div>

                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(data.course.icon_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {data.name}
                        </div>
                        <div>Đánh giá của từng học viên</div>
                        <p className="description">
                            {data.teacher &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher.color}}
                            >
                                {getShortName(data.teacher.name)}
                            </button>}
                            {data.teacher_assistant &&
                            <button className="btn btn-xs btn-round"
                                    style={{backgroundColor: "#" + data.teacher_assistant.color}}
                            >
                                {getShortName(data.teacher_assistant.name)}
                            </button>}
                        </p>
                        <br/>
                    </div>

                    <div>
                        {this.renderAttendance()}
                    </div>


                </div>
            </div>

        );
    }
}

RatingDetailContainer.propTypes = {};

export default RatingDetailContainer;
