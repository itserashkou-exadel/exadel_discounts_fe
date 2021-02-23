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
        keyWord: null,
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
        setFilter (state, filteredData){
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
        updTask (state, updatedDiscount)  {
            //@ts-ignore
           const index = state.discounts.findIndex(t => t.id === updatedDiscount.id);
                //@ts-ignore
               state.discounts.splice(index, 1, updatedDiscount);
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
        setKeyWord({commit}, state) {
            commit('changeKeyWord', state);
        },
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
            await axios.post(`https://localhost:9001/api/v1/discounts/upsert`, discount);
            commit('updTask', discount);
        },
        async inputPost({commit}, search){
            const response = await axios.post(searchDiscount, search);
            commit('receiveSearch', response.data)
        },
        async getDiscountById({commit},id) {
            let url = urlGetDiscountsById;
            url += id;
            const response = await axios.get(url);
            commit('receiveGetById', response.data)
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
