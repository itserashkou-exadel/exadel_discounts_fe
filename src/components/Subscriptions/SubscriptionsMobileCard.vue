<template>
  <v-card
      class="mx-4 my-12"
      max-width="370px"
      max-height="800px"
  >
    <div>
      <v-img
          height="250"
          :src="pictureCheck(subscription.pictureUrl)"
          class="white--text "
      >
        <div>
          <v-avatar size="59" color="red" class=" mx-3 my-3"><b>{{ subscription.amountOfDiscount }}%</b>
          </v-avatar>
        </div>
      </v-img>
    </div>
    <v-row align="start" justify="space-between">
      <v-col>
        <div>
          <v-card-title style="word-break: normal">
            {{subscription.name}}
          </v-card-title>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-card-subtitle v-if="subscription.description.length<120">
      <b>Description:<br></b>
      {{ subscription.description.substring(0, 120) }}
    </v-card-subtitle>
    <v-card-subtitle v-else>
      <b>Description:<br></b>
      {{ subscription.description.substring(0, 120) + " ..." }}
    </v-card-subtitle>
    <v-row class="mt-4 ml-4 pb-6" align="center" justify="space-between">
      <v-btn @click="$router.push({name:'detail',params:{_id:subscription.id}})" color="primary" raised>
        Подробнее
      </v-btn>
      <Promocodes v-bind:subscrItem="subscription"
                  :showSubscriptions="showSubscriptions"
                  class="mr-7"
      />
    </v-row>
  </v-card>
</template>
<script>

import AuthService from "@/services/auth.service";
import Mixin from "@/mixins/token.mixin";
import Promocodes from "@/components/Subscriptions/Promocodes";


const moment = require('moment')
const auth = new AuthService();
import token from '@/mixins/token.mixin'

export default {
  name: "SubscriptionsMobileCard",
  mixins: [token, Mixin],
  components: {Promocodes},
  data: () => ({}),
  props: {
    showSubscriptions: {
      type: Function,
      required: true
    },
    subscription: {
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

