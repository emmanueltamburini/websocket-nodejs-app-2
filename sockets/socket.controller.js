import { IS_REQUIRED, NAME } from "../constant/messages.constant.js";
import { DISCONNECT, ENTER_CHAT, SEND_MESSAGE } from "../constant/routes.constant.js";
import Users from "../models/users.js";

const users = new Users(); 

const socketController = async (socket, io) => {
    socket.on(ENTER_CHAT, (user, callback) => {
        if (!callback) callback = () => {};

        if (!user.name) {
            return callback({
                error: true,
                message: IS_REQUIRED(NAME)
            })
        }

        callback(users.addUser(socket.id, user.name));
        console.log('=== socket.controller.js [6] ===', user);
    })
}

export default socketController;