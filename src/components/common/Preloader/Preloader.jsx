import preloader from "../../../assets/images/preloader.svg"
import styles from "./../../Users/Users.module.css";

const Preloader = (props) => {
    return <div style={{ background: 'blue' }}>
        <img className={styles.userPhoto} src={preloader} />
    </div>
}

export default Preloader;