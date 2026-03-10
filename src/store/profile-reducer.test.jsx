import profileReducer, { actions } from "./profile-reducer"
let action = actions.addPostActionCreator("action");
let state = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first posts', likesCount: 1 },
        { id: 3, message: 'Hi!', likesCount: 11 },
        { id: 4, message: 'Hello!', likesCount: 11 }
    ],
    profile: null,
    status: "",
    newPostText: ""
};

it('new post should be added', () => {
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(5);
});

it('new post should be added action', () => {
    let action = actions.addPostActionCreator("action");
    let newState = profileReducer(state, action);
    expect(newState.postsData[4].message).toBe("action");
});

it('after deleting length of messages should be decrement', () => {
    let action = actions.deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(3);
});

it('after deleting length length should not be decrement if id is incorrect', () => {
    let action = actions.deletePost(1000);
    let newState = profileReducer(state, action);
    expect(newState.postsData.length).toBe(4);
});
