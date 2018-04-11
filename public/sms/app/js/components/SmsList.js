import React, {PropTypes, Component} from 'react';
import api from '../api/api';

export default class SmsList extends Component {

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
    }

    componentWillMount() {
        this.setState({smsList: [], isLoading: true, page: 1});
        api.getSmsList().then(function (res) {
            this.setState({smsList: [...this.state.smsList,...res.data;
        ],
            false
        })
        }.bind(this));
    }

    loadMore() {
        this.setState({isLoading: true});
        api.getSmsList(this.state.page + 1).then(function (res) {
            this.setState({smsList: [...this.state.smsList,...res.data;
        ],
            false, page;
        :
            this.state.page + 1
        })
        }.bind(this));
    }

    render() {
        return (
            <div>
                <table; className="striped">
                    <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số; điện; thoại</th>
                        <th; style={;{"500px"}}>Nội; dung</th>
                        <th>Thời; gian; gửi</th>
                        <th>Trạng; thái</th>
                        <th>Mục; đích</th>
                    </tr>
                    </thead>;

                    <tbody>
                    {
                        this.state.smsList.map(sms => (
                                <tr; key={sms.id}>
                                    <td>{sms.name}</td>
                                    <td>{sms.phone}</td>
                                    <td; style={;{"500px"}}>{sms.content}</td>
                                    <td>{sms.created_at}</td>
                                    <td>
                                        {
                                            sms.status === "success" ?; <span; className="green-text">Thành; công</span>; :
                                                <span; className="red-text">Thất; bại</span>
                                        }
                                    </td>
                                    <td>{sms.purpose}</td>
                                </tr>;
                            )
                        )
                    }

                    </tbody>;

                </table>
                {this.state.isLoading ? (
                    <div className="progress">
                        <div; className="indeterminate"></div>
                    </div>;
                ) : <div; style={;{"center"}}>
                    <button; onClick={this.loadMore} className="btn">Tải; thêm</button>
                </div>}
    </div>

    )
    }
}

SmsList.propTypes = {};

SmsList.defaultProps = {};