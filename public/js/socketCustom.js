import { connectHandler, disconnectHandler, sendMessageCallback, sendMessageHandler } from "./handlerSocket.js";
import { CONNECT, DISCONNECT, SEND_MESSAGE } from "./socketRoutes.js";

const socket = io();

socket.on(CONNECT, connectHandler);

socket.on(DISCONNECT, disconnectHandler);

const payload = {
    user: 'testing',
    message: 'testing message'
};

socket.emit(SEND_MESSAGE, payload, sendMessageCallback);

socket.on(SEND_MESSAGE, sendMessageHandler);