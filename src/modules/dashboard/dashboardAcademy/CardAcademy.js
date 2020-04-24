import React from 'react';
import {observer} from 'mobx-react';
import CardAcademyStore from "./cardAcademyStore.js";
import Loading from "../../../components/common/Loading";
import filterStore from "./filterStore";
import {DATE_FORMAT_SQL} from "../../../constants/constants";
import {isEmpty, removeObservable} from "../../../helpers/entity/mobx";


@observer
class CardAcademy extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        const filter = {...filterStore.filter};
        filter.start_time = filterStore.filter.start_time.format(DATE_FORMAT_SQL);
        filter.end_time = filterStore.filter.end_time.format(DATE_FORMAT_SQL);
        if (isEmpty(removeObservable(CardAcademyStore.data)))
            CardAcademyStore.analyticsClasses(filter);
    }

    render() {
        const {isLoading, data} = CardAcademyStore;
        return (
            <div className="row gutter-20">
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Số lớp đang học</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{data.studyingClassesCount}</h3>
                                </div>
                            }
                            <div className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Số học viên đang học</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{data.studyingRegistersCount}</h3>
                                </div>
                            }
                            <div className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Số lớp đang tuyển sinh</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{data.enrollingClassesCount}</h3>
                                </div>
                            }
                            <div className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-md-3 col-sm-6">
                    <div className="card margin-bottom-20 margin-top-0">
                        <div className="card-content text-align-left">
                            <p className="category">Số học viên đang tuyển sinh</p>
                            {isLoading ? <Loading style={{marginTop: 0}}/> :
                                <div className="flex flex-row flex-align-items-center">
                                    <h3 className="card-title">{data.enrollingRegistersCount}</h3>
                                </div>
                            }
                            <div className="padding-vertical-20px padding-horizontal-20px white-light-round btn-grey width-100 text-center font-weight-400 cursor-pointer">
                                Xem chi tiết
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default CardAcademy;
