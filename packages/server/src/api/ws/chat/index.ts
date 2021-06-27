import { Server as HTTPServer } from "http";
import { Server, Socket } from 'socket.io';
import { JoinChannelData } from './types';
import { MessageAttributes } from "@tidify/common"
import { CLIENT_HOST } from "../../../constants";

const channelPrefix = "channel-";
export default (server: HTTPServer) => {

    const io = new Server(server, {
        cors: {
            origin: CLIENT_HOST
        }
    });

    io.on('connect', (socket: Socket) => {
        console.log(socket.id + " connected!");

        socket.on('join-channel', (data: JoinChannelData) => {
            socket.rooms.forEach(el => {
                if (el === socket.id) return;
                socket.leave(el);
            })
            let room = `${channelPrefix}${data.channelId}`
            socket.join(room);
        });

        socket.on('message', (data: MessageAttributes) => {
            io.to(`${channelPrefix}${data.channelId}`).emit("message", data);
        })

        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected!`)
        })
    });
}