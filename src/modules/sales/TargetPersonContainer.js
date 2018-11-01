import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import {numberWithCommas} from "../../helpers/helper";
import {observer} from "mobx-react";
import {store} from "./TargetPersonStore";

@observer
class TargetPersonContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        if (this.props.params.userId) {
            store.loadPersonTargetSale(this.props.params.userId);
        } else {
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(user.id);
            store.loadPersonTargetSale(user.id);
        }

    }


    render() {
        return (

            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-content">
                            {
                                store.isLoading ? <Loading/> : (
                                    <table className="table" style={{width: "100%"}}>
                                        <thead>
                                        <tr className="text-rose">
                                            <th className="text-center">Khóa</th>
                                            <th className="text-center">Doanh số / chỉ tiêu</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            store.targetSales.map(({target, achieve, gen_name}) => (
                                                <tr key={gen_name}>
                                                    <td>Khóa {gen_name}</td>
                                                    <td>
                                                        <div>
                                                            {numberWithCommas(achieve / 1000)}k
                                                            / {numberWithCommas(target / 1000)}k
                                                            {
                                                                target !== 0 &&
                                                                <span> ({(achieve * 100 / target).toFixed(2) + "%"})</span>
                                                            }

                                                        </div>
                                                        <div className="progress progress-line-primary">
                                                            <div className="progress-bar progress-bar-rose"
                                                                 role="progressbar"
                                                                 aria-valuenow="60" aria-valuemin="0"
                                                                 aria-valuemax="100"
                                                                 style={{width: achieve * 100 / target + "%"}}>
                                                                <span className="sr-only">60% Complete</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

TargetPersonContainer.propTypes = {
    params: PropTypes.object.isRequired,

};


export default TargetPersonContainer;
