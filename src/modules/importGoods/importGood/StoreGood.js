import React from 'react';
import ReactSelect from 'react-select';
import * as importGoodsApi from '../importGoodsApi';
import * as helper from '../../../helpers/helper';
import FormInputText from '../../../components/common/FormInputText';
import PropTypes from 'prop-types';


class StoreGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedGood: null
        };
        this.loadGoods = this.loadGoods.bind(this);
        this.selectGood = this.selectGood.bind(this);
        this.updateFormData = this.updateFormData.bind(this);
        this.storeGood = this.storeGood.bind(this);
        this.timeOut = null;


    }

    loadGoods(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            importGoodsApi.searchGoods(input).then(res => {
                let goods = res.data.goods.map((good) => {
                    let label = good.barcode ? `${good.name} (${good.code}, ${good.barcode})` : `${good.name} (${good.code}`;
                    return {
                        ...good,
                        ...{
                            value: good.id,
                            label: label,
                            quantity: 0,
                            import_price: 0
                        }
                    };
                });
                callback(null, {options: goods, complete: true});
            });
        }.bind(this), 500);
    }

    updateFormData(event) {
        const field = event.target.name;
        let selectedGood = {...this.state.selectedGood};
        if (field == 'import_price') {
            if (!isNaN(Number(event.target.value.toString().replace(/\./g, "")))) {
                selectedGood[field] = Number(event.target.value.toString().replace(/\./g, ""));
            }
        } else {
            selectedGood[field] = event.target.value;
        }
        this.setState({
            selectedGood: selectedGood
        });
    }

    selectGood(value) {
        this.setState({
            selectedGood: value
        });
    }

    storeGood() {
        this.props.storeGood(this.state.selectedGood);
    }

    render() {
        return (
            <div>
                <ReactSelect.Async
                    loadOptions={this.loadGoods}
                    loadingPlaceholder="Đang tải..."
                    placeholder="Chọn sản phẩm"
                    searchPromptText="Không có dữ liệu sản phẩm"
                    onChange={this.selectGood}
                    value={this.state.selectedGood}
                />
                {this.state.selectedGood &&
                <div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormInputText
                                label="Tên sản phẩm"
                                disabled
                                value={this.state.selectedGood.name}
                                name="name"
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Mã sản phẩm"
                                disabled
                                value={this.state.selectedGood.code}
                                name="code"
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Barcode"
                                disabled
                                value={this.state.selectedGood.barcode}
                                name="barcode"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <FormInputText
                                label="Số lượng"
                                value={this.state.selectedGood.quantity}
                                updateFormData={this.updateFormData}
                                name="quantity"
                                type="number"
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Giá vốn"
                                value={helper.dotNumber(this.state.selectedGood.import_price)}
                                updateFormData={this.updateFormData}
                                name="import_price"
                            />
                        </div>
                        <div className="col-md-4">
                            <FormInputText
                                label="Giá bán"
                                value={helper.dotNumber(this.state.selectedGood.price)}
                                updateFormData={this.updateFormData}
                                name="price"
                            />
                        </div>
                    </div>
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
                }

            </div>
        );
    }
}

StoreGood.propTypes = {
    storeGood: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default StoreGood;
