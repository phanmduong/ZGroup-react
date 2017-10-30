import React from 'react';
import ReactSelect from 'react-select';
import * as importGoodsApi from '../importGoodsApi';

class StoreGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadGoods = this.loadGoods.bind(this);
        this.timeOut = null;
    }

    loadGoods(input, callback) {
        if (input.trim().length >= 3) {
            if (this.timeOut !== null) {
                clearTimeout(this.timeOut);
            }
            this.timeOut = setTimeout(function () {
                importGoodsApi.searchGoods(input).then(res => {
                    let goods = res.data.data.goods.map((good) => {
                        return {
                            ...good,
                            ...{
                                value: good.id,
                                label: `${good.name} (${good.code})`,
                            }
                        };
                    });
                    callback(null, {options: goods, complete: true});
                });
            }.bind(this), 500);
        } else {
            callback(null, {complete: true});
        }
    }

    render() {
        return (
            <div>
                <ReactSelect.Async
                    loadOptions={this.loadGoods}
                    loadingPlaceholder="Đang tải..."
                    placeholder="Chọn sản phẩm (Gõ từ 3 kí tự trở lên)"
                    searchPromptText="Không có dữ liệu sản phẩm"
                />
            </div>
        );
    }
}


export default StoreGood;
