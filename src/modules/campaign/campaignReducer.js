import * as types from './CampaignActionTypes';
import initialState from '../../reducers/initialState';

export default function smsCampaignReducer(state = initialState.smsCampaign, action) {
	switch (action.type) {
		case types.TOGGLE_ADD_MESSAGE_MODAL:
			return {
				...state,
				addMessageModal: !state.addMessageModal
			};
		case types.TOGGLE_ADD_RECEIVER_MODAL:
			return {
				...state,
				addReceiverModal: !state.addReceiverModal
			};

		case types.BEGIN_LOAD_ALL_MESSAGE:
			return {
				...state,
				isLoadingMessage: true
			};
		case types.LOAD_ALL_MESSAGE_SUCCESS:
			return {
				...state,
				allMessage: action.allMessage,
				currentPageMessage: action.currentPageMessage,
				limitMessage: action.limitMessage,
				totalCountMessage: action.totalCountMessage,
				totalPagesMessage: action.totalPagesMessage,
				isLoadingMessage: false,
				campaignName: action.campaignName,
				campaign_needed_quantity: action.campaign_needed_quantity
			};
		case types.LOAD_TEMPLATE_SUCCESS:
			return {
				...state,
				template_types: action.template_types
			};
		case types.UPLOAD_MESSAGE:
			return {
				...state,
				message: action.message
			};

		case types.BEGIN_SAVE_MESSAGE:
			return {
				...state,
				isSavingMessage: true,
				upMessage: true
			};
		case types.SAVE_MESSAGE_SUCCESS: {
			let a = state.template_types.filter((type) => type.id == action.message.sms_template_type_id);
			let message = {
				...action.message,
				sms_template_type: {
					id: action.message.sms_template_type_id,
					name: a[0].name
				}
			};
			return {
				...state,
				isSavingMessage: false,
				upMessage: false,
				addMessageModal: false,
				allMessage: [ message, ...state.allMessage ]
			};
		}
		case types.EDIT_MESSAGE_SUCCESS: {
			let messages = state.allMessage.map((message) => {
				if (message.template_id === action.message.template_id) {
					let a = state.template_types.filter(
						(type) => type.id == action.message.sms_template_type_id
					);
					return {
						...message,
						name: action.message.name,
						content: action.message.content,
						sms_template_type_id: action.message.sms_template_type_id,
						send_time: action.message.send_time,
						sms_template_type: {
							id: action.message.sms_template_type_id,
							name: a[0].name,
							color: a[0].color
						}
					};
				}
				return message;
			});
			return {
				...state,
				addMessageModal: false,
				upMessage: false,
				allMessage: messages
			};
		}

		case types.BEGIN_LOAD_ALL_RECEIVER:
			return {
				...state,
				isLoadingReceiver: true
			};
		case types.LOAD_ALL_RECEIVER_SUCCESS:
			return {
				...state,
				allReceiver: action.allReceiver,
				currentPageReceiver: action.currentPageReceiver,
				limitReceiver: action.limitReceiver,
				totalCountReceiver: action.totalCountReceiver,
				totalPagesReceiver: action.totalPagesReceiver,
				isLoadingReceiver: false
			};
		case types.BEGIN_LOAD_RECEIVERS_MODAL:
			return {
				...state,
				isLoadingReceiversModal: true
			};
		case types.LOAD_RECEIVERS_MODAL_SUCCESS:
			return {
				...state,
				isLoadingReceiversModal: false,
				receiversModal: action.receiversModal,
				currentPageModal: action.currentPageModal,
				limitModal: action.limitModal,
				totalCountModal: action.totalCountModal,
				totalPagesModal: action.totalPagesModal
			};
		case types.LOAD_ALL_GENS:
			return {
				...state,
				gens: action.gens
			};
		case types.LOAD_ALL_CLASSES:
			return {
				...state,
				classes: action.classes
			};
		case types.TOGGLE_CHOOSE_RECEIVERS:
			return {
				...state,
				isChoosingReceivers: !state.isChoosingReceivers
			};
		// case types.TOGGLE_UPDATE_RECEIVERS_LIST:
		// 	return {
		//         ...state,
		//         isUpdatingReceivers: !state.isUpdatingReceivers
		// 	};
		case types.BEGIN_LOAD_HISTORY:
			return {
				...state,
				isLoadingHistory: true
			};
		case types.LOAD_HISTORY_SUCCESS:
			return {
				...state,
				isLoadingHistory: false,
				history: action.history,
				currentPageHistory: action.currentPageHistory,
				limitHistory: action.limitHistory,
				totalCountHistory: action.totalCountHistory,
				totalPagesHistory: action.totalPagesHistory
			};
		case types.BEGIN_LOAD_HISTORY_USER_MODAL:
			return {
				...state,
				isLoadingHistoryModal: true
			};
		case types.LOAD_HISTORY_USER_MODAL_SUCCESS:
			return {
				...state,
				isLoadingHistoryModal: false,
				historyModal: action.historyModal,
				currentPageHistoryModal: action.currentPageHistoryModal,
				limitHistoryModal: action.limitHistoryModal,
				totalCountHistoryModal: action.totalCountHistoryModal,
				totalPagesHistoryModal: action.totalPagesHistoryModal,
				userHistoryDetail: action.userHistoryDetail
			};
		case types.TOGGLE_HISTORY_DETAIL_MODAL:
			return {
				...state,
				historyDetailModal: !state.historyDetailModal
			};
		default:
			return state;
	}
}
