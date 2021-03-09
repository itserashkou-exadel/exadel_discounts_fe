<template>
  <v-card
      class="mx-4 my-12"
      max-width="370px"
      max-height="800px"
  >
    <div>
      <v-img
          height="250"
          :src="pictureCheck(favorite.pictureUrl)"
          class="white--text "
      >
        <div>
          <v-avatar size="59" color="red" class=" mx-3 my-3"><b>{{ favorite.amountOfDiscount }}%</b>
          </v-avatar>
        </div>
      </v-img>
    </div>
    <v-row align="start" justify="space-between">
      <v-col>
        <div>
          <v-card-title style="word-break: normal">
            {{favorite.name}}
          </v-card-title>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-subtitle v-if="favorite.description.length<120">
      <b>{{$t('Description:')}}<br></b>
      {{ favorite.description.substring(0, 120) }}
    </v-card-subtitle>
    <v-card-subtitle v-else>
      <b>{{$t('Description:')}}<br></b>
      {{ favorite.description.substring(0, 120) + " ..." }}
    </v-card-subtitle>
    <v-row class="mt-4 ml-4 pb-6" align="center" justify="space-between">
      <v-btn @click="$router.push({name:'detail',params:{_id:favorite.id}})" color="primary" raised>
        {{$t('MoreInfo')}}
      </v-btn>
    </v-row>
  </v-card>
</template>
<script>


import Mixin from "@/mixins/token.mixin";
const moment = require('moment')
import token from '@/mixins/token.mixin'

export default {
  name: "FavoritesMobileCard",
  mixins: [token, Mixin],
  data: () => ({}),
  props: {
    showFavorites: {
      type: Function,
      required: true
    },
    favorite: {
      type: Object,
      required: true
    },
  },
  methods: {
    pictureCheck(url) {
      return url ? url : "../../public/cat_404.jpg"
    },

  },
}
</script>

<style scoped>

</style>

