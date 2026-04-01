import Paginator from "../common/paginator/Paginator";
import User from "./User";
import { FilterType, getUsersThunkCreator } from "../../store/users-reducer";
import { UsersSearchForm } from "./UsersSearchForm";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/redux-store";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from "../../store/users-selectors";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


type QueryParamsType = {
    term?: string
    friend?: string
    page?: string
}

export const Users = () => {

    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const parsed: QueryParamsType = {
            term: params.get("term") ?? undefined,
            friend: params.get("friend") ?? undefined,
            page: params.get("page") ?? undefined,
        };
        let actualPage = currentPage;
        let actualFilter = filter;

        if(!!parsed.page) {
            actualPage = Number(parsed.page);
        }

        if(!!parsed.term) {
            actualFilter = {...actualFilter, term: parsed.term as string};
        }

        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
        }   
        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {

        const params = new URLSearchParams();
        if(!!filter.term) params.set("term", filter.term);
        if(filter.friend !== null) params.set("friend", String(filter.friend));
        if(currentPage !== 1) params.set("page", String(currentPage));

        const search = params.toString();
        navigate({
            pathname: "/developers",
            search: search ? `?${search}` : "",
        });
    }, [filter, currentPage])

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
