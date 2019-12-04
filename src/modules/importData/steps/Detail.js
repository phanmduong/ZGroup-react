import React from "react";
import {observer} from "mobx-react";
import {isEmpty} from "../../../helpers/entity/mobx";
import _ from 'lodash';
import SelectWordDetail from "../component/SelectWordDetail";

@observer
class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {

        let checkProperties = [];
        const typeDataStep = this.props.store.getStep(0);
        const formatDataStep = this.props.store.getStep(2);
        const {currentStep, dataCheck} = this.props.store;

        const keyDataTypesSelected = formatDataStep.data.formatters.filter((formatter) => !isEmpty(formatter.typeData.name))
            .map((formatter) => formatter.typeData.key);

        //find type which selected at choose type data step
        let dataTypes = typeDataStep.data.types.filter((type) => type.selected);

        dataTypes.forEach((type) => {
            const propertiesRequire = type.properties.filter((property) =>
                (keyDataTypesSelected.indexOf(property.key) > 0) && property.check_new);

            checkProperties = [...checkProperties, ...propertiesRequire];
        });

        currentStep.data.checkProperties = checkProperties;

        currentStep.data.checkProperties = currentStep.data.checkProperties.map((property) => {

            const typeData = formatDataStep.data.formatters.filter((formatter) => property.key == formatter.typeData.key)[0];

            const unionData = _.union(typeData.data);

            const distinctData = unionData.filter((data) => dataCheck[property.check_key_data].indexOf(data) < 0);
            const words = distinctData.map((data) => {
                return {
                    raw: data,
                    replace_by: "",
                    total: typeData.data.filter((item) => item == data).length
                };
            });
            return {
                ...property,
                check_words: words,
                union_words: unionData
            };
        });

    }

    render() {
        const {currentStep, dataCheck} = this.props.store;
        return (
            <div className="detail-data-container">
                {
                    currentStep.data.checkProperties.length > 0 ?
                        currentStep.data.checkProperties.map((checkProperty, index) => {
                            return (
                                <div className="check-property-item" key={index}>
                                    <div className="check-property-header">
                                        <div className="property-title">
                                            {checkProperty.name}
                                        </div>
                                        <div className="property-description">
                                            {checkProperty.check_description(checkProperty.union_words.length, checkProperty.check_words.length)}
                                        </div>
                                    </div>

                                    <div>
                                        {checkProperty.check_words.map((word, index2) => {
                                            return (
                                                <div className="row item-word" key={index2}>
                                                    <div className="col-md-3 col-sm-4 col-xs-6 none-padding-horizontal">
                                                        <div className="flex flex-col">
                                                            <div className="word">
                                                                {word.raw}
                                                            </div>
                                                            <div className="total-word">
                                                                {word.total} trường hợp
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 col-sm-4 col-xs-6">
                                                        <SelectWordDetail word={word}
                                                                          wordsReplace={dataCheck[checkProperty.check_key_data]}/>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            );
                        })
                        :
                        <div className="noti-available">
                            Dữ liệu của bạn khả dụng để import
                        </div>
                }
            </div>

        );
    }
}

export default Detail;
