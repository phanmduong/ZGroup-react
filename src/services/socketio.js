import io from 'socket.io-client';
import {SOCKET_PORT, SOCKET_HOST} from '../constants/env';

const url = `${SOCKET_HOST}:${SOCKET_PORT}`;

const socket = io(url);

export default socket;