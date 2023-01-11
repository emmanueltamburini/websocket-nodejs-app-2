import { connectHandler, disconnectHandler, sendMessageCallback, sendMessageHandler, sendPrivateMessageHandler, usersConnectedHandler } from "./handlerSocket.js";
import { CONNECT, DISCONNECT, SEND_MESSAGE, SEND_PRIVATE_MESSAGE, USERS_CONNECTED } from "./socketRoutes.js";

const socket = io();

socket.on(CONNECT, connectHandler(socket));

socket.on(DISCONNECT, disconnectHandler);

socket.on(USERS_CONNECTED, usersConnectedHandler);

const payload = {
    user: 'testing',
    message: 'testing message'
};

socket.emit(SEND_MESSAGE, payload, sendMessageCallback);

socket.on(SEND_MESSAGE, sendMessageHandler);

socket.on(SEND_PRIVATE_MESSAGE, sendPrivateMessageHandler(socket));