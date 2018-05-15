import React from 'react';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import Select from 'react-select';

class HistoryTab extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            warehouse_id: null
        };
        this.loadMore = this.loadMore.bind(this);
        this.warehousesSearchChange = this.warehousesSearchChange.bind(this);
    }

    warehousesSearchChange(value) {
        if (value) {
            this.setState({
                warehouse_id: value.value,
                page: 1
            });
            this.props.getHistoryInventories(
                this.props.productWarehouse,
                1,
                value.value,
                false
            );
        } else {
            this.setState({
                warehouse_id: null,
                page: 1
            });
            this.props.getHistoryInventories(
                this.props.productWarehouse,
                1,
                null,
                false
            );
        }
    }

    loadMore(page) {
        this.setState({
            page: page
        });
        this.props.getHistoryInventories(
            this.props.productWarehouse,
            page,
            this.state.warehouse_id,
            true
        );
    }

    render() {
        return (
            <div>
                {
                    this.props.histories.length === 0 && !this.state.warehouse_id ? (
                        <div style={{
                            textAlign: "center",
                            margin: "10px"
                        }}>
                            <h4 className="panel-title"><b>Không có lịch sử xuất nhập</b></h4>
                        </div>
                    ) : (
                        <div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label className="label-control">Tìm theo kho hàng</label>
                                    <Select
                                        name="warehouses"
                                        value={this.state.warehouse_id}
                                        options={this.props.warehousesList.map((warehouse) => {
                                            return {
                                                ...warehouse,
                                                value: warehouse.id,
                                                label: warehouse.name
                                            };
                                        })}
                                        onChange={this.warehousesSearchChange}
                                    />
                                </div>
                            </div>
                            <div className="table-responsive">
                                {
                                    this.props.isLoadingHistoryList ? (
                                        <Loading/>
                                    ) : (
                                        <table className="table table-hover">
                                            <thead>
                                            <tr className="text-rose">
                                                <th>STT</th>
                                                <th>Chứng từ</th>
                                                <th>Ngày</th>
                                                <th>Diễn giải</th>
                                                <th>Nhập</th>
                                                <th>Xuất</th>
                                                <th>Tồn</th>
                                                <th>Kho</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.props.histories.map((history, id) => {
                                                    return (
                                                        <tr key={id}>
                                                            <td>{id + 1}</td>
                                                            <td>{history.code}</td>
                                                            <td>{history.created_at}</td>
                                                            <td>{history.note}</td>
                                                            <td>{history.import_quantity}</td>
                                                            <td>{history.export_quantity}</td>
                                                            <td>{history.remain}</td>
                                                            <td>{history.warehouse.name}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    )
                                }
                            </div>
                            {
                                this.props.currentPage === this.props.totalPages ? (
                                    <div/>
                                ) : (
                                    <div style={{textAlign: "center"}}>
                                        {
                                            this.props.isLoadingMore ? <Loading/> :
                                                <button className="btn btn-simple"
                                                        onClick={() => this.loadMore(this.state.page + 1)}>
                                                    <i className="material-icons">cached</i>
                                                    Tải thêm
                                                </button>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        );
    }
}

HistoryTab.propTypes = {
    histories: PropTypes.array.isRequired,
    inventoryInfo: PropTypes.object.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    getHistoryInventories: PropTypes.func.isRequired,
    inventory: PropTypes.object.isRequired,
    warehousesList: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    isLoadingHistoryList: PropTypes.bool.isRequired,
    productWarehouse: PropTypes.object.isRequired
};

export default HistoryTab;