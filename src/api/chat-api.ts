let subscribers = [] as SubscribeType[];

let ws: WebSocket | null = null;

const closeHendler = () => {
    console.log("WebSocket closed. Attempting to reconnect...");
    setTimeout(createChannel, 3000);
}

let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    subscribers.forEach(s => s(newMessages));
}

function createChannel() {
    ws?.removeEventListener('close', closeHendler);
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    //  let ws = new WebSocket("ws://localhost:3001");
    ws.addEventListener('close', closeHendler);
    ws.addEventListener('message', messageHandler);
};

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers = [];
        ws?.removeEventListener('close', closeHendler);
        ws?.removeEventListener('message', messageHandler);
        ws?.close();
    },
    subscribe(callback: SubscribeType) {
        subscribers.push(callback);
        return () => {
            subscribers = subscribers.filter(s => s !== callback);
        }
    },
    unsubscribe(callback: SubscribeType) {
        subscribers = subscribers.filter(s => s !== callback);
    },
    sendMessage(message: string) {  
        ws?.send(message);
    }
}

type SubscribeType = (messages: ChatMessageType[]) => void;

export type ChatMessageType = {
    message: string
    photo: string   
    userId: number
    userName: string    
}