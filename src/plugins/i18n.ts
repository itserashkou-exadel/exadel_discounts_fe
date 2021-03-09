import Vue from 'vue';
import VueI18n from "vue-i18n";
import ru from "../langs/ru.json"
import en from "../langs/ru.json"
Vue.use(VueI18n);

export const i18n = new VueI18n (
    {
    locale: sessionStorage.getItem('userLanguage') === "En" ? 'en': 'ru',
    fallbackLocale: 'en',
    messages: sessionStorage.getItem('userLanguage') === "En" ? {en}: {ru}
}
)