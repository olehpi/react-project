import { actions, followThunkCreator, unfollowThunkCreator } from "./users-reducer";
import { usersAPI } from "../api/users-api";
import { ResultCodesEnum } from "../api/api";
import { vi } from "vitest";

vi.mock("../api/users-api");

const dispatchMock = vi.fn();
const getStateMock = vi.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    (usersAPI.follow as any).mockClear();
    (usersAPI.unfollow as any).mockClear(); 
});

test("success follow thunk", async () => {
    (usersAPI.follow as any).mockResolvedValue({
        resultCode: ResultCodesEnum.Success
    });

    const thunk = followThunkCreator(1);

    await thunk(dispatchMock, getStateMock, undefined);

    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
});

test("success unfollow thunk", async () => {

    (usersAPI.unfollow as any).mockResolvedValue({
        resultCode: ResultCodesEnum.Success
    });

    const thunk = unfollowThunkCreator(1);

    await thunk(dispatchMock, getStateMock, undefined);

    expect(dispatchMock).toHaveBeenCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, 1));
});