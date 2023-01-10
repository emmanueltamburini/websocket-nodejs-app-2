import { connectHandler, disconnectHandler, sendMessageCallback, sendMessageHandler, usersConnectedHandler } from "./handlerSocket.js";
import { CONNECT, DISCONNECT, SEND_MESSAGE, USERS_CONNECTED } from "./socketRoutes.js";

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