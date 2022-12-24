<template>
    <div>
        room
        
        <p>{{ msg }}</p>
    </div>
</template>

<script>
import socketioService from '../services/socketio.service';

    export default {
        data() {
            return {
                socket: null,
                msg: ''
            }
        },
        created() {
            this.socket = socketioService.getSocket()
        },
        mounted() {
            console.log(this.$route)
            this.socket.emit('EnterRoom', this.$route.params.roomName)
            this.socket.on('player-entered-room', msg => {
                this.msg = msg
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>