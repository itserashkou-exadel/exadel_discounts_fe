import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

const urlDiscounts = 'http://localhost:3000/discounts';
const searchDiscount = 'https://localhost:9001/api/v1/discounts/search';

let store = new Vuex.Store({
    state: {
        keyWord: null,
        discounts: [],
        switch: true,
        language: 'Ru',
        filtered: [],
        filteredDiscounts: [],
        countries: [],
        cities: []
    },
    getters: {
        filterData: state => {
            return state.filtered;
        },
        setFilter(state, filteredData) {
            state.filtered = filteredData;
        },
        switcher: state => {
            return state.switch;
        },
        allDiscounts(state) {
            return state.discounts
        },
        allCountries(state) {
            return state.countries
        },
        allCities(state) {
            return state.cities
        },
        language: state => {
            return state.language
        }
    },
    mutations: {
        changeKeyWord(state, key) {
            state.keyWord = key;
        },
        receiveSearch(state, dis) {
            // @ts-ignore
            state.discounts.push(...dis);
        },

        addNextDis(state, nextDis){
          // @ts-ignore
            state.discounts.push(...nextDis);
        },
        setFilter(state, filteredData) {
            state.filtered = filteredData;
        },
        changeSwitcher: state => {
            state.switch = !state.switch;
        },
        setDiscounts(state, discounts) {
            state.discounts = discounts
        },
        setCountries(state, countries) {
            state.countries = countries
        },
        setCities(state, cities) {
            state.cities = cities
        },
        createDiscount(state, newDiscount) {
            // @ts-ignore
            state.discounts.push(newDiscount)
        },
        updTask(state, updatedDiscount) {
            // @ts-ignore
            const index = state.discounts.findIndex(t => t._id === updatedDiscount._id);
            if (index !== -1) {
                // @ts-ignore
                state.discounts.splice(index, 1, updatedDiscount);
            }
        },
        setLanguage(state, lang) {
            if (lang) {
                state.language = "Ru"
            } else {
                state.language = "En"
            }
        }
    },
    actions: {
        setKeyWord({commit}, state) {
            commit('changeKeyWord', state);
        },
        changeFilter({commit}, state) {
            commit("setFilter", state);
        },
        changeSwitcher({commit}, state) {
            commit('setSwitcher', state);
        },
        async goFetch({commit}, str) {
            const response = await axios.get(str);
            commit('setDiscounts', response.data);
        },
        async goFetchForcountries({commit}, str) {
            const response = await axios.get(str);
            commit('setCountries', response.data);
        },
        async goFetchForCities({commit}, str) {
            const response = await axios.get(str);
            commit('setCities', response.data);
        },
        addDiscount({commit}, newDiscount) {
            //  await axios.post(urlDiscounts, newDiscount);
            commit('createDiscount', newDiscount);
        },
        updateDiscount({commit}, discount) {
            //  const response = await axios.put(`https://jsonplaceholder.typicode.com/posts${discount.id}`, discount);
            commit('updTask', discount);
        },

        async inputPost({commit}, search) {
            const response = await axios.post(searchDiscount, search);
            commit('receiveSearch', response.data)
        },
        async nextDiscount({commit}, search) {
            try{
                const response = await axios.post(searchDiscount, search);
                commit('addNextDis', response.data)
            } catch (e) {
                // if(e.response && e.response.status === 404) {
                //     console.clear();
                // }
                console.log(e)

            }
        }
    }

})
export default store;
