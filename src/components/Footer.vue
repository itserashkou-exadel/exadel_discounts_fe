<template>
  <v-footer absolute color="#40bfef"  dark app
  >
    <v-container fluid>
      <v-row>
        <v-col cols="9"
               align-self="center">
          <v-card color="#40bfef" flat class="ml-3">
          <strong color="white">EXADEL</strong>{{ new Date().getFullYear() }}
          </v-card>
        </v-col>
        <v-col align-self="center" class="justify-end"
            cols="3"
        >
          <v-card color="#40bfef" flat tile class="d-flex justify-end mr-3">
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
import {mapMutations} from 'vuex'
export default {
  name: "Footer",
  data() {
    return {
      isRuLocale: true
    }
  },
  methods: {
    ...mapMutations(['setLanguage'])
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
    }
  }
}
</script>

<style scoped>
.row {
  margin: -18px;
}
</style>


