import usersReducer, { InitialStateType, actions } from "./users-reducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {
                id: 0, name: "Oleh 0", followed: false, photos: { small: null, large: null }, status: "status 0",
                location: { city: "City 0", country: "Country 0" }
            },
            {
                id: 1, name: "Oleh 1", followed: false, photos: { small: null, large: null }, status: "status 1",
                location: { city: "City 1", country: "Country 1" }
            },
            {
                id: 2, name: "Oleh 2", followed: true, photos: { small: null, large: null }, status: "status 2",
                location: { city: "City 2", country: "Country 2" }
            },
            {
                id: 3, name: "Oleh 3", followed: true, photos: { small: null, large: null }, status: "status 3",
                location: { city: "City 3", country: "Country 3" }
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: [] as Array<number>
    };
});

test("followSuccess", () => {
    const newState = usersReducer(state, actions.followSuccess(1));
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
});

test("unfollowSuccess", () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3));
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});
