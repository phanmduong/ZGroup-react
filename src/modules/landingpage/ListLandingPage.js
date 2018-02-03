import React from 'react';
import PropTypes from 'prop-types';
import {BASE_URL} from '../../constants/env';
import ButtonGroupAction from "../../components/common/ButtonGroupAction";


class ListLandingPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th>Tên</th>
                        <th>Đường dẫn</th>
                        <th>Người tạo</th>
                        <th>Thời gian tạo</th>
                        <th>Thời gian sửa</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.landingPages && this.props.landingPages.map((landingPage, index) => {
                        const path = landingPage.path ? BASE_URL + "/landing-page/" + landingPage.path : '';
                        return (
                            <tr key={index}>
                                <td>{landingPage.name}</td>
                                <td>{landingPage.path ? <a href={path}>{path}</a> : ''}</td>
                                <td>{landingPage.user ? landingPage.user.name : ''}</td>
                                <td>{landingPage.created_at}</td>
                                <td>{landingPage.updated_at}</td>
                                <td>
                                    <ButtonGroupAction
                                        object={landingPage}
                                        delete={this.props.deleteLandingPage}
                                        edit={() => {
                                            window.open("/build-landing-page/" + landingPage.id);
                                        }}
                                    >
                                        {
                                            landingPage.path &&
                                            <a href={path}>
                                                <i className="material-icons">remove_red_eye</i>
                                            </a>
                                        }

                                    </ButtonGroupAction>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

ListLandingPage.propTypes = {
    landingPages: PropTypes.array.isRequired,
    deleteLandingPage: PropTypes.func.isRequired
};

export default ListLandingPage;
