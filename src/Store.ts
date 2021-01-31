import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        discounts: []
    },
    getters: {
        allDiscounts (state) {
            return state.discounts
        }
    },
    mutations: {
        setDiscounts (state, discounts) {
            state.discounts = discounts
        },
        createDiscount (state, disc) {
            state.discounts.unshift(disc)
        }
    },
    actions: {
        async goFetch (ctx, str) {
            const res = await fetch(str);
            const discounts = await res.json();
            ctx.commit('setDiscounts', discounts)
        }
    }

})
export default store;