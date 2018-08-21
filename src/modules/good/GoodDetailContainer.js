import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import FormInputText from "../../components/common/FormInputText";
import * as goodActions from "../good/goodActions";
import FilesList from "./FilesList";
import {ListGroup, ListGroupItem, Panel} from "react-bootstrap";
import {
    newWorkBook,
    appendJsonToWorkBook,
    saveWorkBookToExcel,
    renderExcelColumnArray,
    dotNumber
} from "../../helpers/helper";

class GoodDetailContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            header: "Thêm sản phẩm",
            property: {}
        };
    }

    componentWillMount() {
        this.props.goodActions.loadGood(this.props.params.goodId);

    }

    exportExcel = input => {
        let wb = newWorkBook();
        let data;
        let cols = [5, 30, 20, 30, 30, 15, 20]; //độ rộng cột

        data = input.map((item, index) => {
            /* eslint-disable */
            let res = {
                STT: index + 1,
                "Tên sản phẩm": item.name || "Không tên",
                Giá: dotNumber(item.price) || "Không có",
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
        saveWorkBookToExcel(wb, 
            (input && input.length >  0 && input[0].name) ? input[0].name :  "Thông tin sản phẩm");
    };

    render() {
        const good = this.props.good;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    {this.props.isLoading ? <Loading/> : (
                        <div className="row">
                            <div className="col-sm-8">

                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Thông tin chi tiết sản phẩm</h4>
                                        <form role="form">
                                            <FormInputText
                                                placeholder="Nhập tên sản phẩm"
                                                label="Tên sản phẩm"
                                                name="name"
                                                disabled={true}
                                                required={true}
                                                value={good.name}/>
                                            <FormInputText
                                                placeholder="Nhập mã sản phẩm"
                                                label="Mã sản phẩm"
                                                name="code"
                                                disabled={true}
                                                required={true}
                                                value={good.code}/>
                                            <FormInputText
                                                placeholder="Nhập mô tả sản phẩm"
                                                label="Mô tả sản phẩm"
                                                disabled={true}
                                                name="description"
                                                value={good.description}/>
                                            <FormInputText
                                                placeholder="Nhập giá sản phẩm"
                                                label="Giá sản phẩm"
                                                name="price"
                                                disabled={true}
                                                type="number"
                                                value={good.price}/>

                                        </form>
                                        <button className="btn btn-rose" style={{float: 'right'}}
                                            onClick={()=>this.exportExcel([good])}
                                        >Xuất thông tin sản phẩm</button>
                                    </div>
                                </div>


                                {
                                    good.cards && good.cards.map((card, index) => {
                                        return (
                                            <div key={index}>
                                                {
                                                    card.taskLists && card.taskLists.map((taskList) => {
                                                        return (
                                                            <div key={taskList.id} className="card">
                                                                <div className="card-header card-header-icon"
                                                                     data-background-color="rose">
                                                                    <i className="material-icons">toc</i>
                                                                </div>
                                                                <div className="card-content">
                                                                    <h4 className="card-title">{taskList.title}</h4>
                                                                    <div>
                                                                        {
                                                                            taskList.tasks && taskList.tasks.map((task, index) => {
                                                                                const header = (
                                                                                    <div className="good-detail-header"
                                                                                         style={{
                                                                                             width: "100%",
                                                                                             height: "100%"
                                                                                         }}>
                                                                                        {task.title}
                                                                                    </div>
                                                                                );
                                                                                return (
                                                                                    <Panel collapsible
                                                                                           key={index}
                                                                                           header={header}>
                                                                                        <ListGroup>
                                                                                            {
                                                                                                task.properties && task.properties.map((property, index) => {
                                                                                                    return (
                                                                                                        <ListGroupItem key={index}>
                                                                                                            <FormInputText
                                                                                                                label={property.name}
                                                                                                                name="price"
                                                                                                                disabled={true}
                                                                                                                type="number"
                                                                                                                value={property.value}/>
                                                                                                        </ListGroupItem>
                                                                                                    );
                                                                                                })
                                                                                            }
                                                                                        </ListGroup>
                                                                                    </Panel>
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );

                                                    })
                                                }

                                            </div>

                                        );
                                    })
                                }


                            </div>
                            <div className="col-sm-4">
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">announcement</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Ảnh</h4>
                                        <label>Avatar</label>
                                        <div style={{
                                            width: "100%",
                                            marginBottom: 10,
                                            paddingBottom: "100%",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundImage: `url("${good.avatar_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}")`,
                                        }}/>
                                        <label>Cover</label>
                                        <div>
                                            <img
                                                src={good.cover_url || "http://d255zuevr6tr8p.cloudfront.net/no_photo.png"}
                                                style={{
                                                    width: "100%"
                                                }}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header card-header-icon" data-background-color="rose">
                                        <i className="material-icons">mode_edit</i>
                                    </div>
                                    <div className="card-content">
                                        <h4 className="card-title">Tệp tin đính kèm</h4>
                                        <FilesList
                                            disableEdit={true}
                                            files={this.props.good.files}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

GoodDetailContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    isSaving: PropTypes.bool.isRequired,
    isUploadingAvatar: PropTypes.bool.isRequired,
    isUploadingCover: PropTypes.bool.isRequired,
    route: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    goodActions: PropTypes.object.isRequired,
    percent: PropTypes.number.isRequired,
    percentCover: PropTypes.number.isRequired,
    good: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        isLoading: state.good.createGood.isLoading,
        isSaving: state.good.createGood.isSaving,
        percentCover: state.good.createGood.percentCover,
        isUploadingAvatar: state.good.createGood.isUploadingAvatar,
        isUploadingCover: state.good.createGood.isUploadingCover,
        good: state.good.createGood.good,
        percent: state.good.createGood.percent
    };
}

function mapDispatchToProps(dispatch) {
    return {
        goodActions: bindActionCreators(goodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodDetailContainer);