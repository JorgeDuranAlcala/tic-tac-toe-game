import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import confetti from 'confetti-rain';
import axios from 'axios';

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.provide('confetti', new confetti())
app.provide('axios', axios)


app.mount('#app')
