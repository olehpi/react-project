const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogsData: [
        { id: 1, name: 'First' },
        { id: 2, name: 'Second' },
        { id: 3, name: 'Third' },
        { id: 4, name: 'Forth' },
        { id: 5, name: 'Fifth' }
    ],
    messagesData: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' }
    ],
    newMessageBody: 'Enter your message'
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_BODY: 
            return {
                ...state,
                newMessageBody: action.body
            }
        case SEND_MESSAGE: 
            return {
                ...state,
                newMessageBody: '',
                messagesData: [...state.messagesData, { id: 8, message: state.newMessageBody }]
            };
        default:
            return state;
    }
}

export const sendMessageCreator = () => ({
    type: SEND_MESSAGE 
});

export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogsReducer;