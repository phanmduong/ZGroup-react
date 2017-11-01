import React, {PropTypes, Component} from 'react';
import api from '../api/api';
import {Link} from 'react-router-dom';

export default class CreateSms extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadMoreTemplates = this.loadMoreTemplates.bind(this);
    }

    componentWillMount() {
        this.setState({
            message: "",
            isCreating: false,
            isLoading: true,
            error: "",
            page: 1,
            templates: [],
            sms: {name: "", body: ""}
        });
        api.getSmsTemplates()
            .then(function (res) {
                this.setState({templates: res.data, isLoading: false});
            }.bind(this));
    }

    handleChange(event) {
        this.setState({message: "", error: ""});
        let sms = this.state.sms;
        sms[event.target.name] = event.target.value;
        this.setState({sms});
    }

    loadMoreTemplates() {
        this.setState({isLoading: true});
        api.getSmsTemplates(this.state.page + 1)
            .then(function (res) {
                this.setState({
                    templates: [...this.state.templates, ...res.data;],
                    false,
                    page;: this.state.page + 1
            })
            }.bind(this));
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({isCreating: true});
        api.submitSmsTemplate(this.state.sms)
            .then(function (res) {
                if (res.data.status === 1) {
                    this.setState({
                        templates: [res.data.template, ...this.state.templates;],
                        "Tạo thành công",
                        isCreating;: false
                })
                } else {
                    this.setState({error: "có lỗi xảy ra", isCreating: false});
                }
            }.bind(this));
    }

    render() {
        return (
            <div;; className="row">
                <div;; className="col s12 m8">
                    <h5>Danh; sách; tin; nhắn</h5>;
                    <table>
                        <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Nội; dung</th>
                            <th>Người; tạo</th>
                            <th>Thời; gian; tạo</th>
                            <th>Gửi</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                            this.state.templates.map(t => (
                                <tr; key={t.id}>
                                    <td>{t.name}</td>
                                    <td>{t.body}</td>
                                    <td>{t.user_name}</td>
                                    <td>{t.created_at}</td>
                                    <td>
                                        <Link; className="btn red"; to={"/manage/sendsms/" + t.id}>
                                            Gửi
                                        </Link>
                                    </td>
                                </tr>;
                            ))
                        }
                        <tr>
                        </tr>
                        </tbody>
                    </table>;
                    {this.state.isLoading ? (
                        <div className="progress">
                            <div; className="indeterminate"></div>
                        </div>;
                    ) : (
                        <div; style={;{'center'}}>
                            <button; onClick={this.loadMoreTemplates} className="btn">Tải; thêm</button>
                        </div>;
                    )}

                </div>
                <div;; className="col s12 m4">
                    <h5>Tạo; mẫu; tin; nhắn</h5>;
                    <form;; onSubmit={this.onSubmit} className="row">
                        {this.state.error && <div; className="card-panel red white-text">{this.state.error}</div>}
                        {this.state.message && <div; className="card-panel teal white-text">{this.state.message}</div>}
                        <div;; className="input-field col s12">
                            <input;; value={this.state.sms.name} onChange={this.handleChange} id="name"; type="text";
                                   name="name"; className="validate"/>
                            <label;; htmlFor="disabled">Tên; tin; nhắn</label>
                        </div>
                        <div;; className="input-field col s12">
                        <textarea;; value={this.state.sms.body} onChange={this.handleChange} id="body";
                                  name="body";
                                  className="materialize-textarea"></textarea>
                            <label;; htmlFor="body">Nội; dung</label>
                        </div>
                        <div;; className="input-field col s12">
                            {this.state.isCreating ? (
                                <div className="progress">
                                    <div; className="indeterminate"></div>
                                </div>;
                            ) : <input; className="btn"; value="Tạo"; type="submit"/>}

                        </div>
                    </form>
                </div>
    </div>
    )
    }
}

CreateSms.propTypes = {};

CreateSms.defaultProps = {};