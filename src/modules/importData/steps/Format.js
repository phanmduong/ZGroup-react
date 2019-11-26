import React from "react";
import {observer} from "mobx-react";

@observer
class FormatData extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.setData();
    }


    setData() {
        const uploadStep = this.props.store.getStep(1);
        const {currentStep} = this.props.store;
        console.log("")
        const rowData = uploadStep.data.data_file[0];
        if (rowData) {
            const cols = Object.keys(rowData);
            const data = cols.map((col) => {
                const instances = uploadStep.data.data_file.slice(0, 3).map((item) => item[col]);
                return {
                    match_format: true,
                    col_name: col,
                    instances
                }
            });

            currentStep.data.formatters = data;
        }
        return null;
    }

    render() {
        const {currentStep} = this.props.store;
        return (
            <div className="format-file-container">
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
                        {currentStep.data.formatters.map((formatter) => {
                            return (
                                <tr>
                                    <td style={{minWidth: 100, height: 90}}
                                        className="flex flex-align-items-center flex-justify-content-center"
                                    >
                                        <div className="checkbox-container">
                                            <input type="checkbox" checked={true}/>
                                            <span className="checkmark"></span>
                                        </div>
                                    </td>
                                    <td>
                                        {formatter.col_name}
                                    </td>
                                    <td className="text-grey">
                                        {formatter.instances.map((instance) => {
                                            return (<div>{instance}</div>)
                                        })}
                                    </td>
                                    <td style={{minWidth: 200}}>
                                        <div style={{backgroundColor: '#eeeeee', height: 40, borderRadius: 5}}>

                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default FormatData;
