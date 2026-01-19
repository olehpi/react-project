import { sendMessageCreator, updateNewMessageBodyCreator } from '../../store/dialogs-reducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';

const DialogsContainer = () => {
    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().messagesPage;
                    const onSendMessageClick = () => {
                        store.dispatch(sendMessageCreator())
                    };
                    const onNewMessageChange = (body) => {
                        store.dispatch(updateNewMessageBodyCreator(body));
                    }
                    return <Dialogs updateNewMessageBody={onNewMessageChange}
                        sendMessage={onSendMessageClick}
                        messagesPage={state} />
                }
            }
        </StoreContext.Consumer>
    )
}

export default DialogsContainer;