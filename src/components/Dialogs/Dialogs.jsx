import { NavLink } from 'react-router-dom';
import d from './Dialogs.module.css'

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;
    let activClass = ({ isActive }) => isActive ? d.active : d.dialog;
    return (
        <div className={d.dialog + ' ' + d.active}>
            <NavLink to={path} className={activClass}>{props.name}</NavLink>
        </div>
    )
}

const Message = (props) => {
    return (
        <div className={d.message}> {props.message} </div>
    )
}

const Dialogs = (props) => {
    return (
        <div className={d.dialogs}>
            <div className={d.dialogItems}>
                <DialogItem name="First" id="1" />
                <DialogItem name="Second" id="2" />
                <DialogItem name="Third" id="3" />
                <DialogItem name="Forth" id="4" />
                <DialogItem name="Fifth" id="5" />              
            </div>
            <div className={d.messages}>
                <Message message="Hi" />
                <Message message="How are you?" />
                <Message message="Yo" />    
            </div>
        </div>
    )
}

export default Dialogs;