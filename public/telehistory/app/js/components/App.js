import React, {Component} from 'react';
import api from '../utils/api';
import Telecall from './Telecall';

export default class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            telecalls: [],
            isLoadmore: false
        };
        this.addTelecall = this.addTelecall.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    loadMore() {
        this.setState({isLoadmore: true, page: this.state.page + 1});
        api.getTelecalls(this.state.page)
            .then(res => {
                this.setState({
                    telecalls: [...this.state.telecalls, ...res.data.telecalls],
                    isLoading: false
                });
                this.setState({isLoadmore: false});
            })
    }

    addTelecall(telecall) {
        this.setState({
            telecalls: [telecall, ...this.state.telecalls]
        });
    }

    componentWillMount() {
        this.loadMore();
    }


    render() {
        return (
            <div className='Menu'>
                <h3 className="header">
                    Lịch sử gọi
                </h3>
                <div className="row">

                    <table className="striped responsive-table">
                        <thead>
                        <tr>
                            <th>Người gọi</th>
                            <th>Học viên(email)</th>
                            <th>Số điện thoại</th>
                            <th>Trạng thái</th>
                            <th>Ghi chú</th>
                            <th>Thời gian gọi</th>
                            <th>Gọi</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.telecalls.map((telecall) => {
                                return (
                                    <Telecall addTelecall={this.addTelecall} key={telecall.id} telecall={telecall}/>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    {this.state.isLoadmore ?
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div> :
                        <div style={{textAlign: 'center'}}>
                            {this.state.telecalls.length == 0 ?
                                <span className="green-text">Bạn này chưa có ai gọi</span> :
                                <button className="btn" onClick={this.loadMore}>Tải thêm</button>}
                        </div>}
                </div>
            </div>
        );
    }
}