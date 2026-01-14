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
            ]
        }
    },
    getState() {
        return this._state;
    },
    _callSubscriber(state) {
        console.log('State changed');
    },
    addPost() {
        let newPost = {
            id: 2,
            message: this._state.profilePage.newPostText,
            likesCount: 0
        };
        this._state.profilePage.postsData.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
    },
    updatePost(newPostText) {
        this._state.profilePage.newPostText = newPostText;
        this._callSubscriber(this._state);
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    }
};


export default store;
window.store = store;