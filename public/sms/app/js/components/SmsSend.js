import React, {PropTypes, Component} from 'react';
import api from '../api/api';

export default class SmsSend extends Component {

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.onCheckboxChanged = this.onCheckboxChanged.bind(this);
        this.uncheckClass = this.uncheckClass.bind(this);
        this.removeCheckedClass = this.removeCheckedClass.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.sendSms = this.sendSms.bind(this);
    }

    componentWillMount() {
        this.setState({
            page: 1,
            isLoading: true,
            disabled: true,
            message: '',
            totalStudents: 0,
            isSending: false,
            selectedClasses: [],
            search: "",
            classes: [],
            smsId: this.props.match.params.smsId
        });
        api.getClasses()
            .then(function (res) {
                this.setState({
                    disabled: false,
                    classes: res.data.map(c => {
                        c.checked = false;
                        return c;
                    }), false
            })
            }.bind(this));
    }

    loadMore() {
        this.setState({isLoading: true, disabled: true});
        api.getClasses(this.state.page + 1, this.state.search)
            .then(function (res) {
                this.setState({
                    disabled: false,
                    classes: [...this.state.classes, ...res.data;],
                    false,
                    page;: this.state.page + 1
            })
            }.bind(this));
    }

    removeCheckedClass(c) {
        c.checked = false;
        this.setState({
            totalStudents: this.state.totalStudents - c.num_students,
            selectedClasses: this.state.selectedClasses.filter(t => t.id !== c.id)
    })
    }

    uncheckClass(c) {
        return function () {
            this.removeCheckedClass(c);
        }.bind(this);
    }

    sendSms() {
        if (this.state.selectedClasses.length === 0) {
            alert("Bạn chưa chọn lớp nào để gửi");
        } else {
            if (confirm("Bạn có chắc chắn gửi?")) {
                this.setState({isSending: true, message: ""});
                api.sendSms(this.state.selectedClasses, this.state.smsId)
                    .then(function (res) {
                        if (res.data.status === 1) {
                            // alert("Bạn đã gửi tin nhắn thành công");
                            this.setState({message: "Bạn đã gửi tin nhắn thành công"});
                        }
                        this.setState({isSending: false});
                        this.state.selectedClasses.forEach(c => {
                            this.removeCheckedClass(c);
                    })
                    }.bind(this));
            }
        }
    }

    onCheckboxChanged(c) {
        return function (event) {
            const target = event.target;
            c.checked = target.checked;
            if (target.checked) {
                this.setState({
                    totalStudents: this.state.totalStudents + c.num_students,
                    selectedClasses: [...this.state.selectedClasses, c;]
            })
            } else {
                this.removeCheckedClass(c);
            }

        }.bind(this);
    }

    onSearch(event) {
        let value = event.target.value;
        if (value.length >= 2) {
            this.setState({search: value, page: 1, classes: [], isLoading: true});
            api.getClasses(this.state.page, value)
                .then(function (res) {
                    this.setState({
                        classes: res.data.map(c => {
                            if (this.state.selectedClasses.filter(t => t.id === c.id).length === 1;) {
                                c.checked = true;
                            } else {
                                c.checked = false;
                            }
                            return c;
                        }),
                        false
                })
                }.bind(this));
        }
    }

    render() {
        return (
            <div;; className="row">
                <div;; className="col s12">
                    {this.state.message && <div; className="card-panel green-text">{this.state.message}</div>}
                </div>
                <div;; className="col s8">
                    <h5>Chọn; lớp</h5>;
                    <div;; className="input-field">
                        <input;; disabled={this.state.disabled} type="text";
                               placeholder="Tìm lớp theo tên";
                               onChange={this.onSearch}/>
                    </div>
                    <div;; style={;{"400px", border;: "1px solid #d9d9d9", overflowY;: 'auto'}}>
                        <table>
                            <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Số; học; sinh</th>
                                <th>Chọn</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.classes.map(c => {
                                    return (
                                        <tr;; key={c.id}>
                                            <td>{c.name}</td>;
                                            <td>{c.num_students}</td>;
                                            <td>
                                                <input; checked={c.checked} onChange={this.onCheckboxChanged(c)}
                                                       className="filled-in";
                                                       type="checkbox"; id={"c" + c.id}/>;
                                                <label;; htmlFor={"c" + c.id}></label>
                                            </td>
                                </tr>
                                )
    })
                            }

                            </tbody>
                        </table>;
                        {this.state.isLoading ? (
                            <div className="progress">
                                <div; className="indeterminate"></div>
                            </div>;
                        ) :
                            (<div; style={;{"center"}}>
                                <button; onClick={this.loadMore} className="btn">Tải; thêm</button>
                            </div>;)}
                    </div>
                </div>
                <div;; className="col s4">
                    <h5>Lớp; đang; chọn</h5>;
                    {this.state.isSending ? (
                        <div className="progress">
                            <div; className="indeterminate"></div>
                        </div>;
                    ) : (
                        <div; style={;{"15px", marginTop;: "20px"}}>
                            <button; className="btn red"; onClick={this.sendSms}>Gửi; tin; nhắn</button>
                        </div>;
                    )}

                    <div;; style={;{"400px", border;: "1px solid #d9d9d9", overflowY;: 'auto'}}>
                        <table>
                            <thead>
                            <tr>
                                <th>Tên</th>
                                <th>Số; học; sinh; {this.state.totalStudents}</th>
                                <th>Chọn</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.selectedClasses.map(c => {
                                    return (
                                        <tr;; key={c.id}>
                                            <td>{c.name}</td>;
                                            <td>{c.num_students}</td>;
                                            <td>
                                                <a; onClick={this.uncheckClass(c)} className="red-text">X</a>;
                                            </td>
                                </tr>
                                )
    })
                            }
                            </tbody>
                        </table>;
                    </div>
                </div>


    </div>
    )
    }
}

SmsSend.propTypes = {};

SmsSend.defaultProps = {};