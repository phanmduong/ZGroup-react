import React from "react";
import Loading from "../../components/common/Loading";
import store from "./EvaluateContentsStore";
import Select from '../../components/common/Select';
import {observer} from "mobx-react";
import EvaluateContents from "./EvaluateContents";
import {Modal} from "react-bootstrap";
import EvaluateContentDetailContainer from "./detail/EvaluateContentDetailContainer";
import CheckinCheckoutContainer from "./CheckinCheckout/CheckinCheckoutContainer";

@observer
class EvaluateContentsContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        store.loadGens();
        store.loadBases();

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.params.salerId != nextProps.params.salerId) {
            store.salerId = nextProps.params.salerId;
            store.loadEvaluate();
        }
    }

    onChangeGen(value) {
        store.selectedGenId = value;
        store.loadEvaluate();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadEvaluate();
    }


    render() {
        return (
            <div>
                {store.isLoadingGen || store.isLoadingBase ?
                    <Loading/>
                    :
                    <div>

                        <div>
                            {!this.props.params.salerId &&
                            <div className="row">
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn khóa học'}
                                        options={store.gensData}
                                        value={store.selectedGenId}
                                        onChange={this.onChangeGen}
                                    />
                                </div>
                                <div className="col-sm-3 col-xs-3">
                                    <Select
                                        defaultMessage={'Chọn cơ sở'}
                                        options={store.basesData}
                                        value={store.selectedBaseId}
                                        onChange={this.onChangeBase}
                                    />
                                </div>

                            </div>
                            }
                            <EvaluateContents
                                store={store}
                                params={this.props.params}
                            />
                            <Modal show={store.showModalDetail}
                                   bsSize="large"
                                   onHide={() => {
                                       store.showModalDetail = false;
                                   }}>
                                <Modal.Body>
                                    {store.showModalDetail && <EvaluateContentDetailContainer
                                        gens={store.gens}
                                        selectedGenId={
                                            this.props.params.salerId ?
                                                store.selectedUser.start_gen_id :
                                                store.selectedGenId
                                        }
                                        user={store.selectedUser}
                                    />}
                                </Modal.Body>
                            </Modal>
                            <Modal show={store.showModalShift}
                                   bsSize="large"
                                   onHide={() => {
                                       store.showModalShift = false;
                                   }}>
                                <Modal.Body>
                                    {store.showModalShift && <CheckinCheckoutContainer
                                        gens={store.gens}
                                        selectedGenId={
                                            this.props.params.salerId ?
                                                store.selectedUser.start_gen_id :
                                                store.selectedGenId
                                        }
                                        user={store.selectedUser}
                                        shift_type={store.shift_type}
                                    />}
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                }
            </div>

        );
    }
}

EvaluateContentsContainer.propTypes = {};

export default EvaluateContentsContainer;
