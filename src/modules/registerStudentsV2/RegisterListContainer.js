import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Loading from "../../components/common/Loading";
import {observer} from "mobx-react";
import Search from "../../components/common/Search";
import Select from "../registerStudents/SelectGen";
import CreateRegisterOverlay from "../infoStudent/overlays/CreateRegisterOverlay";
import RegisterList from "./RegisterList";
import {store} from "./RegisterListStore";


@observer
class RegisterListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.tabViews = [
            {
                text: 'TẤT CẢ',
                value: '',
                label: "TẤT CẢ"
            },
            {
                value: this.props.user.id,
                label: "CỦA BẠN",
                text: 'CỦA BẠN',
            },
        ];
    }

    componentDidMount() {
        store.loadRegisters();

    }

    registersSearchChange = ()=>{

    }
    onSearchRegisters = ()=>{

    }

    changeGens =()=>{

    }

    openFilterPanel = ()=>{

    }

    render() {
        return (

            <div className="container-fluid">
                <div className="card" mask="purple">
                    <img className="img-absolute"/>
                    <div className="card-content">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="flex-row flex">
                                    <h2 className="card-title">
                                        <strong>Danh sách đăng kí</strong>
                                    </h2>
                                </div>
                                <div>
                                    <a
                                        onClick={this.showLoadingModal}
                                        className="text-white"
                                        disabled={false}
                                    >Tải xuống</a>
                                </div>
                                <div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>
                                    <Search
                                        onChange={this.registersSearchChange}
                                        value={''}
                                        placeholder="Tìm kiếm học viên"
                                        className="round-white-seacrh"
                                        onSearch={this.onSearchRegisters}
                                    />
                                    <button
                                        onClick={this.openFilterPanel}
                                        className="btn btn-white btn-round btn-icon"
                                        disabled={false}
                                    >Lọc</button>
                                    <Select
                                        options={[]}
                                        onChange={this.changeGens}
                                        value={''}
                                        defaultMessage="Chọn khóa học"
                                        name="gens"
                                    />
                                    <CreateRegisterOverlay
                                        className="btn btn-white btn-round btn-icon"
                                        onSuccess={()=>{}}
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <ul className="nav nav-pills nav-pills-dark" data-tabs="tabs">
                    {this.tabViews.map((tab, key) => {
                        let className = tab.value == '' ? 'active' : '';
                        return (<li className={className} key={key}
                                    // onClick={() => this.openLinkWithFilter({"saler_id": tab.value})}
                        >
                            <a>{tab.text}</a>
                        </li>);
                    })}
                </ul>
                <div>
                    {store.isLoading && <Loading/>}
                    {!store.isLoading && <RegisterList/>}

                </div>
            </div>

        );
    }
}

RegisterListContainer.propTypes = {
    params: PropTypes.object,

};

function mapStateToProps(state) {
    return{
        user: state.login.user,

    };
}

export default connect(mapStateToProps)(RegisterListContainer);
