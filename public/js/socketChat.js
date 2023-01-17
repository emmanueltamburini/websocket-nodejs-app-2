import { connectHandler, disconnectHandler, sendMessageHandler, sendPrivateMessageHandler, usersConnectedHandler } from "./handlerSocket.js";
import { CONNECT, DISCONNECT, SEND_MESSAGE, SEND_PRIVATE_MESSAGE, USERS_CONNECTED } from "./socketRoutes.js";

export const socket = io();

socket.on(CONNECT, connectHandler(socket));

socket.on(DISCONNECT, disconnectHandler);

socket.on(USERS_CONNECTED, usersConnectedHandler);

socket.on(SEND_MESSAGE, sendMessageHandler);

socket.on(SEND_PRIVATE_MESSAGE, sendPrivateMessageHandler(socket));