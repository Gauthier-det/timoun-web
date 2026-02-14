import './assets/styles.css'
import './assets/site-header.css'
import './assets/components.css'
import './assets/pages-content.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
