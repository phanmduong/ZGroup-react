/**
 * Created by phanmduong on 11/9/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as helper from '../../../helpers/helper';
import Loading from '../../../components/common/Loading';
import * as importGoodActions from '../importGoodActions';
import PropTypes from 'prop-types';
import _ from 'lodash';

class AddGoodFile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleFile = this.handleFile.bind(this);
        this.state = {
            goods: []
        }
    }

    handleFile(event) {
        this.props.importGoodActions.beginCheckGoods();
        this.setState({
            fileName: event.target.files[0].name
        })
        let goods = [];
        helper.readExcel(event.target.files[0], true).then((data) => {
            data.map((row) => {
                goods.push({
                    code: row[0],
                    name: row[1],
                    quantity: row[2],
                    import_price: row[3],
                });
            });
            this.setState({goods: goods});
            this.props.importGoodActions.checkGoods(_.map(goods, 'code'));
        });

    }

    render() {
        let goods = [];
        if (!this.props.isCheckingGoods && this.props.existsGoods && this.props.existsGoods.length > 0 && this.state.goods.length > 0) {
            goods = this.props.existsGoods.map((good) => {
                let goodDataFile = this.state.goods.filter((data) =>
                    data.code.trim().toLowerCase() == good.code.trim().toLowerCase())[0];
                return {
                    ...goodDataFile,
                    ...good
                }
            });
        }


        return (
            <div>
                <p className="text-muted">
                    Bạn có thể tải file mẫu <a href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/example_import_good.xlsx">tại
                    đây</a>
                </p>
                <div className="row">
                    <div className="col-sm-3 col-xs-5">
                        <button
                            className="btn btn-rose"
                        >
                            Chọn file
                            <input type="file"
                                   accept=".csv,.xls,.xlsx"
                                   onChange={this.handleFile}
                                   style={{
                                       cursor: 'pointer',
                                       opacity: "0.0",
                                       position: "absolute",
                                       top: 0,
                                       left: 0,
                                       bottom: 0,
                                       right: 0,
                                       width: "100%",
                                       height: "100%"
                                   }}
                            />
                        </button>
                    </div>
                    <div className="col-sm-9 col-xs-7" style={{height: "61px"}}>
                        {
                            this.state.fileName &&
                            <div className="flex-row-center full-height">
                                <p className="none-margin">
                                    {this.state.fileName}
                                </p>
                            </div>
                        }
                    </div>

                </div>

                {this.props.isCheckingGoods && <Loading/>}
                {!this.props.isCheckingGoods && goods.length > 0 &&
                <div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Số lượng</th>
                                <th>Giá vốn</th>
                                <th>Thành giá</th>
                                <th>Giá bán</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                goods.map((good, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{good.code}</td>
                                            <td>{good.name}</td>
                                            <td>{good.quantity}</td>
                                            <td>{helper.dotNumber(good.import_price)}đ</td>
                                            <td>{helper.dotNumber(good.import_price * good.quantity)}đ</td>
                                            <td>{helper.dotNumber(good.price)}đ</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
                }

                <div className="row">
                    <div className="col-md-12">
                        <button className="btn btn-success" onClick={this.storeGood}>
                            <i className="material-icons">save</i> Thêm
                        </button>
                        <button className="btn btn-danger" onClick={this.props.closeModal}>
                            <i className="material-icons">cancel</i> Huỷ
                        </button>
                    </div>
                </div>
            </div>

        );
    }
}


AddGoodFile.propTypes = {
    importGoodActions: PropTypes.object.isRequired,
    isCheckingGoods: PropTypes.bool.isRequired,
    existsGoods: PropTypes.array.isRequired,
    notExistsGoods: PropTypes.array.isRequired,
    closeModal: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        isCheckingGoods: state.importGoods.addGoodFile.isCheckingGoods,
        existsGoods: state.importGoods.addGoodFile.existsGoods,
        notExistsGoods: state.importGoods.addGoodFile.notExistsGoods,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importGoodActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoodFile);
