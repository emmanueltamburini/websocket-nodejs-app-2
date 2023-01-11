import { DISCONNECT, ENTER_CHAT, SEND_MESSAGE, SEND_PRIVATE_MESSAGE } from "../constant/routes.constant.js";
import { disconnectHandler, enterChatHandler, sendMessageHandler, sendPrivateMessageHandler } from "./handlerSocket.js";


const socketController = async (socket, io) => {
    socket.on(ENTER_CHAT, enterChatHandler(socket));

    socket.on(SEND_MESSAGE, sendMessageHandler(socket));

    socket.on(SEND_PRIVATE_MESSAGE, sendPrivateMessageHandler(socket));

    socket.on(DISCONNECT, disconnectHandler(socket))
}

export default socketController;