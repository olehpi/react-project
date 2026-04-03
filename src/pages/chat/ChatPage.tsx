import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStateType } from "../../store/redux-store";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../store/chat-reducer";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: React.FC<{}> = () => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC<{}> = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    return <div style={{ height: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => <Message message={message} key={index} />)}
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
    return <div>
        <img src={message.photo} alt="User" height="30"/>
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
}

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message));
        setMessage("");
    }

    return <div>
        <div><textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."></textarea></div>
        <div>
            <button onClick={sendMessageHandler} disabled={false}>Send</button>
        </div>
    </div>
}

export default ChatPage;
