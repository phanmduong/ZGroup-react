import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import {Link} from "react-router";
import Loading from "../../components/common/Loading";
import PropTypes from "prop-types";
import * as goodActions from "./goodActions";
import GoodList from "./GoodList";
import TooltipButton from "../../components/common/TooltipButton";
import { Modal } from "react-bootstrap";
import {
    newWorkBook,
    appendJsonToWorkBook,
    saveWorkBookToExcel,
    renderExcelColumnArray,
    dotNumber
} from "../../helpers/helper";
class GoodListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showLoadingModal: false
        };
    }

    componentWillMount() {
        this.props.goodActions.loadGoods(this.props.params.type);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.props.goodActions.loadGoods(nextProps.params.type);
        }
    }

    openLoadingModal = () => {
        this.setState({ showLoadingModal: true });
        this.props.goodActions.loadAllGoods(
            this.props.params.type,
            this.exportExcel
        );
    };

    exportExcel = input => {
        let wb = newWorkBook();
        let data;
        let cols = [5, 30, 20, 30, 30, 15, 20]; //độ rộng cột

        data = input.map((item, index) => {
            /* eslint-disable */
            let res = {
                STT: index + 1,
                "Tên sản phẩm": item.name || "Không tên",
                Giá: dotNumber(item.price) || 0,
                "Mã sản phẩm": item.code || "Không có",
                Barcode: item.barcode || "Không có",
                "Số lượng": item.quantity || 0
            };
            if (item.properties) {
                res = { ...res, "Thuộc tính =>": "" };
                item.properties.forEach(e => {
                    res = { ...res, [e.name]: e.value || "" };
                    let len = Math.max(
                        e.name ? e.name.length : 0,
                        e.value ? e.value.length : 0
                    );
                    cols = [...cols, len + 5];
                });
            }
            /* eslint-enable */
            return res;
        });

        appendJsonToWorkBook(
            data,
            wb,
            "Danh sách sản phẩm",
            renderExcelColumnArray(cols)
        );

        //xuất file
        saveWorkBookToExcel(wb, "Danh sách sản phẩm");

        this.setState({ showLoadingModal: false });
    };

    render() {
        return (
            <div id="page-wrapper">
                <Modal show={this.state.showLoadingModal} onHide={() => {}}>
                    <Modal.Header>
                        <h3>{"Đang xuất file..."}</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <Loading />
                    </Modal.Body>
                </Modal>
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Sản phẩm</strong>{" "}
                                    </h4>
                                </div>
                                <div className="flex-end">
                                    <div>
                                        <TooltipButton
                                            text="Xuất thành file excel"
                                            placement="top"
                                        >
                                            <button
                                                className="btn btn-rose"
                                                onClick={this.openLoadingModal}
                                                style={{
                                                    borderRadius: 30,
                                                    padding: "0px 11px",
                                                    margin: "-1px 10px",
                                                    minWidth: 25,
                                                    height: 25,
                                                    width: "55%"
                                                }}
                                            >
                                                <i
                                                    className="material-icons"
                                                    style={{
                                                        height: 5,
                                                        width: 5,
                                                        marginLeft: -11,
                                                        marginTop: -10
                                                    }}
                                                >
                                                    file_download
                                                </i>
                                            </button>
                                        </TooltipButton>
                                    </div>
                                </div>
                            </div>
                            {this.props.isLoading ? (
                                <Loading />
                            ) : (
                                <GoodList
                                    user={this.props.user}
                                    goods={this.props.goods}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

GoodListContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    goodActions: PropTypes.object.isRequired,
    goods: PropTypes.array.isRequired,
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.goodList.isLoading,
        goods: state.good.goodList.goods,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodListContainer);
