import Paginator from "../common/paginator/Paginator";
import User from "./User";
import { FilterType, getUsersThunkCreator } from "../../store/users-reducer";
import { UsersSearchForm } from "./UsersSearchForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/redux-store";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../store/users-selectors";
import { useEffect } from "react";

export const Users = () => {

    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getUsersThunkCreator(currentPage, pageSize, filter))
    }, [])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter));
    };

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter));
    }

    const follow = (userId: number) => {
        dispatch(follow(userId));
    }

    const unfollow = (userId: number) => {
        dispatch(unfollow(userId));
    }

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} />
        <div>
            {
                users.map(u => <User
                    user={u}
                    followingInProgress={followingInProgress}
                    key={u.id}
                    unfollow={unfollow}
                    follow={follow}
                />)
            }
        </div>
    </div>;
}
