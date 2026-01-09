import { rerenderTree } from "../render";

let state = {
    profilePage: {
        postsData: [
            { id: 1, message: 'Hi, how are you?', likesCount: 12 },
            { id: 2, message: "It's my first post", likesCount: 11 }
        ]
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

export let addPost = (postMessage) => {
    let newPost = {
        id: 2,
        message: postMessage,
        likesCount: 0
    };
    state.profilePage.postsData.push(newPost);
    rerenderTree(state);
}

export default state;
