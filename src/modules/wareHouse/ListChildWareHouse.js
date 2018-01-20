import React from 'react';
import PropTypes from 'prop-types';


class ListChildWareHouse extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead className="text-rose">
                    <tr>
                        <th>Tên kho</th>
                        <th>Địa chỉ kho</th>
                        <th>Tên cơ sở</th>
                        <th>Địa chỉ cơ sở</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.wareHousesList.map((wareHouse) => {
                        return (
                            <tr key={wareHouse.id}>
                                <td>{wareHouse.name}</td>
                                <td>{wareHouse.location}</td>
                                <td>{wareHouse.base ? wareHouse.base.name : 'Chưa có '}</td>
                                <td>{wareHouse.base ? wareHouse.base.address : 'Chưa có'}</td>
                                <td style={{width: 70}}>
                                    <div className="btn-group-action">
                                        <a style={{color: '#878787'}}
                                           type="button"
                                           onClick={() => {
                                               this.props.openModal(wareHouse, true);
                                           }}
                                        ><i
                                            className="material-icons">edit</i></a>
                                        <a style={{color: '#878787'}}
                                           type="button"
                                        ><i
                                            className="material-icons"
                                            onClick={() => {
                                                this.props.deleteWareHouse(wareHouse.id, wareHouse.name);
                                            }}
                                        >delete</i>
                                        </a>
                                    </div>
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

ListChildWareHouse.propTypes = {
    wareHousesList: PropTypes.array,
    openModal: PropTypes.func,
    deleteWareHouse: PropTypes.func,
};
export default ListChildWareHouse;