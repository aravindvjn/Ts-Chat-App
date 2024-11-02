import { io, Socket } from 'socket.io-client';
import { baseURL } from '../Links/Links';
export let socket: Socket | null = null;
export const connectSocket = () => {
    while (!socket?.connect) {
        // console.log("connecting in socket service.")
        socket = io(baseURL,
            {
                auth: {
                    token: localStorage.getItem("token"),
                },
            }
        );
        // console.log('Connected to Socket.IO server');
    }
};
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
        // console.log('Disconnected from Socket.IO server');
    }
};

// Emit an event to the server
export const emitEvent = (event: string, ...args: any[]) => {
    if (socket) {
        socket.emit(event, ...args);
    }
};

// Listen for events from the server
export const listenToEvent = (event: string, callback: (...args: any[]) => void) => {
    if (socket) {
        socket.on(event, callback);
    }
};

// Remove event listeners 
export const removeEventListener = (event: string) => {
    if (socket) {
        socket.off(event);
    }
};