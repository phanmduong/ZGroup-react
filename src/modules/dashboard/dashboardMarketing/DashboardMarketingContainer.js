import React from 'react';
import {IndexLink, Link} from 'react-router';
import {observer} from 'mobx-react';
import {store} from "./DashBoardMarketingStore";
import Loading from "../../../components/common/Loading";


@observer
export default class DashboardMarketingContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            filter: {}
        };


    }

    componentDidMount() {
        store.initLoad();
        store.pathname = this.props.location.pathname;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.pathname != nextProps.location.pathname) {
            store.pathname = nextProps.location.pathname;
            store.load();
        }

    }

    render() {
        this.path = this.props.location.pathname;
        let {isLoading} = store;
        console.log({...store}.pathname);
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul className="nav nav-pills nav-pills-dark margin-top-10" data-tabs="tabs">
                            {store.routes.map((route, index) => {
                                let className = this.path === route.path ? 'active' : '';
                                return (
                                    index ?
                                        <li className={className}>
                                            <Link to={route.path}>
                                                {route.text}
                                            </Link>
                                        </li>
                                        :
                                        <li className={className}>
                                            <IndexLink to={route.path}>
                                                {route.text}
                                            </IndexLink>
                                        </li>
                                );
                            })}
                        </ul>

                    </div>
                </div>
                {isLoading && <Loading/>}

                {!isLoading && this.props.children}
                {/*{!isLoading && <div className="row margin-top-20 gutter-20">*/}

                {/*    <div className="col-md-3">*/}
                {/*        <DateRangePicker className="background-white padding-vertical-10px cursor-pointer"*/}
                {/*                         start={moment(filter.start_time)} end={moment(filter.end_time)}*/}
                {/*                         style={{padding: '5px 10px 5px 20px', lineHeight: '34px'}}*/}
                {/*                         onChange={store.changeDateRangePicker}*/}

                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="col-md-3">*/}
                {/*        <ReactSelect*/}
                {/*            value={store.filter.gen_id}*/}
                {/*            options={store.getFilterOptions.gens}*/}
                {/*            onChange={(e) => store.onChangeFilter('gen_id',e)}*/}
                {/*            className="react-select-white-light-round cursor-pointer"*/}
                {/*            placeholder="Chọn khóa"*/}
                {/*            clearable={false}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="col-md-3">*/}
                {/*        <ReactSelect*/}
                {/*            value={store.filter.base_id}*/}
                {/*            options={store.getFilterOptions.bases}*/}
                {/*            onChange={(e) => store.onChangeFilter('base_id',e)}*/}
                {/*            className="react-select-white-light-round cursor-pointer"*/}
                {/*            placeholder="Chọn cơ sở"*/}
                {/*            clearable={false}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div className="col-md-3">*/}
                {/*        <ReactSelect.Async*/}
                {/*            loadOptions={(p1, p2) => store.loadStaffs(p1, p2, true)}*/}
                {/*            loadingPlaceholder="Đang tải..."*/}
                {/*            className="react-select-white-light-round cursor-pointer"*/}
                {/*            placeholder="Chọn nhân viên"*/}
                {/*            searchPromptText="Không có dữ liệu nhân viên"*/}
                {/*            onChange={(e) => store.onChangeFilter('carer_id',e)}*/}
                {/*            value={store.filter.carer}*/}
                {/*            optionRenderer={(option) => {*/}
                {/*                return (*/}
                {/*                    <ItemReactSelect label={option.label}*/}
                {/*                                     url={option.avatar_url}/>*/}
                {/*                );*/}
                {/*            }}*/}
                {/*            valueRenderer={(option) => {*/}
                {/*                return (*/}
                {/*                    <ItemReactSelect label={option.label}*/}
                {/*                                     url={option.avatar_url}/>*/}
                {/*                );*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </div>*/}

                {/*</div>}*/}


            </div>
        );
    }
}