import { ADMIN, IS_REQUIRED, LEFT_CHAT, NAME } from "../constant/messages.constant.js";
import { SEND_MESSAGE, USERS_CONNECTED } from "../constant/routes.constant.js";
import Users from "../models/users.js";

const users = new Users(); 

export const enterChatHandler = (socket) => {
    return (user, callback) => {
        if (!callback) callback = () => {};
    
        if (!user.name) {
            return callback({
                error: true,
                message: IS_REQUIRED(NAME)
            })
        }
    
        callback(users.addUser(socket.id, user.name));

        socket.broadcast.emit(USERS_CONNECTED, users.getUsers());
    };
}

export const disconnectHandler = (socket) => {
    return () => {
        let deletedUser = users.deleteUser(socket.id);
        socket.broadcast.emit(SEND_MESSAGE, {user: ADMIN, message: LEFT_CHAT(deletedUser?.name)});
        socket.broadcast.emit(USERS_CONNECTED, users.getUsers());
    };   
}

