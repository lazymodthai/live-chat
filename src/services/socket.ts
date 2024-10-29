import { io } from 'socket.io-client';

export const initializeSocket = () => {
    const url = 'wss://api.artico.in.th'
    const url1 = 'ws://192.168.50.143:3000'
    const socket = io(url, {
        transports: ['websocket'],
        closeOnBeforeunload: false,
        auth: {
            userId: '2c85ee2e-5b0f-41af-b6fe-5ce0b0dac643'
        }
    });

    socket.on('connect', () => {
        console.log('Connected to chat server');
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    return socket;
};