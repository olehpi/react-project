// server/server.js
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });
let currentUserId = 0;
wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", (data) => {
        const text = data.toString();
        console.log("From client:", text);

        // пример ответа обратно
        ws.send(JSON.stringify([{ message: text, userName: "You", userId: 999, photo: "" }]));
    });


    const interval = setInterval(() => {
        currentUserId = (currentUserId + 1) % 5;
        const messages = [
            {
                message: "Hello from server",
                userName: "Server" + currentUserId,
                userId: currentUserId,
                photo: "src/assets/images/mainuser.png",
            },
        ];

        ws.send(JSON.stringify(messages));
    }, 10000);

    ws.on("close", () => {
        console.log("Client disconnected");
        clearInterval(interval);
    });
});