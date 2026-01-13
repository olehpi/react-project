let rerenderTree = (state) => {
    console.log('State changed');
};

let state = {
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
};

window.state = state;


export let addPost = () => {
    let newPost = {
        id: 2,
        message: state.profilePage.newPostText,
        likesCount: 0
    };
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostText = '';
    rerenderTree(state);
}

export let updatePost = (newPostText) => {
    state.profilePage.newPostText = newPostText;
    rerenderTree(state);
}

export let subscribe = (observer) => {
    rerenderTree = observer;
}

export default state;
