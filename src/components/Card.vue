<template>
  <v-card
      :key="componentKey"
      class="mx-4 my-12"
      max-width="370px"
      max-height="800px"
  >
    <div>
      <!--            <v-img-->
      <!--                    height="250"-->
      <!--                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"-->
      <!--                    class="white&#45;&#45;text "-->
      <!--            >-->
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
            {{ description.rating.toFixed(2) }}
          </div>
        </v-row>
      </v-col>
      <v-icon v-on:click="iconSwitch(description.id)"
              class="mr-7 mt-7" large>>

        {{ card }}
      </v-icon>
    </v-row>
    <v-divider></v-divider>
    <v-card-subtitle v-if="description.description.length<120">
      <b>Description:<br></b>
      {{ description.description.substring(0, 120) }}
    </v-card-subtitle>
    <v-card-subtitle v-else>
      <b>Description:<br></b>
      {{ description.description.substring(0, 120) + " ..." }}
    </v-card-subtitle>
    <v-sheet>
      <v-chip-group
          show-arrows
          class="v-slide-group--has-affixes v-slide-group__next"
          active-class="light-blue accent-4 white--text">
        <v-chip v-for="tag in description.tags"
                :key="tag"
        > {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-sheet>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>

        <v-card-title class="headline">Вы уверены, что хотите удалить эту скидку
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Отмена</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm(description.id)">Да</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row class="mt-4 ml-4 pb-6" align="center" justify="space-between">
      <!--            <v-btn @click="$router.push({name:'detail'},detailView())" color="blue" raised>-->
      <v-btn @click="$router.push({name:'detail',params:{_id:description.id}})" color="blue" raised  class="white--text">
        Choose
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
import AuthService from "@/services/auth.service";
import Mixin from "@/mixins/token.mixin";


const moment = require('moment')
const auth = new AuthService();
import token from '@/mixins/token.mixin'

export default {
  name: "Card",
  mixins: [token, Mixin],
  data: () => ({
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
    deleteFromFavor: ['deleteFromFavor']
  },
  methods: {

    pictureCheck(url) {
      // console.log(url)
      if (url === false)
        return "../../public/cat_404.jpg"
      else
          // return "https://cdn.vuetifyjs.com/images/cards/cooking.png"
        return url
    },
    iconSwitch(id) {
      if (this.card === "mdi-heart-outline") {
        this.card = "mdi-heart"
        this.addToFavorites(id);
      } else
        this.card = "mdi-heart-outline"
    },
    addToFavorites: function (id) {
      console.log('discounts', id);
      const putSubscr = () => {
        axios({
          method: 'put',
          url: `https://localhost:9001/api/v1/discounts/favorites/add/${id}`,
        }).then(response => console.log("RESPONSE :" + JSON.stringify(response)));
      };
      this.getToken(putSubscr);
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
      this.editedIndex = this.offers.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteDiscount(id) {
      let itemID = id;
      const goDelete = () => {
        console.log(id)
        let url = 'https://localhost:9001/api/v1/discounts/delete/';
        url += itemID;
        axios.delete(url);
        this.$store.state.discounts = this.$store.state.discounts.filter(item => item.id !== itemID);
        console.log(this.info)
      }
      this.getToken(goDelete)
    },
    deleteItemConfirm(id) {
      this.deleteDiscount(id)
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



}
</script>

<style scoped>

</style>
