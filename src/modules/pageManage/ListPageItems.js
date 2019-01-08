import React, {Component} from "react";
import {observer} from "mobx-react";
import store from "./pageManageStore";
import Loading from "../../components/common/Loading";
// import {observable} from "mobx";
// import * as helper from "../../helpers/helper";
import Switch from "react-bootstrap-switch";
import TooltipButton from "../../components/common/TooltipButton";
import {NO_IMAGE} from "../../constants/env";
import {isEmptyInput} from "../../helpers/helper";
// import {NO_IMAGE} from "../../constants/env";
// import * as helper from "../../helpers/helper";
// import ImageUploader from "../../components/common/ImageUploader";

// import {OverlayTrigger,Tooltip} from "react-bootstrap";

@observer
class ListPageItems extends Component {
    constructor(props) {
        super(props);
        this.openEditPageItemModal = this.openEditPageItemModal.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

    openEditPageItemModal(id) {
        store.pageItem = store.pageItems.filter((item) => {
            return item.id === id;
        })[0];
        // console.log(store.pageItems.filter((item) => {return item.id === id;})[0],"xxxxx");
        store.isOpenAddPageItemModal = true;
        store.isEditPageItem = true;
    }

    handleSwitch(id, is_actived, name) {
        store.changeIsActived(id, is_actived, name);
    }

    render() {

        return (
            <div>
                {store.isLoadingPageItems ? <Loading/>
                    :
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead className="text-rose">
                            <tr>
                                <th>Tên</th>
                                <th>Nội dung tiếng anh</th>
                                <th>Nội dung tiếng việt</th>
                                {/*<th>Keyword</th>*/}
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {store.pageItems && store.pageItems.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td style={{minWidth: 150}}>
                                            {item.name}
                                        </td>
                                        <td>
                                            {item.value_en}

                                        </td>
                                        {item.type === "img" ?

                                            <td style={{display: "flex", justifyContent: "right"}}>
                                                <img
                                                    src={
                                                        isEmptyInput(item.value_en)
                                                            ? NO_IMAGE
                                                            : item.value_en
                                                    }
                                                    style={{
                                                        height: "30%",
                                                        width: "30%",
                                                        display: "block",
                                                        backgroundSize: "cover",
                                                        backgroundPosition: "center",
                                                        boxShadow:
                                                            " 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
                                                        borderRadius: "10px",
                                                    }}
                                                />
                                            </td>
                                            :
                                            <td>{item.value_vi}</td>
                                        }
                                        <td>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Switch
                                                    onChange={() =>
                                                        this.handleSwitch(
                                                            item.id,
                                                            item.is_actived,
                                                            item.name
                                                        )
                                                    }
                                                    bsSize="mini"
                                                    onText="Hiện"
                                                    offText="Ẩn"
                                                    value={
                                                        item.is_actived === 1
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <TooltipButton
                                                placement="top"
                                                text="Sửa">
                                                <a style={{color: "#878787"}}
                                                   onClick={() => this.openEditPageItemModal(item.id)}
                                                >
                                                    <i className="material-icons">edit</i>
                                                </a>
                                            </TooltipButton>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}


export default ListPageItems;
