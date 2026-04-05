import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, AppStateType } from "../../store/redux-store";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../store/chat-reducer";
import React from "react";

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
    const status = useSelector((state: AppStateType) => state.chat.status);

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening());
        }
    }, []);
    return <div>
        {status === 'error' && <div>Some error occurred. Please refresh the page.</div>}
        <>
            <Messages />
            <AddMessageForm />
        </>
    </div>
}

const Messages: React.FC<{}> = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setAutoScroll] = useState(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setAutoScroll(true);
        } else {
            isAutoScroll && setAutoScroll(false);
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
        {messages.map((message, index) => <Message message={message} key={message.id} />)}
        <div ref={messagesAnchorRef}>   </div>
    </div>
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => {
    return <div>
        <img src={message.photo} alt="User" height="30" />
        <b>{message.userName}</b>
        <br />
        {message.message}
        <hr />
    </div>
})

const AddMessageForm: React.FC<{}> = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: AppStateType) => state.chat.status);

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
            <button onClick={sendMessageHandler} disabled={status !== 'ready'}>Send</button>
        </div>
    </div>
}

export default ChatPage;
