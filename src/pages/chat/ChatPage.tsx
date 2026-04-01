import { useEffect, useState } from "react";

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
}

const ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
// const ws = new WebSocket("ws://localhost:3001");

const ChatPage: React.FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat : React.FC = () => {
    return <div>
        <Messages />
        <AddMessageForm />
    </div>
}

const Messages: React.FC = () => {

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    useEffect(() => {
        ws.addEventListener('message', (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages(prevMessage =>[...prevMessage, ...newMessages]);
        });

    }, []);
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

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState("");

    const sendMessage = () => {
        if (!message) {
            return;
        }
        ws.send(message);
        setMessage("");
    }

    return <div>
        <div><textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."></textarea></div>
        <div>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
}

export default ChatPage;
