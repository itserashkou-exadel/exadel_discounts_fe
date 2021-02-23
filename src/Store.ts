import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import logger from "vuex/types/logger";

Vue.use(Vuex);

const urlDiscounts = 'http://localhost:3000/discounts';
const searchDiscount = 'https://localhost:9001/api/v1/discounts/search';
const urlGetDiscountsById = 'https://localhost:9001/api/v1/discounts/get/Ru/';
const urlCountries = 'https://localhost:9001/api/v1/addresses/all/Ru/countries'
const deleteURL = 'https://localhost:9001/api/v1/discounts/delete/'


let store = new Vuex.Store({
    state: {
        filterIcon: false,
        filterRequest: false,
        keyWord: null,
        details: {},
        discounts: [],
        switch: true,
        language: 'Ru',
        filtered: [],
        filteredDiscounts: [],
        countries: [],
        cities: [],
        subscriptions: [],
        favorites: [],
        disPage: 1,
        itemsPerPage: 5
    },
    getters: {
        getDetailView(state) {
            return state.details;
        },
        getFilterData: state => {
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
        allCountries(state) {
            return state.countries
        },
        allCities(state) {
            return state.cities
        },
        allSubscriptions(state) {
            return state.subscriptions
        },
        allFavorites(state) {
            return state.favorites
        },
        language: state => {
            return state.language
        }
    },
    mutations: {
        setItemsPerPage(state, itemsPer){
          state.itemsPerPage = itemsPer;
        },
        setDisPage(state, page){
          state.disPage = page;
        },
        changeFilterIcon(state, bool){
          state.filterIcon = bool;
        },
        setTrueFilterRequest(state){
            state.filterRequest = true;
        },
        changeFilterRequest(state){
          state.filterRequest =  !state.filterRequest;
        },
        changeKeyWord(state, key) {
            state.keyWord = key;
        },
        receiveSearch(state, dis) {
            // @ts-ignore
            state.discounts.push(...dis);
        },

        addNextDis(state, nextDis) {
            // @ts-ignore
            state.discounts.push(...nextDis);
        },
        receiveGetById(state, dis) {
            state.details = {};
            state.details = dis;
        },
        receiveSubscription(state, subscr) {
            state.subscriptions = subscr;
        },
        receiveFavorites(state, favor) {
            state.favorites = favor;
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
        setFilterIcon({commit}, state){
            commit('changeFilterIcon', state);
        },
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
        async goFetchForCountries({commit}, str) {
            const response = await axios.get(str);
            commit('setCountries', response.data);
        },
        async goFetchForCities({commit}, str) {
            const response = await axios.get(str);
            commit('setCities', response.data);
        },
        async addDiscount({commit}, newDiscount) {
            await axios.post('https://localhost:9001/api/v1/discounts/upsert', newDiscount);
            commit('createDiscount', newDiscount);
        },
        async updateDiscount({commit}, discount) {
            await axios.put(`https://jsonplaceholder.typicode.com/posts${discount.id}`, discount);
            commit('updTask', discount);
        },
        async inputPost({commit}, search){
            const response = await axios.post(searchDiscount, search);
            commit('receiveSearch', response.data)
        },

        async allInputPost({commit}, search){
            await axios.all([
                axios.post(searchDiscount, search[0]),
                axios.post(searchDiscount, search[1]),
            ]).then(axios.spread((data1, data2) => {
                commit('receiveSearch', [data1.data, data2.data])
            }));
        },
        async getSubscription({commit}, searchSub) {
            const response = await axios.post(searchDiscount, searchSub).catch(error => {
                console.log(error.response.data.error);
                return {data: []};
            });
            commit('receiveSubscription', response.data)
        },
        async getFavorites({commit}, searchFav) {
            const response = await axios.post(searchDiscount, searchFav).catch(error => {
                console.log(error.response.data.error);
                return {data: []};
            });
            commit('receiveFavorites', response.data)
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
        },

        async deleteDiscount({commit}, id){
          try{
              let url = deleteURL;
              url += id;
              const response = await axios.delete(url);
              console.log(response);
          }catch (e) {
              console.log(e)
          }
        }

    }

})
export default store;
