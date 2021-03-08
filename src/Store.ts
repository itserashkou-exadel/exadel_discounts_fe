import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
import logger from "vuex/types/logger";

Vue.use(Vuex);

const urlDiscounts = `http://localhost:3000/discounts`;
const searchDiscount = `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/search`;
const urlGetDiscountsById = `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/get/`;
const urlCountries = `${process.env.VUE_APP_URL_SWAGGER}/api/v1/addresses/all/Ru/countries`
const deleteURL = `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/delete/`
const urlRating = `${process.env.VUE_APP_URL_SWAGGER}/api/v1/discounts/vote/`

// const urlDiscounts = 'http://localhost:3000/discounts';
// const searchDiscount = 'https://localhost:9001/api/v1/discounts/search';
// const urlGetDiscountsById = 'https://localhost:9001/api/v1/discounts/get/Ru/';
// const urlCountries = 'https://localhost:9001/api/v1/addresses/all/Ru/countries'
// const deleteURL = 'https://localhost:9001/api/v1/discounts/delete/'
// const urlRating = 'https://localhost:9001/api/v1/discounts/vote/'


let store = new Vuex.Store({
    state: {
        currentComponent: sessionStorage.getItem('currentComponent') || 'HomePage',
        disablePag: false,
        notFound: false,
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
        disPage: 1,
        userLocation: [],
        userClaimsStoreData: [],
        subscriptions: [],
        favorites: [],
        itemsPerPage: 6,
        sortOption: {
            sortName: '',
            sortIndex: null,
            sortOrder: [false,false,true,true,true,false]
        },
        auth: null,
    },
    getters: {
        getCurrentComponent(state) {
            return state.currentComponent
        },
        getAuth (state) {
            return state.auth
        },
        getUserClaims(state) {
            return state.userClaimsStoreData;
        },
        getUserLocation(state) {
            return state.userLocation;
        },
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
        disPag(state, value){
          state.disablePag = value;
        },
        setCurrentComponent (state, component) {
          state.currentComponent = component
        },
        setAuth (state, auth) {
            state.auth = auth
        },
        setNoFound(state, status){
          state.notFound = status;
        },
        setPreviousOrder(state, number){
            // @ts-ignore
            state.sortOption.sortIndex = number;
            state.sortOption.sortOrder.forEach((item, index) => {
                if(index <=1){
                    if(number !== index){
                        state.sortOption.sortOrder[index] = false;
                    }
                }
                else if(index >1 && number !== index){
                    state.sortOption.sortOrder[index] = true;
                }
            })
        },
        setSortName(state, sortName){
          state.sortOption.sortName = sortName;
        },
        setSortOrder(state, sortOrder){
            // @ts-ignore
            state.sortOption.sortOrder[sortOrder] = !state.sortOption.sortOrder[sortOrder];
        },
        setItemsPerPage(state, itemsPer){
            state.itemsPerPage = itemsPer;
        },
        setDisPage(state, page){
            state.disPage = page;
        },
        setUserClaims(state, userData) {
            state.userClaimsStoreData = userData;
        },
        setUserLocation(state, location) {
            state.userLocation = location;
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
            state.discounts = dis;
        },
        addNextDis(state, nextDis){
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
              // console.log(state.discounts)
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
        goForCurrentComponent({commit}, component) {
          commit('setCurrentComponent', component)
        },
        goForAuth({commit}, auth){
            commit('setAuth', auth);
        },
        setFilterIcon({commit}, state){
            commit('changeFilterIcon', state);
        },
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
            try{
                const response = await axios.post(searchDiscount, search);
                commit('receiveSearch', response.data);
                commit('setDisPage', 1);
            }catch (e) {
                if (e.response.status === 404) {
                    commit('setNoFound', true);
                }
            }
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
              //  console.log(error.response.data.error);
                return {data: []};
            });
            commit('receiveSubscription', response.data)
        },
        async getFavorites({commit}, searchFav) {
            const response = await axios.post(searchDiscount, searchFav).catch(error => {
           //     console.log(error.response.data.error);
                return {data: []};
            });
            commit('receiveFavorites', response.data)
        },
        async getDiscountById({commit},id) {
            let url = urlGetDiscountsById;
            url += this.state.language +"/"
            url += id;
            const response = await axios.get(url);
            commit('receiveGetById', response.data);
        },
        async nextDiscount({commit}, search) {
                try{
                    const response = await axios.post(searchDiscount, search);
                    commit('addNextDis', response.data);
                    commit('disPag', false);
                }catch (e) {
                    if (e.response.status === 404){
                        commit('disPag', false);
                    }
                }
        },

        async deleteDiscount({commit}, id){
              let url = deleteURL;
              url += id;
              const response = await axios.delete(url);
        }
    }

})
export default store;
