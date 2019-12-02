import React from "react";
import {observer} from "mobx-react";
import SelectTypeFormat from "../component/SelectTypeFormat";
import {isEmpty} from "../../../helpers/entity/mobx";
import {Modal} from "react-bootstrap";

@observer
class FormatData extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            dataNotFormatMatch: [],
            showModalNotFormatMatch: false
        }
    }

    getDataTypes() {
        const typeDataStep = this.props.store.getStep(0);
        const {currentStep} = this.props.store;

        const keyDataTypesSelected = currentStep.data.formatters.filter((formatter) => !isEmpty(formatter.typeData.name))
            .map((formatter) => formatter.typeData.key);

        //find type which selected at choose type data step
        let dataTypes = typeDataStep.data.types.filter((type) => type.selected);

        dataTypes = dataTypes.map((type) => {
            return {
                ...type,
                properties: type.properties.filter((property) => keyDataTypesSelected.indexOf(property.key) < 0)
            };
        });
        return dataTypes;
    }

    showModalNotFormatMatch(index = -1) {
        this.setState({showModalNotFormatMatch: true});
        const {currentStep} = this.props.store;
        let dataNotFormatMatch = [];
        currentStep.data.formatters[index].data.forEach((data, indexData) => {
            if (currentStep.data.formatters[index].indexNotMatch.indexOf(indexData) > 0) {
                dataNotFormatMatch = [...dataNotFormatMatch, {index: indexData, data}];
            }
        });

        this.setState({dataNotFormatMatch: dataNotFormatMatch})


    }

    render() {
        const {currentStep} = this.props.store;
        const dataTypes = this.getDataTypes();
        return (
            <div className="format-file-container">
                {currentStep.data.formatErrors.length > 0 &&
                <div className="format-error">
                    {
                        currentStep.data.formatErrors.map((property) => {
                            return (
                                <div className="item-error">
                                    <div>{property.text_error}</div>
                                </div>
                            )
                        })
                    }
                </div>
                }

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Khớp định dạng</th>
                            <th>Cột dữ liệu</th>
                            <th>Xem trước</th>
                            <th>Tương ứng với</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentStep.data.formatters.map((formatter, index) => {
                            const notFormatMatch = formatter.typeData.name && !formatter.match_format;
                            return (
                                <tr key={index}
                                    style={{backgroundColor: (notFormatMatch ? 'rgba(255,164,89,0.16)' : 'white')}}>
                                    <td style={{minWidth: 100, height: 90}}
                                        className="flex flex-align-items-center flex-justify-content-center"
                                    >
                                        <div className="checkbox-container disable">
                                            <input type="checkbox" checked={formatter.match_format}/>
                                            <span className="checkmark"></span>
                                        </div>
                                    </td>
                                    <td>
                                        {formatter.col_name}
                                    </td>
                                    <td className="text-grey">
                                        {formatter.data.slice(0, 3).map((instance) => {
                                            return (<div>{isEmpty(instance) ? "--" : instance}</div>)
                                        })}
                                        <div style={{color: "#ff4700", cursor: "pointer"}}
                                             onClick={() => this.showModalNotFormatMatch(index)}>
                                            {notFormatMatch ? "Xem lỗi" : ""}
                                        </div>
                                    </td>
                                    <td style={{minWidth: 200}}>
                                        <SelectTypeFormat dataTypes={dataTypes} formatter={formatter}
                                                          placement={(currentStep.data.formatters.length - 1 > index) ? "bottom" : "top"}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>
                <Modal
                    show={this.state.showModalNotFormatMatch}
                    onHide={() => {
                        this.setState({showModalNotFormatMatch: false});
                    }}
                    bsSize="large"
                >
                    <Modal.Body>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Dòng lỗi</th>
                                    <th>Dữ liệu lỗi</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.dataNotFormatMatch.map((data) => {
                                    return (
                                        <tr>
                                            <td>{data.index}</td>
                                            <td>{isEmpty(data.data) ? "\"Không có dữ liệu\"" : data.data}</td>
                                        </tr>
                                    )
                                })}

                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        );
    }
}

export default FormatData;
