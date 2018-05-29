/**
 * Created by phanmduong on 11/9/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as helper from '../../../helpers/helper';
import Loading from '../../../components/common/Loading';
import TooltipButton from '../../../components/common/TooltipButton';
import * as importGoodActions from '../importGoodActions';
import PropTypes from 'prop-types';
import _ from 'lodash';

class AddGoodFile extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            goods: []
        };
        this.handleFile = this.handleFile.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.storeGood = this.storeGood.bind(this);
        this.notExistsGoods = [];
        this.goods = [];
    }

    handleFile(event) {
        let goods = [];
        let fileCorrect = true;
        let filename = event.target.files[0].name;
        helper.readExcel(event.target.files[0], true).then((data) => {
            data.map((row) => {
                if (helper.isEmptyInput(row[0]) || helper.isEmptyInput(row[1]) || helper.isEmptyInput(row[2]) || helper.isEmptyInput(row[3])
                    || helper.isEmptyInput(row[4])) {
                    fileCorrect = false;
                }
            });
            if (fileCorrect) {
                this.props.importGoodActions.beginCheckGoods();
                this.setState({
                    fileName: filename
                });
                data.map((row) => {
                    goods.push({
                        code: row[0].trim(),
                        name: row[1].trim(),
                        barcode: row[2].trim(),
                        quantity: row[3].trim(),
                        import_price: row[4].trim(),
                        price: row[5] ? row[5].trim() : undefined,
                    });
                });
                this.setState({goods: goods});
                this.props.importGoodActions.checkGoods(_.map(goods, (good) => {
                    return {code: good.code, barcode: good.barcode};
                }));
            } else {
                helper.showErrorMessage("Kiểm tra lại file");
            }
        }).catch(()=>{
            helper.showErrorMessage("Kiểm tra lại file");
        });

    }

    refreshData() {
        this.props.importGoodActions.beginCheckGoods();
        this.props.importGoodActions.checkGoods(_.map(this.state.goods, 'code'));
    }

    storeGood() {
        if (this.notExistsGoods.length > 0) {
            helper.confirm('warning', "Sản phẩm chưa tồn tại", "Sản phẩm chưa tồn tại hệ thống sẽ tự động tạo. Bạn có muốn tiếp tục ?",
                () => {
                    this.props.storeGoods([...this.goods, ...this.notExistsGoods]);
                }
            );
        } else {
            this.props.storeGoods(this.goods);
        }
    }

    render() {
        this.goods = [];
        this.notExistsGoods = [];
        if (!this.props.isCheckingGoods && this.props.existsGoods && this.props.existsGoods.length > 0 && this.state.goods.length > 0) {
            this.goods = this.props.existsGoods.map((good) => {
                let goodDataFile = this.state.goods.filter((data) =>
                    data.code.trim().toLowerCase() == good.code.trim().toLowerCase() && data.barcode.trim().toLowerCase() == good.barcode.trim().toLowerCase())[0];
                return {
                    ...goodDataFile,
                    ...good,
                    price: goodDataFile.price ? goodDataFile.price : good.price
                };
            });
        }

        if (!this.props.isCheckingGoods && this.props.notExistsGoods && this.props.notExistsGoods.length > 0 && this.state.goods.length > 0) {
            this.notExistsGoods = this.props.notExistsGoods.map((good) => {
                let goodDataFile = this.state.goods.filter((data) =>
                    data.code.trim().toLowerCase() == good.code.trim().toLowerCase() && data.barcode.trim().toLowerCase() == good.barcode.trim().toLowerCase())[0];
                return goodDataFile;
            });
        }

        return (
            <div>
                <p className="text-muted">
                    Bạn có thể tải file mẫu <a href="http://d1j8r0kxyu9tj8.cloudfront.net/csv/file/example_import_good.xlsx">tại
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
                {!this.props.isCheckingGoods && this.goods.length > 0 &&
                <div>
                    <h5><strong>Danh sách sản phẩm</strong></h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Barcode</th>
                                <th>Số lượng</th>
                                <th>Giá vốn</th>
                                <th>Thành giá</th>
                                <th>Giá bán</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.goods.map((good, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{good.code}</td>
                                            <td>{good.name}</td>
                                            <td>{good.barcode}</td>
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
                {!this.props.isCheckingGoods && this.notExistsGoods.length > 0 &&
                <div>
                    <h5><strong>Một số sản phẩm chưa tồn tại</strong>
                        <TooltipButton text="Thêm Sản phẩm" placement="top">
                            <a className="btn btn-round btn-sm btn-primary"
                               style={{
                                   width: '19px',
                                   height: '19px',
                                   padding: '1',
                                   margin: '5px'
                               }}
                               href="/manufacture/good/create"
                               target="_blank"
                            >
                                <i className="material-icons">add</i>
                            </a>
                        </TooltipButton>
                    </h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>STT</th>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Barcode</th>
                                <th>Số lượng</th>
                                <th>Giá vốn</th>
                                <th>Thành giá</th>
                                <th>Giá bán</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.notExistsGoods.map((good, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{good.code}</td>
                                            <td>{good.name}</td>
                                            <td>{good.barcode}</td>
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
                        {this.notExistsGoods.length > 0 &&
                        <TooltipButton text="Làm mới dữ liệu" placement="top">
                            <button className="btn btn-info" onClick={this.refreshData}>
                                <i className="material-icons">refresh</i> Làm mới
                            </button>
                        </TooltipButton>
                        }
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
    storeGoods: PropTypes.func.isRequired
};

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
