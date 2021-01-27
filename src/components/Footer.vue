<template>
  <v-footer color="primary"  dark app
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
              v-model="english"
              :label="`${english ? 'EN' : 'RU'}`"
          ></v-switch>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      english: false
    }
  }
}
</script>

<style scoped>
.row {
  margin: -18px;
}
</style>


