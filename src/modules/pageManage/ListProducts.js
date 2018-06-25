import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./pageManageStore";
import Loading from "../../components/common/Loading";
// import {observable} from "mobx";
// import * as helper from "../../helpers/helper";
import Switch from "react-bootstrap-switch";
// import TooltipButton from "../../components/common/TooltipButton";
import ButtonGroupAction from "../../components/common/ButtonGroupAction";
import Avatar from "../../components/common/Avatar";
import * as helper from "../../helpers/helper";

// import {OverlayTrigger,Tooltip} from "react-bootstrap";

@observer
class ListProducts extends Component {
    constructor(props) {
        super(props);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    openAddProductModal(product_id) {
        store.product = store.products.filter((product) => {
            return product.id === product_id;
        })[0];
        store.isOpenAddProductModal = true;
        store.isEditProduct = true;
    }

    deleteProduct(cur_product) {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn xóa " + cur_product.title + " ?",
            () => {
                store.deleteProduct(cur_product.id);
            },
        );
    }


    render() {

        return (
            <div>
                {store.isLoadingProducts ? <Loading/>
                    :
                    <div className="row">
                        {store.products &&
                        store.products.map(product => {

                            return (
                                <div
                                    className="col-sm-6 col-md-6 col-lg-4"
                                    key={product.id}
                                >
                                    <div className="card card-chart">
                                        <div
                                            className="card-header"
                                            data-background-color="white"
                                            style={{borderRadius: "10px"}}
                                        >
                                            <a onClick={() => {
                                                this.openAddProductModal(
                                                    product.id
                                                );
                                            }}
                                            >
                                                <div
                                                    id="simpleBarChart"
                                                    className="ct-chart"
                                                    style={{
                                                        width: "100%",
                                                        background:
                                                        "url(http://" +
                                                        product.url +
                                                        ")",
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                            "center",
                                                        height: "200px",
                                                        borderRadius: "10px",
                                                        position: "relative"
                                                    }}
                                                />
                                            </a>
                                        </div>

                                        <div className="card-content">
                                            <div
                                                className="card-action"
                                                style={{height: 73}}
                                            >
                                                <h4
                                                    className="card-title"
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between"
                                                    }}
                                                >
                                                    <a
                                                        onClick={() => {
                                                            this.openAddProductModal(
                                                                product.id
                                                            );
                                                        }}
                                                    >
                                                        {product.title
                                                            ? helper.shortString(product.title,30)
                                                            : "Chưa có tên"}
                                                    </a>

                                                    <ButtonGroupAction
                                                        delete={this.deleteProduct}
                                                        object={product}
                                                        disabledEdit
                                                    />
                                                </h4>
                                            </div>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent:
                                                        "space-between",
                                                    height: 40
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    {product.author.avatar_url ? (
                                                        <Avatar
                                                            size={40}
                                                            url={
                                                                product.author
                                                                    .avatar_url
                                                            }
                                                            style={{
                                                                borderRadius: 6
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div>
                                                        <strong>
                                                            {product.author.name}
                                                        </strong>
                                                        <br/>
                                                        <p
                                                            className="category"
                                                            style={{
                                                                fontSize: 12
                                                            }}
                                                        >
                                                            {product.created_at}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center"
                                                    }}
                                                >
                                                    <Switch
                                                        onChange={() =>
                                                            store.changeStatus(
                                                                product.id,
                                                                product.status,
                                                                product.title
                                                            )
                                                        }
                                                        bsSize="mini"
                                                        onText="Hiện"
                                                        offText="Ẩn"
                                                        value={
                                                            product.status === 1
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        );
    }
}


export default ListProducts;
