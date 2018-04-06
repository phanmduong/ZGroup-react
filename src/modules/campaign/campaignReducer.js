import * as types from './actionTypes';
import initialState from "../../reducers/initialState";

export default function smsCampaignReducer(state = initialState.smsCampaign, action) {
    switch (action.type) {
        case  types.BEGIN_LOAD_ALL_MESSAGE:
            return {
                ...state,
                isLoading: true,
            };
        case types.TOGGLE_ADD_MESSAGE_MODAL:
            return {
                ...state,
                addMessageModal: !state.addMessageModal,
            };
        case types.UPLOAD_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        case types.TOGGLE_ADD_RECEIVER_MODAL:
            return {
                ...state,
                addReceiverModal: !state.addReceiverModal,
            };
        case types.BEGIN_SAVE_MESSAGE:
            return {
                ...state,
                upMessage: true
            };
        case types.SAVE_MESSAGE_SUCCESS: {
            let message = {
                ...action.message,
                sent_quantity: 0,
                needed_quantity: 0,
                sms_template_type: {
                    id: action.message.sms_template_type_id,
                    name: state.template_types[action.message.sms_template_type_id - 1].name
                },
            };
            return {
                ...state,
                upMessage: false,
                addMessageModal: false,
                allMessage: [message, ...state.allMessage]
            };
        }

        case types.LOAD_TEMPLATE_SUCCESS:
            return {
                ...state,
                template_types: action.template_types
            };
        case types.LOAD_ALL_MESSAGE_SUCCESS:
            return {
                ...state,
                allMessage: action.allMessage,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,
                totalPages: action.totalPages,
                isLoading: false
            };
        case types.EDIT_MESSAGE_SUCCESS:
        {
            let messages = state.allMessage.map((message) => {
                if (message.template_id === action.message.template_id)
                    return {
                        ...message,
                        name:action.message.name,
                        content:action.message.content,
                        sms_template_type_id: action.message.sms_template_type_id,
                        send_time:action.message.send_time,
                        sent_quantity: 0,
                        needed_quantity: 0,
                        sms_template_type: {
                            id: action.message.sms_template_type_id,
                            name: state.template_types[action.message.sms_template_type_id - 1].name
                        }
                    };
                return message;
            });
            return {
                ...state,
                addMessageModal: false,
                upMessage: false,
                allMessage: messages
            };
        }
        default:
            return state;
    }
}
