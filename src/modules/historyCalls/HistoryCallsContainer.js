/**
 * Created by phanmduong on 9/8/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as historyCallActions from './historyCallActions';
import PropTypes from 'prop-types';
//import _ from 'lodash';
import Loading from '../../components/common/Loading';
import ListCall from './ListCall';
import Search from '../../components/common/Search';
import Pagination from '../../components/common/Pagination';

class HistoryCallsContainer extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			page: 1,
			callerId: '',
			query: ''
		};
		this.timeOut = null;
		this.customersSearchChange = this.customersSearchChange.bind(this);
		this.loadOrders = this.loadOrders.bind(this);
	}

	componentWillMount() {
		if (this.props.params.callerId) {
			this.setState({
				callerId: this.props.params.callerId
			});
			this.props.historyCallActions.historyCalls(1, this.props.params.callerId, null);
		} else {
			this.props.historyCallActions.historyCalls();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.params.callerId !== this.props.params.callerId) {
			this.setState({
				callerId: nextProps.params.callerId
			});
			this.props.historyCallActions.historyCalls(1, nextProps.params.callerId, null);
		}
	}

	customersSearchChange(value) {
		this.setState({
			query: value,
			page: 1
		});
		if (this.timeOut !== null) {
			clearTimeout(this.timeOut);
		}
		this.timeOut = setTimeout(
			function() {
				this.props.historyCallActions.historyCalls(this.state.page, this.state.callerId, value);
			}.bind(this),
			500
		);
	}

	loadOrders(page = 1) {
		this.setState({ page: page });
		this.props.historyCallActions.historyCalls(page, this.state.callerId, this.state.query);
	}

	render() {
		let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
		let end =
			this.props.currentPage < this.props.totalPages
				? this.props.currentPage * this.props.limit
				: this.props.totalCount;

		return (
			<div className="container-fluid">
				<div className="card" mask="purple">
					<img className="img-absolute"/>
					<div className="card-content">

							<h5 className="card-title">
								<strong style={{ marginLeft: 6 }}>Lịch sử gọi</strong>
							</h5>
						<div className="flex-row flex flex-wrap" style={{marginTop: '8%'}}>

						<Search
								onChange={this.customersSearchChange}
								value={this.state.query}
								className="round-white-seacrh"
								placeholder="Tên, phone, email, note"
							/>
						</div>


					</div>
				</div>
				{this.props.isLoading ? (
					<Loading />
				) : (
					<div>
						<ListCall teleCalls={this.props.teleCalls} />
					</div>
				)}
				<div className="row float-right">
					<div
						className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
						style={{ textAlign: 'right' }}>
						<b style={{ marginRight: '15px' }}>
							Hiển thị kêt quả từ {first}
							- {end}/{this.props.totalCount}
						</b>
						<br />
						<Pagination
							totalPages={this.props.totalPages}
							currentPage={this.props.currentPage}
							loadDataPage={this.loadOrders}
						/>
					</div>
				</div>
			</div>
		);
	}
}

HistoryCallsContainer.propTypes = {
	currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
	teleCalls: PropTypes.array.isRequired,
	isLoading: PropTypes.bool.isRequired,
	historyCallActions: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
	params: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		currentPage: state.historyCalls.currentPage,
        totalPages: state.historyCalls.totalPages,
        totalCount: state.historyCalls.totalCount,
        limit: state.historyCalls.limit,
		teleCalls: state.historyCalls.teleCalls,
		isLoading: state.historyCalls.isLoading
	};
}

function mapDispatchToProps(dispatch) {
	return {
		historyCallActions: bindActionCreators(historyCallActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryCallsContainer);
