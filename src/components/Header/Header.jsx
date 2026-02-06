import { NavLink } from 'react-router-dom';
import s from './Header.module.css';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxMOQxU2IdDkXh_4DnrcAsfpR7UCrIozgMkg&s' />
        <div className={s.loginBlock}>
            {
                props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={'/login'} replace>Login</NavLink>
            }
        </div>
    </header>
}

export default Header;
