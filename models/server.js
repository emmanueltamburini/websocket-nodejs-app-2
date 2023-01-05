import express from 'express';
import cors from 'cors';

import { SERVER_RUNNING } from '../constant/messages.constant.js';
import { Server as ServerIO } from "socket.io";
import http from 'http'
import socketController from '../sockets/socket.controller.js';
import { CONNECTION, LOCAL_PUBLIC_FOLDER_PATH } from '../constant/routes.constant.js';

export default class Server {

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new ServerIO(this.server);
        this.port = process.env.PORT;

        this.middleware();

        this.sockets();
    }


    middleware() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static(LOCAL_PUBLIC_FOLDER_PATH));
    }

    sockets() {
        this.io.on(CONNECTION, socket =>  socketController(socket, this.io))
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(SERVER_RUNNING(this.port));
        });
    }

}
