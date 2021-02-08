import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        discounts: [],
        switch: true,
        language: 'Ru'
    },
    getters: {
        switcher: state => {
            return state.switch;
        },
        allDiscounts (state) {
            return state.discounts
        },
        discountById (state, id) {
            return state.discounts.find(element => element.id = id)
        },
        language: state => {
            return state.language
        }
    },
    mutations: {
        changeSwitcher: state => {
            state.switch = !state.switch;
        },
        setDiscounts (state, discounts) {
            state.discounts = discounts
        },
        createDiscount (state, disc) {
            state.discounts.unshift(disc)
        },
        updTask (state, updatedDiscount)  {
            const index = state.discounts.findIndex(t => t.id === updatedDiscount.id);
            if(index !== -1) {
                state.discounts.splice(index, 1, updatedDiscount);
            }
        },
        setLanguage (state, lang) {
            if (lang) {
                state.language = "Ru"
            } else {
                state.language = "En"
            }
        }
    },
    actions: {
        changeSwitcher({commit}, state){
          commit('setSwitcher', state);
        },
        async goFetch ({commit}, str) {
            const response = await axios.get(str);
            commit('setDiscounts', response.data);
        },
        async addDiscount ({ commit }, newDiscount) {
            const response = await axios.post('../../discount.json', newDiscount);
            commit('createDiscount', response.data);
        },
        async updateDiscount ( { commit }, discount) {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts${discount.id}`, discount);
            commit('updTask', response.data);
        }
    }

})
export default store;
