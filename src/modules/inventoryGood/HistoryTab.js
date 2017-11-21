import React from 'react';
import PropTypes from 'prop-types';

class HistoryTab extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Chứng từ</th>
                        <th>Ngày</th>
                        <th>Diễn giải</th>
                        <th>Nhập</th>
                        <th>Xuất</th>
                        <th>Tồn</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.histories && this.props.histories.map((history, id) => {
                            return (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{history.code}</td>
                                    <td>{history.created_at}</td>
                                    <td>{history.note}</td>
                                    <td>{history.import_quantity}</td>
                                    <td>{history.export_quantity}</td>
                                    <td>{history.remain}</td>
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

HistoryTab.propTypes = {
    histories: PropTypes.array.isRequired,
    inventoryInfo: PropTypes.object.isRequired
};

export default HistoryTab;