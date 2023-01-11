import { LOST_CONNECTION, SERVER_RESPONSE, SERVER, NAME, IS_REQUIRED, ROOM } from "./constant.js";
import { ENTER_CHAT } from "./socketRoutes.js";

const params = new URLSearchParams(window.location.search);

if (!params.has(NAME) || !params.has(ROOM)) {
    window.location = 'index.html';
    throw new Error(IS_REQUIRED(`${NAME} and ${ROOM}`));
}

const user = {
    name: params.get(NAME),
    room: params.get(ROOM)
}

export const connectHandler = (socket) => {
    socket.emit(ENTER_CHAT, user, enterChatCallback)
};

export const enterChatCallback = response => {
    console.log('Users connected', response);
};

export const disconnectHandler = () => {
    console.log(LOST_CONNECTION);
};

export const sendMessageCallback = response => {
    console.log(SERVER_RESPONSE, response);
};

export const sendMessageHandler = message => {
    console.log(SERVER, message);
};

export const usersConnectedHandler = users => {
    console.log(users);
};

export const sendPrivateMessageHandler = (socket) => {
    return (message) => {
        console.log(SERVER, message);
    };  
};
