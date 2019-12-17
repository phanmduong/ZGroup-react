import React from 'react';
import {observer} from "mobx-react";
import {Overlay} from "react-bootstrap";
import * as ReactDOM from "react-dom";
import {getShortName} from "../../helpers/helper";
import {isEmpty} from "../../helpers/entity/mobx";

@observer
class SelectEmployee extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.toggle = this.toggle.bind(this);
        this.state = {
            show: false
        };
    }

    toggle() {
        this.setState({show: !this.state.show});
    }

    onClickEmployee = (employee) => {
        this.props.store.selectedEmployee = employee;
        this.props.store.getTasks();
        this.props.store.getAnalyticsTasks();
        this.toggle();
    }


    render() {
        const {selectedEmployee, employees} = this.props.store;
        return (
            <div style={{position: "relative"}}>
                <div onClick={this.toggle} ref="target">
                        <div className="img-task" style={{backgroundImage: `url('${selectedEmployee.avatar_url}')`}}
                        >
                            {isEmpty(selectedEmployee.id)  && <i className="material-icons">people</i>}
                        </div>
                </div>
                <Overlay rootClose={true}
                         show={this.state.show}
                         onHide={() => this.setState({show: false})}
                         placement="bottom"
                         container={this}
                         target={() => ReactDOM.findDOMNode(this.refs.target)}>
                    <div className="kt-overlay task-select-employee">
                        <div style={{width: '180px'}}>
                            <div className="item-employee" style={{height: 60}}
                                 onClick={() => this.onClickEmployee({})}>
                                <div className="flex flex-row flex-align-items-center ">
                                    <div className="name">
                                        Tất cả
                                    </div>
                                </div>
                                {isEmpty(selectedEmployee.id) && <div className="dot"/>}
                            </div>
                            {employees && employees.map((employee) => {
                                return (
                                    <div className="item-employee" onClick={() => this.onClickEmployee(employee)}>
                                        <div className="flex flex-row flex-align-items-center ">
                                            <div className="img-task"
                                                 style={{backgroundImage: `url('${employee.avatar_url}')`}}
                                            />
                                            <div className="name">
                                                {employee.id == this.props.user.id ? "Tôi" : getShortName(employee.name)}
                                            </div>
                                        </div>
                                        {employee.id == selectedEmployee.id && <div className="dot"/>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Overlay>
            </div>
        );
    }
}


export default (SelectEmployee);