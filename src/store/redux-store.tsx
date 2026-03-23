import {applyMiddleware, combineReducers, createStore, Action} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer, { actions } from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import { thunk as thunkMiddleware, ThunkAction } from "redux-thunk"; 

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

/* 
*** Check redux devtools extension in browser and use it if available, otherwise use regular compose ***

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
*/

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppDispatch = typeof store.dispatch;

export default store;
