import { BaseThunkType, InferActionsTypes } from './redux-store';
import { chatAPI, ChatMessageType } from '../api/chat-api';
import { Dispatch } from 'redux';

const MESSAGES_RECEIVED = 'MESSAGES_RECEIVED';


let initialState = {
    messages: [] as ChatMessageType[]
};

type ActionsType = InferActionsTypes<typeof actions>
type InitialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType>

const chatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state;
    }
}

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => (
        {
            type: MESSAGES_RECEIVED, payload: { messages }
        } as const),
}

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages));
        }
    }
    return _newMessageHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
    chatAPI.stop();
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;
