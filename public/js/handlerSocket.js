import { CONNECTED_TO_SERVER, LOST_CONNECTION, SERVER_RESPONSE, SERVER } from "./constant.js";

export const connectHandler = () => {
    console.log(CONNECTED_TO_SERVER);
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
