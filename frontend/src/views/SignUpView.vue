<template>
    <div>
        <form @submit="signUp">
            <input type="text" placeholder="Username" :value="username">
            <input type="password" :value="password" placeholder="password">
            <input type="password" :value="repeatedPassword" placeholder="repeat password">
            <button type="submit" >Sign up</button>
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
                repeatedPassword: '',
                error: null
            }
        },
        methods: {
            signUp(e) {
                e.preventDefault()
                try {
                    if(this.password !== this.repeatedPassword) throw new Error('Passwords must be equal');
                    this.axios.post('http://localhost:3000/signup', { username: this.username, password: this.password })                    
                } catch (error) {
                    this.error = error.message
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>