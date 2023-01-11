import { ADMIN, IS_REQUIRED, LEFT_CHAT, NAME, ROOM } from "../constant/messages.constant.js";
import { SEND_MESSAGE, SEND_PRIVATE_MESSAGE, USERS_CONNECTED } from "../constant/routes.constant.js";
import Users from "../models/users.js";
import { createMessage } from "../utils/utils.js";

const users = new Users(); 

export const enterChatHandler = (socket) => {
    return (user, callback) => {
        if (!callback) callback = () => {};
    
        if (!user.name || !user.room) {
            return callback({
                error: true,
                message: IS_REQUIRED(`${NAME} and ${ROOM}`)
            })
        }

        socket.join(user.room);
    
        callback(users.addUser(socket.id, user.name, user.room));

        socket.broadcast.to(user.room).emit(USERS_CONNECTED, users.getUsersByRoom(user.room));
    };
}

export const disconnectHandler = (socket) => {
    return () => {
        let deletedUser = users.deleteUser(socket.id);
        if (!deletedUser) {
            return;
        }
        
        socket.broadcast.to(deletedUser.room).emit(SEND_MESSAGE, createMessage(ADMIN, LEFT_CHAT(deletedUser?.name)));
        socket.broadcast.to(deletedUser.room).emit(USERS_CONNECTED, users.getUsersByRoom(deletedUser.room));
    };   
}

export const sendMessageHandler = (socket) => {
    return (data) => {
        const user = users.getUserByID(socket.id);
        if (!user) {
            return;
        }
        const message = createMessage(user.name, data.message);
        socket.broadcast.to(user.room).emit(SEND_MESSAGE, message);   
    };   
}

export const sendPrivateMessageHandler = (socket) => {
    return (data) => {
        const user = users.getUserByID(socket.id);
        if (!user || !data.to) {
            return;
        }
    
        const message = createMessage(user.name, data.message);

        socket.broadcast.to(data.to).emit(SEND_PRIVATE_MESSAGE, message);   
    };   
}
