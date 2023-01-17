import { ADMIN, ROOM } from "./constant.js";
import { sendMessageCallback } from "./handlerSocket.js";
import { socket } from "./socketChat.js";
import { SEND_MESSAGE } from "./socketRoutes.js";

const params = new URLSearchParams(window.location.search);

const usersDiv = document.querySelector('#usersDiv');
const sendForm = document.querySelector('#sendForm');
const messageText = document.querySelector('#messageText');
const chatBoxDiv = document.querySelector('#chatBoxDiv');
const titleChatH3 = document.querySelector('#titleChatH3');

export const renderUser = (users) => {

    let html = ''

    const htmlTitle = `
    <div class="p-20 b-b">
        <h3 class="box-title">Room chat: <small>${params.get(ROOM)}</small></h3>
    </div>`;

    
    html += `
    <li>
        <a href="javascript:void(0)" class="active"> Room chat: <span> ${params.get(ROOM)}</span></a>
    </li>`;

    for (let user of users) {
        html += `
        <li>
            <a data-id="${user.id}" href="javascript:void(0)"><img src="${user.img ? user.img : 'assets/images/users/basicUser.png'}" alt="user-img" class="img-circle"> <span>${user.name}<small class="text-success">${user.status ? user.status : 'online'}</small></span></a>
        </li>`;
    }

    titleChatH3.innerHTML = htmlTitle;
    usersDiv.innerHTML = html;
}

export const renderMessage = (message, mine) => {
    let html = ''
    const date = new Date(message.date);
    const hour = `${date.getHours()}:${date.getMinutes()}`
    
    let li = document.createElement('li');
    li.className = "animated fadeIn";

    let adminClass = 'info';

    let adminImage = 'basicUser.png'

    if (message.name === ADMIN) {
        adminClass = 'danger';
        adminImage = 'admin.jpeg';
    }

    if (mine) {
        li.className = "reverse";

        html += `
        <div class="chat-content">
            <h5>${message.name}</h5>
            <div class="box bg-light-inverse">${message.message}</div>
        </div>
        <div class="chat-img"><img src="assets/images/users/basicUser.png" alt="user" /></div>
        <div class="chat-time">${hour}</div>`;
    } else {
        html += `
        <div class="chat-img"><img src="assets/images/users/${adminImage}" alt="user" /></div>
        <div class="chat-content">
            <h5>${message.name}</h5>
            <div class="box bg-light-${adminClass}">${message.message}</div>
        </div>
        <div class="chat-time">${hour}</div>`;
    }

    li.innerHTML = html;

    chatBoxDiv.appendChild(li);

    scrollBottom();
}

function scrollBottom() {
    chatBoxDiv.scrollTop = chatBoxDiv.scrollHeight - chatBoxDiv.clientHeight;
}

usersDiv.addEventListener('click', (event) => {
    let id;

    if (event.target.attributes['data-id']) {
        id = event.target.attributes['data-id'].value;

    }

    if(event.target.parentElement.attributes['data-id']) {
        id = event.target.parentElement.attributes['data-id'].value;
    
    }

    if (id) {
        console.log(id);
    }
});

messageText.addEventListener('keydown', (event) => {
    if (event.which === 13) {
        debugger;
        if (!event.repeat) {
            const newEvent = new Event("submit", {cancelable: true});
            event.target.form.dispatchEvent(newEvent);
        }

        event.preventDefault();
    }
});

sendForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (messageText.value.trim().length === 0) {
        return;
    }

    const payload = {
        message: messageText.value
    };
    
    socket.emit(SEND_MESSAGE, payload, sendMessageCallback(messageText));
});
