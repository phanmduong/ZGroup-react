/* eslint-disable no-undef */
import React from 'react';
import Loading from "../../components/common/Loading";
import Store from "./store";
import {observer} from 'mobx-react';
import ListHonor from "./ListHonor";
import TooltipButton from "../../components/common/TooltipButton";
import AddHonorStaffModal from "./addStaffModal/AddHonorStaffModal";
import {connect} from "react-redux";


@observer
class HonorsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store();
    }

    componentWillMount() {
        this.store.loadHonorStaffs();
    }


    render() {
        const {isLoading, data} = this.store;
        return (
            <div id="page-wrapper">
                <AddHonorStaffModal
                    submit={(data, callback) =>this.store.submitData(data,callback)}
                    showModal={this.store.showAddModal}
                    close={() => this.store.closeAddModal()}
                    isSaving={this.store.isSaving}
                    isEdit={this.store.isEdit}
                    honor={this.store.honor}
                />
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <div className="flex-row flex">
                                    <h4 className="card-title">
                                        <strong>Bảng vinh danh</strong>
                                    </h4>
                                    {this.props.user.role == 2 && <div className="dropdown">
                                        <TooltipButton text="Thêm nhân viên" placement="top">
                                            <button onClick={() => this.store.addHonorStaffs()}
                                                    className="btn btn-rose btn-round btn-xs button-add none-margin">
                                                <strong>+</strong>
                                            </button>
                                        </TooltipButton>
                                    </div>}
                                </div>
                                <br/>
                                <div className="card-title">
                                    Tất cả chúng ta, ai cũng đóng góp phần nào để xây dựng nên COLORME.
                                </div>
                                <br/>
                                <div className="card-title">
                                    Trong số đó, có những người tạo ra những di sản rất lớn lao, giúp ích được cho
                                    rất nhiều những người đi sau đó. Bảng vinh danh này giúp chúng ta nhìn lại chặng
                                    đường đã qua của COLORME.

                                </div>

                                {isLoading ? <Loading/> :
                                    <ListHonor
                                        honors={data.honors}
                                        user={this.props.user}
                                        edit={(data)=>this.store.editHonor(data)}
                                        delete={(data)=>this.store.deleteHonor(data)}

                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.login.user,
    };
}

function mapDispatchToProps() {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HonorsContainer);
