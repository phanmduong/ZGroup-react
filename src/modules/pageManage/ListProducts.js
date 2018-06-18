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

// import {OverlayTrigger,Tooltip} from "react-bootstrap";

@observer
class ListProducts extends Component {
    constructor(props) {
        super(props);
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
                                                    <a
                                                        // on={`/blog/${product.id}/editor`}
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
                                                                // onClick={() => {
                                                                //     this.openEditproductModal(
                                                                //         product.id
                                                                //     );
                                                                // }}
                                                            >
                                                                {product.title
                                                                    ? product.title
                                                                    : "Chưa có tên"}
                                                            </a>

                                                            <ButtonGroupAction
                                                                editUrl={
                                                                    "blog/product/" +
                                                                    product.id +
                                                                    "/edit"
                                                                }
                                                                // delete={this.deleteproduct}
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
                                                                    this.handleSwitch(
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
