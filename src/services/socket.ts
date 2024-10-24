import { io } from 'socket.io-client';

export const initializeSocket = () => {
    const socket = io('wss://api.artico.in.th', {
        transports: ['websocket'],
        closeOnBeforeunload: false
    });

    socket.on('connect', () => {
        console.log('Connected to chat server');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    return socket;
};