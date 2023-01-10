import { DISCONNECT, ENTER_CHAT } from "../constant/routes.constant.js";
import { disconnectHandler, enterChatHandler } from "./handlerSocket.js";


const socketController = async (socket, io) => {
    socket.on(ENTER_CHAT, enterChatHandler(socket));

    socket.on(DISCONNECT, disconnectHandler(socket))
}

export default socketController;