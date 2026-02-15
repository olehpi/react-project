import Paginator from "../common/paginator/Paginator";
import User from "./User";

let Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return <div>
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