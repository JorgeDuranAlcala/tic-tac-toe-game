<template>
    <div>
        <form @submit="createRoom">
            <input type="text" v-model="roomName" >
            <button type="submit" >Create room</button>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                roomName: ''
            }
        },
        methods: {
            createRoom(e) {
                e.preventDefault()
                alert(this.roomName)
                this.$router.push(`/room/${this.roomName}`)
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>