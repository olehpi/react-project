import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


let User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }: PropsType) => {
    return <div >
        <span>
            <div>
                <NavLink to={`/profile/${user.id}`}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>
            <div>
                <button
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                        if (user.followed) {
                            unfollow(user.id);
                        } else {
                            follow(user.id);
                        }
                    }}
                >
                    {user.followed ? "Unfollow" : "Follow"}
                </button>
            </div>
        </span>
        <span>
            <span>
                <div> {user.name} </div>
                <div> {user.status} </div>
            </span>
        </span>
        <span>
            <div> {user.location?.country || "Country not specified"} </div>
            <div> {user.location?.city || "City not specified"} </div>
        </span>
    </div>
}

export default User;