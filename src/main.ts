import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {initRouter} from './router'
import store from './store'

const app= createApp(App)
initRouter(app)
app.use(store)
app.mount('#app')
