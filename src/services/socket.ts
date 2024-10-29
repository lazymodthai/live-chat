import { io } from 'socket.io-client';

// const uri = `wss://api.artico.in.th`
const uri = `ws://localhost:3000/chat`

export const initializeSocket = () => {
    const socket = io(uri, {
        transports: ['websocket'],
        closeOnBeforeunload: false,
        auth: {
            userId: '56a8f64c-f2d3-4b5f-b647-5840024f16b8'
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




