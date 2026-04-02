import { use, useEffect, useState } from "react";

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

const Chat: React.FC = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    useEffect(() => {

        let tempWs: WebSocket;
        const closeHendler = () => {
            console.log("WebSocket closed. Attempting to reconnect...");
            setTimeout(createChannel, 3000);
        }

        function createChannel() {
            tempWs?.removeEventListener('close', closeHendler);
            tempWs?.close();
            tempWs = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
            //  let tempWs = new WebSocket("ws://localhost:3001");
            tempWs.addEventListener('close', closeHendler);
            setWs(tempWs);
        };
        
        createChannel();

        return () => {
            tempWs.removeEventListener('close', closeHendler);
            tempWs.close();
        };

    }, []);

    return <div>
        <Messages ws={ws} />
        <AddMessageForm ws={ws} />
    </div>
}

const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    useEffect(() => {
         let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages(prevMessage =>[...prevMessage, ...newMessages]);
        }

        ws?.addEventListener('message', messageHandler);

        return () => {
            ws?.removeEventListener('message', messageHandler);
        }
    }, [ws]);
    
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

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [message, setMessage] = useState("");
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready');
        }

        ws?.addEventListener('open', openHandler);

        return () => {
            ws?.removeEventListener('open', openHandler);
        }

    }, [ws]);

    const sendMessage = () => {
        if (!message) {
            return;
        }
        ws?.send(message);
        setMessage("");
    }

    return <div>
        <div><textarea onChange={(e) => setMessage(e.target.value)} placeholder="Type your message here..."></textarea></div>
        <div>
            <button onClick={sendMessage} disabled={readyStatus === null && readyStatus !== 'ready'}>Send</button>
        </div>
    </div>
}

export default ChatPage;
