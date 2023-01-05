import { USER_CONNECTED, USER_DISCONNECTED } from "../constant/messages.constant.js";
import { DISCONNECT, SEND_MESSAGE } from "../constant/routes.constant.js";

const socketController = async (socket, io) => {
    console.log(USER_CONNECTED);

    const payload = {
        user: 'Admin testing',
        message: 'Testing message'
    };

    socket.emit(SEND_MESSAGE, payload);

    socket.on(DISCONNECT, () => {
        console.log(USER_DISCONNECTED);
    });

    socket.on(SEND_MESSAGE, (data, callback) => {
        console.log(data);

        io.emit(SEND_MESSAGE, data);

        if(callback) callback("example callback response");
    });
}

export default socketController;