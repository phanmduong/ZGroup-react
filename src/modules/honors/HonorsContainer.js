/* eslint-disable no-undef */
import React from 'react';
import Loading from "../../components/common/Loading";
import Store from "./store";
import {observer} from 'mobx-react';
import ListHonor from "./ListHonor";

@observer
class HonorsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = new Store();
    }

    componentWillMount() {
        this.store.getData();
    }


    render() {
        const {isLoading, data} = this.store;
        return (
            <div id="page-wrapper">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-content">
                            <div className="tab-content">
                                <h4 className="card-title">
                                    <strong>Bảng vinh danh</strong>
                                </h4>
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


export default HonorsContainer;