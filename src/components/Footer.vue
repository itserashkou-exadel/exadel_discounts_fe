<template>
  <v-footer fixed color="primary"  dark app padless
  >
    <v-container fluid>
      <v-row no-gutters>
        <v-col cols="9"
               align-self="center">
          <v-card color="primary" flat class="ml-3">
          <strong color="white">EXADEL</strong>{{ new Date().getFullYear() }}
          </v-card>
        </v-col>
        <v-col align-self="center" class="justify-end"
            cols="3"
        >
          <v-card color="primary" flat tile class="d-flex justify-end mr-3">
          <v-switch
              v-model="isRuLocale"
              :label="`${isRuLocale ? 'RU' : 'EN'}`"
          ></v-switch>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import token from "@/mixins/token.mixin";

export default {
  name: "Footer",
  data() {
    return {
      isRuLocale: this.$i18n.locale === 'ru' ? true : false
    }
  },
  mixins: [token],
  methods: {
    ...mapActions(['goFetchForCountries']),
    ...mapMutations(['setLanguage']),
    getCountries () {
      const getCountries = () => {
      let languageForCountries = (this.isRuLocale ? 'Ru' : 'En')
      this.goFetchForCountries(`https://localhost:9001/api/v1/addresses/all/${languageForCountries}/countries`
      )
    };
      this.getToken(getCountries);}
  },
  watch: {
    isRuLocale (){
      if (this.isRuLocale) {
        this.setLanguage(true);
        import(`../langs/ru.json`).then((msg) =>{
        this.$i18n.setLocaleMessage('ru', msg);
        this.$i18n.locale = 'ru';
        })
      } else {
        this.setLanguage(false);
        import(`../langs/en.json`).then((msg) =>{
          this.$i18n.setLocaleMessage('en', msg);
          this.$i18n.locale = 'en';
        })
      }
      this.getCountries()
    }
  },
  mounted() {
    this.getCountries()
  }
}
</script>

<style scoped>
.row {
  margin-bottom: 0;
}

col-9 {
  margin: 0;
}
</style>


