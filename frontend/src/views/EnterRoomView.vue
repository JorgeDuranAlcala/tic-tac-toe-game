<template>
    <div>
        <form @submit="EnterRoom">
            <input type="text" :value="roomName">
            <button type="submit" >Enter room</button>
        </form>
        <RouterLink to="/createRoom" >Create new room</RouterLink>
    </div>
</template>

<script>
import { RouterLink } from 'vue-router'
    export default {
        inject: ['axios'],
        async mounted() {
            const res = await this.axios.get('http://localhost:3000/hello')
            console.log(res)
        },
        components: { RouterLink },
        data() {
            return {
                roomName: ''
            }
        },
        methods: {
            EnterRoom() {
                this.$router.push({ name: 'room', params: { roomName: this.roomName } })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>