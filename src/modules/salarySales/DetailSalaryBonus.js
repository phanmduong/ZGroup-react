import React from "react";
import {observer} from "mobx-react";
import {Modal} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import {dotNumber} from "../../helpers/helper";

@observer
class DetailSalaryBonus extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.store = this.props.store;
    }

    render() {

        return (
            <Modal
                show={this.store.openModalDetailSalaryBonus}
                onHide={() => this.store.openModalDetailSalaryBonus = false}
            >
                <Modal.Header closeButton={true}>
                    <h4 className="modal-title">Chi tiết lương thưởng</h4>
                </Modal.Header>
                < Modal.Body>
                    {this.store.isLoadingDetailSalaryBonus ? <Loading/> :
                        <div>
                            {
                                this.store.detailSalaryBonus.map((bonus, index) => {
                                    return (
                                        <div key={index} className="margintop-10 margin-bottom-20">
                                            <div className="flex flex-row flex-space-between">
                                                <div style={{color: 'black'}}>{bonus.note}</div>
                                                <div className="bold">{dotNumber(bonus.amount)}đ</div>
                                            </div>
                                            <div className="bold">
                                                Được thêm bởi {bonus.accountant.name}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                            <div className="modal-footer" style={{borderTop: '1px solid #e5e5e5'}}>
                                <div className="flex flex-row flex-space-between bold">
                                    <div>Tổng</div>
                                    <div>{dotNumber(this.store.totalBonus)}đ</div>
                                </div>
                            </div>
                        </div>

                    }
                </Modal.Body>
            </Modal>
        );
    }
}

DetailSalaryBonus.propTypes = {};

export default DetailSalaryBonus;

