import Paginator from "../common/paginator/Paginator";
import User from "./User";
import { UserType } from "./../../types/types"
import { FilterType } from "../../store/users-reducer";
import { UsersSearchForm } from "./UsersSearchForm";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }: PropsType) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
        <UsersSearchForm onFilterChanged={props.onFilterChanged} />
        <Paginator currentPage={currentPage} totalItemsCount={totalUsersCount} pageSize={pageSize} onPageChanged={onPageChanged} />
        <div>
            {
                users.map(u => <User
                    user={u}
                    followingInProgress={props.followingInProgress}
                    key={u.id}
                    unfollow={props.unfollow}
                    follow={props.follow}
                />)
            }
        </div>
    </div>;
}

export default Users;