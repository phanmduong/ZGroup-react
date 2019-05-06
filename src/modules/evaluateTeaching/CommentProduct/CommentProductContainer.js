import React from "react";
import Loading from "../../../components/common/Loading";
import store from "./CommentProductStore";
import Select from '../../../components/common/Select';
import {observer} from "mobx-react";
import {validateLinkImage} from "../../../helpers/helper";
import * as helper from "../../../helpers/helper";

@observer
class CommentProductContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1
        }
    }

    componentWillMount() {
        this.store = new store(this.props.gens, this.props.selectedTeaching, this.props.selectedGenId, this.props.user);
        this.store.loadData();
    }


    onChangeGen = (value) => {
        this.store.selectedGenId = value;
        this.store.loadData();
    }

    render() {
        return (
            <div>
                {
                    this.store.gens && this.store.gens.length > 0 &&
                    <div className="flex flex-justify-content-center">
                        <div style={{width: 200}}>
                            <Select
                                defaultMessage={'Chọn khóa học'}
                                options={this.store.gensData}
                                value={this.store.selectedGenId}
                                onChange={this.onChangeGen}
                            />
                        </div>
                    </div>
                }
                <div>
                    <div className="flex flex-justify-content-center flex-col flex-align-items-center"
                         style={{marginBottom: 20}}>
                        <div className="img"
                             style={{
                                 background: 'url(' + validateLinkImage(this.store.user.avatar_url) + ') center center / cover',
                                 width: '130px',
                                 height: '130px',
                                 borderRadius: '50%',
                                 margin: '20px 0'
                             }}
                        />
                        <div className="bold uppercase" style={{fontSize: '20px'}}>
                            {this.store.user.name}
                        </div>
                        <div>Nhận xét bài viết</div>
                        <br/>
                    </div>
                    {this.store.isLoading ? <Loading/> :
                        <div>
                            <ul className="nav nav-pills nav-pills-rose" data-tabs="tabs">
                                <li className={this.state.tab === 1 ? "active nav-item" : "nav-item"}>
                                    <a style={{width: 150}} onClick={() => this.setState({tab: 1})}>
                                        Đúng giờ ({this.store.totalDataValid})
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                                <li className={this.state.tab === 2 ? "active nav-item" : "nav-item"}>
                                    <a style={{width: 150}} onClick={() => this.setState({tab: 2})}>
                                        Vi phạm ({this.store.totalDataInvalid})
                                        <div className="ripple-container"/>
                                    </a>
                                </li>
                            </ul>
                            {
                                (this.state.tab == 1 ? this.store.getDataValid : this.store.getDataInvalid).map((classData, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="flex-row-center" style={{margin: '20px 0'}}>
                                                <img
                                                    className="image-class-attendance-class-dashboard"
                                                    src={classData.icon_url}/>
                                                <div className="text-h5">
                                                    <strong>{classData.name}</strong>
                                                </div>
                                            </div>
                                            {
                                                classData.comments.map((comment) => {
                                                    return (
                                                        <div className="flex-row-center" style={{margin: '30px 30px'}}>
                                                            <div className="flex flex-col" style={{flex: 1}}>
                                                                <div className="flex-row-center flex-space-between">

                                                                    <div
                                                                        className="bold">{comment.content}</div>

                                                                    <a href={"https://colorme.vn/post/" + comment.product_slug}
                                                                       target="_blank"
                                                                       style={{marginLeft: 40}}>
                                                                        <div
                                                                            style={{
                                                                                background: `url('${helper.validateLinkImage(comment.thumb_url)}') center center / cover`,
                                                                                width: 100,
                                                                                height: 70,
                                                                                display: 'flex',
                                                                                flex: 1
                                                                            }}>
                                                                            >
                                                                        </div>
                                                                    </a>
                                                                </div>
                                                                <div className="note">
                                                                    {Math.round(comment.time)} giờ trước
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }

                </div>

            </div>

        );
    }
}

CommentProductContainer.propTypes = {};

export default CommentProductContainer;

