/**
 * Created by phanmduong on 10/26/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Search from '../../components/common/Search';
import FormInputDate from '../../components/common/FormInputDate';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import ListImported from './ListImported';
import * as importGoodActions from './importGoodActions';
import Loading from "../../components/common/Loading";
import {Link} from 'react-router';

class ImportGoodsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            time: {
                startTime: '',
                endTime: ''
            }
        };

        this.updateFormDate = this.updateFormDate.bind(this);
        this.setTable = this.setTable.bind(this);
        this.table = null;
    }

    componentWillMount() {
        this.props.importGoodActions.loadImportOrders();
    }

    updateFormDate(event) {
        const field = event.target.name;
        let time = {...this.state.time};
        time[field] = event.target.value;

        if (!helper.isEmptyInput(time.startTime) && !helper.isEmptyInput(time.endTime)) {
            this.props.importGoodActions.loadImportOrders(time.startTime, time.endTime);
            this.setState({time: time, page: 1});
        } else {
            this.setState({time: time});
        }
    }

    setTable(table) {
        this.table = table;
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Link
                            className="btn btn-rose"
                            to="import-good/create"
                        >
                            Tạo phiếu nhập
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header card-header-icon" data-background-color="rose"><i
                                className="material-icons">assignment</i>
                            </div>
                            <div className="card-content">
                                <h4 className="card-title">Danh sách phiếu nhập</h4>
                                <div className="row">
                                    <Search
                                        onChange={(value)=>{this.table ? this.table.search(value).draw() : null;}}
                                        placeholder="Nhập mã đơn hoặc mã/họ tên/SĐT NCC"
                                        className="col-md-12"
                                    />
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Từ ngày"
                                            name="startTime"
                                            updateFormData={this.updateFormDate}
                                            id="form-start-time"
                                            value={this.state.time.startTime}
                                            maxDate={this.state.time.endTime}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <FormInputDate
                                            label="Đến ngày"
                                            name="endTime"
                                            updateFormData={this.updateFormDate}
                                            id="form-end-time"
                                            value={this.state.time.endTime}
                                            minDate={this.state.time.startTime}

                                        />
                                    </div>
                                </div>
                                <br/>

                                {this.props.isLoading ? <Loading/> :
                                    <ListImported
                                        setTable={this.setTable}
                                        importOrders={this.props.importOrders}
                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ImportGoodsContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    importOrders: PropTypes.array.isRequired,
    importGoodActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.importGoods.isLoading,
        importOrders: state.importGoods.importOrders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportGoodsContainer);
