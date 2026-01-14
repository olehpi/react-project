const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';


let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, message: 'Hi, how are you?', likesCount: 12 },
                { id: 2, message: "It's my first post", likesCount: 11 }
            ],
            newPostText: 'Add the post'
        },
        messagesPage: {
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
        }
    },
    _callSubscriber(state) {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    _addPost() {
        let newPost = {
            id: 2,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    _updatePost(newPostText) {
        this._state.profilePage.newPostText = newPostText;
        this._callSubscriber(this._state);
    },
    
    dispatch(action) {
        if (action.type === ADD_POST) {
            this._addPost();
        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._updatePost(action.newText);
        } if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.messagesPage.newMessageBody = action.body;
            this._callSubscriber(this._state);
        } if (action.type === SEND_MESSAGE) {
            let body = this._state.messagesPage.newMessageBody;
            this._state.messagesPage.newMessageBody = '';
            this._state.messagesPage.messagesData.push( { id: 7, message: body },);
            this._callSubscriber(this._state);
        }
    }
};

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });

export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });



export default store;
window.store = store;