import * as types from './actionTypes';
import initialState from "../../reducers/initialState";

export default function smsCampaignReducer(state = initialState.smsCampaign, action) {
    switch (action.type) {
        case types.TOGGLE_ADD_MESSAGE_MODAL:
            return {
                ...state,
                addMessageModal: !state.addMessageModal,
            };
        case types.TOGGLE_ADD_RECEIVER_MODAL:
            return {
                ...state,
                addReceiverModal: !state.addReceiverModal,
            };


        case  types.BEGIN_LOAD_ALL_MESSAGE:
            return {
                ...state,
                isLoadingMessage: true,
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
                isSavingMessage:true,
                upMessage: true
            };
        case types.SAVE_MESSAGE_SUCCESS: {
            let a = state.template_types.filter(type=>
                (type.id == action.message.sms_template_type_id));
            let message = {
                ...action.message,
                sms_template_type: {
                    id: action.message.sms_template_type_id,
                    name: a[0].name,
                },
            };
            return {
                ...state,
                isSavingMessage:false,
                upMessage: false,
                addMessageModal: false,
                allMessage: [message, ...state.allMessage]
            };
        }
        case types.EDIT_MESSAGE_SUCCESS:
        {
            let messages = state.allMessage.map((message) => {
                if (message.template_id === action.message.template_id){
                    let a = state.template_types.filter(type=>
                        (type.id == action.message.sms_template_type_id));
                    return {
                        ...message,
                        name:action.message.name,
                        content:action.message.content,
                        sms_template_type_id: action.message.sms_template_type_id,
                        send_time:action.message.send_time,
                        sms_template_type: {
                            id: action.message.sms_template_type_id,
                            name: a[0].name,
                            color: a[0].color,
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


        case  types.BEGIN_LOAD_ALL_RECEIVER:
            return {
                ...state,
                isLoadingReceiver: true,
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
        default:
            return state;
    }
}
