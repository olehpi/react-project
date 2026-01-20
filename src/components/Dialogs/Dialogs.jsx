import d from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
    let state = props.messagesPage;
    const dialogsElements = state.dialogsData.map(dialog => <DialogItem key={dialog.id} name={dialog.name} id={dialog.id} />);  
    const messagesElements = state.messagesData.map(message => <Message key={message.id} message={message.message} />);
    const newMessageBody = state.newMessageBody;
    
    const onSendMessageClick = () => {
        props.sendMessage()
    };

    const onNewMessageChange = (event) => {
        const body = event.target.value;
        props.updateNewMessageBody(body)
    }     

    return (
        <div className={d.dialogs}>
            <div className={d.dialogItems}>{dialogsElements}</div>
            <div className={d.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea
                        value={newMessageBody}
                        onChange={onNewMessageChange}
                        placeholder='Enter your message'
                    ></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;