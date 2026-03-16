import { NavLink } from 'react-router-dom';
import d from './../Dialogs.module.css'

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    let activClass = ({ isActive }: { isActive: boolean }) => isActive ? d.active : d.dialog;
    return (
        <div className={d.dialog + ' ' + d.active}>
            <NavLink to={path} className={activClass}>{props.name}</NavLink>
        </div>
    )
}

export default DialogItem;