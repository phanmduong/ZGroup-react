import React from "react";
import {observer} from "mobx-react";
import moment from "moment";
import FormInputDate from "../../components/common/FormInputDate";
import {loadGapi} from "./GapiClass";
import {DATE_FORMAT_SQL} from "../../constants/constants";

@observer
class AnalyticsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.data = props.data;
        let now = moment();
        this.state = {
            filter: {
                'start-date': moment(now).subtract(14, 'day').day(0).format(DATE_FORMAT_SQL),
                'end-date': moment(now).subtract(1, 'day').day(0).format(DATE_FORMAT_SQL)
            },
        };
        this.inited = false;
    }

    componentDidMount() {
        // initGapi();
        // authGapi();
        let now = moment();
        loadGapi(this.data, {
            'start-date': moment(now).subtract(14, 'day').day(0).format(DATE_FORMAT_SQL),
            'end-date': moment(now).format(DATE_FORMAT_SQL)
        });
        this.inited = true;
    }


    onChangeDate = (e, name) => {
        let newState = {...this.state};
        newState.filter[name] = e.target.value;
        if (this.inited) {
            this.setState(newState);
            loadGapi(this.data, newState.filter);
        }

    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row col-md-12 margin-bottom-20" id={"embed-api-auth-container"} />

                <div className="flex col-md-12" id={"view-selector-container"} />
                <div className="row">
                    <div className="col-md-4">
                        <FormInputDate value={this.state.filter['start-date']}
                                       label={"From"}
                                       format={DATE_FORMAT_SQL}
                                       name={'start-date'}
                                       id={'start-date'}
                                       updateFormData={(e) => this.onChangeDate(e, 'start-date')}
                        /></div>
                    <div className="col-md-4">
                        <FormInputDate value={this.state.filter['end-date']}
                                       label={"To"}
                                       format={DATE_FORMAT_SQL}
                                       name={'end-date'}
                                       id={'end-date'}
                                       updateFormData={e => this.onChangeDate(e, 'end-date')}
                        /></div>


                </div>
                <div className="">
                    <div className="row">
                        {this.data.map((obj, index) => {
                            console.log(obj);
                            let clsName = "margin-bottom-20";
                            clsName += obj.col ? (" col-md-" + obj.col) : " col-md-6";
                            return (
                                <div key={index} className={clsName}>
                                    <div>{obj.name ? obj.name : ""}</div>
                                    <div id={"chart-" + obj.id + "-container"} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

        );
    }
}

AnalyticsComponent.propTypes = {};

export default AnalyticsComponent;
