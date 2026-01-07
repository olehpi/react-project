import { NavLink } from 'react-router-dom';
import d from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    return (
        <div className={d.dialogs}>
            <div className={d.dialogItems}>
                {props.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)}
            </div>
            <div className={d.messages}>
                {props.messagesData.map(message => <Message message={message.message} />)}
            </div>
        </div>
    )
}

export default Dialogs;