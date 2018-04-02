import React from 'react';
import PropTypes from "prop-types";

class PasswordComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return(
                <div className="table-responsive">
                    <table className="table table-hover table-striped">
                        <thead className="text-rose">
                        <tr className="text-rose">
                            <th>Tên chức năng</th>
                            <th/>
                            <th/>
                            <th/>
                            <th/>
                            <th/>
                            <th/>
                            <th/>
                            <th>Sửa</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                           this.props.passwords && this.props.passwords.map((password, index) => {
                              return (
                                 <tr key={index}>
                                    <td>
                                        {password.name}
                                    </td>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td/>
                                    <td>
                                        <div className="btn-group-action">
                                            <a data-toggle="tooltip" title="Sửa"
                                               type="button" rel="tooltip"
                                               onClick={() => this.props.showEditPasswordModal(password)}
                                            >
                                                <i  className="material-icons" style={{color:"rgba(197, 0, 0, 1)"}}>edit</i>
                                            </a>
                                        </div>
                                    </td>
                                 </tr>
                              );
                           })
                        }
                        </tbody>
                    </table>


                </div>
                );
                }
                }

                PasswordComponent.propTypes = {
                    showEditPasswordModal: PropTypes.func.isRequired,
                    passwords: PropTypes.array.isRequired,
                };

                export default PasswordComponent;