
import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useLangStore = defineStore('lang', () => {

    const lang = ref('cn')
    const setLang = (newLang) => {
        lang.value = newLang
        // localStorage.setItem('lang', newLang)
    }
    return { lang, setLang }
}, {
    persist: true,
}
)