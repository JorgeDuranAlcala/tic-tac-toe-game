import { io } from 'socket.io-client';

class SocketIoService {
    constructor() {
        this.socket = null
        this.url = 'http://localhost:3000'
    }
    init() {
        this.socket = io(this.url)
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
    getSocket() {
        return this.socket
    }
}

export default new SocketIoService()
