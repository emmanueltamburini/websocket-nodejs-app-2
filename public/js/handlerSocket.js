import { LOST_CONNECTION, SERVER_RESPONSE, SERVER, NAME, IS_REQUIRED, ROOM } from "./constant.js";
import { renderMessage, renderUser } from "./socketChatJquery.js";
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
    renderUser(response, false);
};

export const disconnectHandler = () => {
    console.log(LOST_CONNECTION);
};

export const sendMessageCallback = (text) => {
    return response => {
        renderMessage(response, true);
        text.value = '';
    };
} 

export const sendMessageHandler = message => {
    renderMessage(message);
};

export const usersConnectedHandler = users => {
    renderUser(users);
};

export const sendPrivateMessageHandler = (socket) => {
    return (message) => {
        console.log(SERVER, message);
    };  
};
