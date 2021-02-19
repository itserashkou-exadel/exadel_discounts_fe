import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

const urlDiscounts = 'http://localhost:3000/discounts';
const searchDiscount = 'https://localhost:9001/api/v1/discounts/search';
const urlGetDiscountsById = 'https://localhost:9001/api/v1/discounts/get/Ru/';
const urlCountries = 'https://localhost:9001/api/v1/addresses/all/Ru/countries'

let store = new Vuex.Store({
    state: {
        details: {},
        discounts: [],
        switch: true,
        language: 'Ru',
        filtered: [],
        filteredDiscounts: [],
        countries: [],
        cities: []
    },
    getters: {
        getDetailView(state) {
            return state.details;
        },
        filterData: state => {
            return state.filtered;
        },
        setFilter(state, filteredData) {
            state.filtered = filteredData;
        },
        switcher: state => {
            return state.switch;
        },
        allDiscounts (state) {
            return state.discounts
        },
        allCountries (state) {
            return state.countries
        },
        allCities (state) {
            return state.cities
        },
        language: state => {
            return state.language
        }
    },
    mutations: {
        receiveSearch(state, dis) {
            state.discounts = dis;
        },
        receiveGetById(state, dis) {
            state.details = {};
            state.details = dis;
        },
        setFilter(state, filteredData) {
            state.filtered = filteredData;
        },
        changeSwitcher: state => {
            state.switch = !state.switch;
        },
        setDiscounts (state, discounts) {
            state.discounts = discounts
        },
        setCountries (state, countries) {
            state.countries = countries
        },
        setCities (state, cities) {
            state.cities = cities
        },
        createDiscount (state, newDiscount) {
            // @ts-ignore
            state.discounts.push(newDiscount)
        },
        updTask(state, updatedDiscount) {
            // @ts-ignore
            const index = state.discounts.findIndex(t => t._id === updatedDiscount._id);
            if(index !== -1) {
                // @ts-ignore
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
        changeFilter({commit}, state) {
            commit("setFilter", state);
        },
        changeSwitcher({commit}, state){
          commit('setSwitcher', state);
        },
        async goFetch ({commit}, str) {
            const response = await axios.get(str);
            commit('setDiscounts', response.data);
        },
        async goFetchForCountries ({commit}, str) {
            const response = await axios.get(str);
            commit('setCountries', response.data);
        },
        async goFetchForCities({commit}, str) {
            const response = await axios.get(str);
            commit('setCities', response.data);
        },
        async addDiscount ({commit}, newDiscount) {
            await axios.post('https://localhost:9001/api/v1/discounts/upsert', newDiscount);
            commit('createDiscount', newDiscount);
        },
        async updateDiscount ( { commit }, discount) {
            await axios.put(`https://jsonplaceholder.typicode.com/posts${discount.id}`, discount);
            commit('updTask', discount);
        },

        async inputPost({commit}, search) {
            const response = await axios.post(searchDiscount, search);
            commit('receiveSearch', response.data)
        },
        async getDiscountById({commit},id) {
            let url = urlGetDiscountsById;
            url += id;
            const response = await axios.get(url);
            commit('receiveGetById', response.data)
        }
    }

})
export default store;
