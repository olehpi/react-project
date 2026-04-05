const subscribers ={
    'messages-received': [] as MessagesReceivedSubscribeType[],
    'status-changed': [] as StatusChangedSubscribeType[]
};

let ws: WebSocket | null = null;
type EventsNamesType = 'messages-received' | 'status-changed';

const closeHendler = () => {
    console.log("WebSocket closed. Attempting to reconnect...");
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
}

const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers["messages-received"].forEach(s => s(newMessages));
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.error("WebSocket error occurred");
}

const cleanup = () => {
    ws?.removeEventListener('close', closeHendler);
    ws?.removeEventListener('message', messageHandler);
    ws?.removeEventListener('open', openHandler);
    ws?.removeEventListener('error', errorHandler);
    ws?.close();
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status));
}

function createChannel() {
    cleanup();

    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    //  let ws = new WebSocket("ws://localhost:3001");
    notifySubscribersAboutStatus('pending');
    ws.addEventListener('close', closeHendler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
};

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers["messages-received"] = [];
        subscribers["status-changed"] = [];
        cleanup();
    },
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscribeType | StatusChangedSubscribeType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
    },
    sendMessage(message: string) {  
        ws?.send(message);
    }
}

type MessagesReceivedSubscribeType = (messages: ChatMessageAPIType[]) => void;
type StatusChangedSubscribeType = (status: StatusType) => void;

export type ChatMessageAPIType = {
    message: string
    photo: string   
    userId: number
    userName: string    
}

export type StatusType = 'pending' | 'ready' | 'error';
