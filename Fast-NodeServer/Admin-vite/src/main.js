import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import print from 'vue3-print-nb'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import 'element-plus/dist/index.css'
import router from './router'
import { createPinia } from 'pinia'
import './style.css'
import i18n from './i18n/index.js'
import './router/NavigationGuards.js'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(print)
app.use(router)
app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
