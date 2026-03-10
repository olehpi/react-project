import { InferActionsTypes } from "./redux-store";

const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessagegType = {
    id: number
    message: string
}

let initialState = {
    dialogsData: [
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
        { id: 3, name: 'Third' },
        { id: 4, name: 'Forth' },
        { id: 5, name: 'Fifth' }
    ] as Array<DialogType>,
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' }
    ] as Array<MessagegType>
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case SEND_MESSAGE: 
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 8, message: action.newMessageBody }]
            };
        default:
            return state;
    }
}

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({ type: SEND_MESSAGE, newMessageBody } as const)
}

export default dialogsReducer;