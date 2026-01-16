import d from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../store/dialogs-reducer';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
    let state = props.store.getState().messagesPage;
    const onSendMessageClick = () => {
        props.store.dispatch(sendMessageCreator())
    };
    const onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }     

    return <Dialogs updateNewMessageBody = {onNewMessageChange} sendMessage={onSendMessageClick} messagesPage = {state}/>
}

export default DialogsContainer;