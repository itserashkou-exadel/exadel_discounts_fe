<template>
  <v-card
      :color="deletedCheck(description)"
      :key="componentKey"
      class="mx-4 my-12"
      max-width="370px"
      max-height="800px"
  >
    <div>
      <v-img
          height="250"
          :src="pictureCheck(description.picture)"
          class="white--text "
      >
        <div>
          <v-avatar size="59" color="red" class=" mx-3 my-3"><b>{{ description.amountOfDiscount }}%</b>
          </v-avatar>
        </div>
      </v-img>
    </div>
    <v-row align="start" justify="space-between">
      <v-col>
        <div>
          <v-card-title style="word-break: normal">
            {{ description.service }}
          </v-card-title>
        </div>
        <v-row
            align="center"
            class="ml-3 mt-n4 mb-3"
        >
          <v-rating
              :value="description.rating"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
          ></v-rating>
          <div class="grey--text ml-2">
            {{ description.rating}}
          </div>
        </v-row>
      </v-col>
      <v-icon v-on:click="iconSwitch(description.id) " color="red"
              class="mr-7 mt-7" large>>

        {{ card }}
      </v-icon>
    </v-row>
    <v-divider></v-divider>
    <v-card-subtitle v-if="description.description.length<120">
      <b>{{$t('Description:')}}<br></b>
      {{ description.description.substring(0, 120) }}
    </v-card-subtitle>
    <v-card-subtitle v-else>
      <b>{{$t('Description:')}}<br></b>
      {{ description.description.substring(0, 120) + " ..." }}
    </v-card-subtitle>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>

        <v-card-title class="headline">{{$t('deletingOfDiscount')}}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">{{$t('dtCancel')}}</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm(description.id)">{{$t('dtOk')}}</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="mt-4 ml-4 pb-6" align="center" justify="space-between">
      <v-btn @click="$router.push({name:'detail',params:{_id:description.id}})" color="blue" raised  class="white--text">
          {{$t('choose')}}
      </v-btn>
      <div v-if="this.$store.state.userClaimsStoreData.role !=='Employee'" class="mr-12">
        <v-icon @click="editItem(description)">
          mdi-pencil
        </v-icon>
        <v-icon class="ml-4" @click="deleteItem(description)">
          mdi-delete
        </v-icon>
      </div>
    </v-row>
  </v-card>
</template>
<script>
    import {mapActions} from "vuex";
    import axios from "axios";
    import Mixin from "@/mixins/token.mixin";
    const moment = require('moment')
    import token from '@/mixins/token.mixin'
    export default {
  name: "Card",
  mixins: [token, Mixin],
  data: () => ({
    delItem: null,
    deleteID: null,
    defaultCardColor: "#FFFFF",
    deletedCardColor:"#F8BBD0",
    discountInFavourites: null,
    componentKey:0,
    dialogDelete: false,
    editedIndex: -1,
    dialog: false,
    card: "mdi-heart-outline",
    offers: [],
    info: [],
    result: [],
    editedItem: {
      name: '',
      vendor: '',
      discount: 0,
      start_date: 0,
      finish_date: 0,
      raring: 0
    },
  }),
  props: {
    description: {
      type: Object,
      required: true
    },
  },
  methods: {

    pictureCheck(url) {
      if (url === false)
        return "../../public/cat_404.jpg"
      else
        return url
    },
    iconSwitch(id) {
      if (this.card === "mdi-heart-outline") {
        this.card = "mdi-heart"
        this.addToFavorites(id);
      } else{
        this.deleteFromFavor(id)
        this.card = "mdi-heart-outline"
      }

    },
    ...mapActions(['getFavorites']),
    showFavorites() {
      let loc = JSON.parse(localStorage.getItem('key'));
      let country = loc.country ? loc.country : 'Беларусь';
      let city = loc.city ? loc.city : 'Минск';
      const getFavoritesResult = () => {
        this.getFavorites(
            {
              "searchDiscountOption": "Favorites",
              "searchAddressCountry": country,
              "searchAddressCity": city,
              "searchSortFieldOption": "NameDiscount",
              "searchSortOption": "Asc",
              "searchPaginationPageNumber": 1,
              "searchPaginationCountElementPerPage": 24,
              "searchLanguage": this.$i18n.locale === 'ru' ? "Ru" : "En"            }
        )


      }
      this.getToken(getFavoritesResult);
      },
    addToFavorites: function (id) {
      const putSubscr = () => {
        axios({
          method: 'put',
          url: `https://localhost:9001/api/v1/discounts/favorites/add/${id}`,
        }).then(()=>{
          this.showFavorites()
         })
      };
      this.getToken(putSubscr);
    },
    deleteFromFavor: function (id) {

      const putFavor = () => {
        axios({
          method: 'put',
          url: `https://localhost:9001/api/v1/discounts/favorites/delete/${id}`,
        }).then(()=>{
          this.$store.state.favorites = this.$store.state.favorites.filter(item => item.id !== id);
         })
      };
      this.getToken(putFavor);
    },
    deletedCheck: function(item){
      if(item.deleted === true )
        return this.deletedCardColor
      else
        return this.defaultCardColor
    },
    checkToFavorites: function (id) {
      const checkFavor = () => {
        axios({
          method: 'put',
          url: `https://localhost:9001/api/v1/discounts/favorites/exists/${id}`,
        }).then((promise) => {
          this.card="mdi-heart"})
      };
      this.getToken(checkFavor);
    },
    ...mapActions(['goFetch', 'addDiscount', 'updateDiscount']),
    ...mapActions(['getDiscountById']),
    headers() {
      return []
    },

    editItem(item) {
      this.$router.push({
        name: 'add_discount',
        params: {placeOfCall: 'editingOfDiscount', idOfDiscount: item.id}
      });
    },
    deleteItem(item) {
      this.delItem = item;
      this.deleteID = item.id;
      this.dialogDelete = true;
    },

    deleteDiscount(){
      let itemID = this.deleteID;
      const goDelete = () => {
        let url = 'https://localhost:9001/api/v1/discounts/delete/';
        url += itemID;
        axios.delete(url);
        if(this.$store.state.userClaimsStoreData.role !== "Administrator" && this.delItem.deleted !== true){
          this.$store.state.discounts = this.$store.state.discounts.filter(item => item.id !== itemID);
        }
        if(this.$store.state.userClaimsStoreData.role === "Administrator"){
          this.delItem.deleted = true;
        }
      }
      this.getToken(goDelete)
    },
    deleteItemConfirm() {
      this.deleteDiscount();
      this.closeDelete();
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      })
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.offers[this.editedIndex], this.editedItem)
      } else {
        this.offers.push(this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    favorites() {
      return this.$store.state.favorites
    }
  },
  mounted() {
    this.checkToFavorites(this.description.id);
  }


}
</script>

<style scoped>

</style>
