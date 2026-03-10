import { getAuthUserData } from './auth-reducer';
import { InferActionsTypes } from './redux-store';

let initialState = {
    initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>

const appReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "SET_INITIALIZED":
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({ type: "SET_INITIALIZED" as const }),
}

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;
