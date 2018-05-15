// import React from 'react';
// import PropTypes from 'prop-types';
// import {Popover, Overlay} from "react-bootstrap";
// import * as ReactDOM from "react-dom";
//
//
// class PopoverOverlay extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             show: false,
//         };
//         this.toggle = this.toggle.bind(this);
//         this.toggleOff = this.toggleOff.bind(this);
//     }
//
//     toggle() {
//         this.setState({show: !this.state.show});
//     }
// toggleOff() {
//         this.setState({show: false});
//     }
//
//     render() {
//         const customer = this.props.customer;
//         return (
//             <div style={{  position: 'relative' }}  className="table-hover dt-bootstrap" >
//                 <a ref="target" onClick={this.toggle} onMouseOver = {this.toggle} onMouseOut = {this.toggleOff}>
//                     {customer.count_groups + " nhóm"}
//                 </a>
//
//
//                 <Overlay
//                     show={this.state.show}
//                     onHide={() => this.setState({show: false})}
//                     placement="left"
//                     container={this}
//                     target={() => ReactDOM.findDOMNode(this.refs.target)}
//                 >
//                     <Popover title="Nhóm khách hàng">
//                         {customer.groups.map((group) => {
//                             return (<div key={group.id}>{group.name}</div>);
//                         })}
//                     </Popover>
//                 </Overlay>
//             </div>
//
//         );
//     }
// }
//
// PopoverOverlay.propTypes = {
//     customer: PropTypes.object,
// };
//
//
// export default PopoverOverlay;