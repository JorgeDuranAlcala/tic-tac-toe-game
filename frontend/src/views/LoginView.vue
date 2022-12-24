<template>
    <div>
        <form @submit="logIn">
            <input type="text" placeholder="Username" :value="username">
            <input type="password" :value="password">
            <button type="submit" >Login</button>
        </form>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script>
    export default {
        inject: ['axios'],
        data() {
            return {
                username: '',
                password: '',
                error: null
            }
        },
        methods: {
            logIn(e) {
                e.preventDefault()
                try {
                    this.axios.post('http://localhost:3000/login', { username: this.username, password: this.password })                    
                } catch (error) {
                    this.error = error.message
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>