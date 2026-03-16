import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import creativeLogo from '../../assets/images/creative-logo.jpg';

export type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = (props) => {
    return <header className={s.header}>
        <img src={creativeLogo} />
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
