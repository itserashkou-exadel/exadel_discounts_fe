<template>
  <v-container class="mb-12">
    <v-card class="mx-auto" max-width="600" tile>
      <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile pt-5" color="grey" size="164" tile>
              <v-img :src="user.photoUrl"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ user.name }} {{ user.surname }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ user.mail }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
    <v-form>
      <v-container class="pa-5">
        <v-row justify="center">
          <v-col cols="12" sm="8">
            <v-text-field
              v-model="user.phoneNumber"
              :rules="phoneRules"
              counter
              :label="$t('uPhoneNumber')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field
              v-model="user.photoUrl"
              :label="$t('uPhotoUrl')"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="8">
            <v-select
              v-model="user.language"
              :items="languages"
              color="pink"
              :label="$t('uLanguage')"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="newPasswordRules"
              :type="show1 ? 'text' : 'password'"
              :label="$t('uNewPassword')"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="8">
            <v-text-field
              v-model="repeatedPassword"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="repeatPasswordRules"
              :type="show2 ? 'text' : 'password'"
              :label="$t('uRepeatPassword')"
              counter
              @click:append="show2 = !show2"
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="8">
            <v-btn
              @click="updateUser"
              :disabled="!this.valid"
              rounded
              outlined
              color="primary"
            >
              {{ $t("fSave") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import token from "@/mixins/token.mixin";
export default {
  props: ["user"],
  mixins: [token],
  data() {
    return {
      password: "",
      repeatedPassword: "",
      languages: ["Ru", "En"],
      phoneMaxChars: 40,
      phoneMinChars: 6,
      newPasswordMaxChars: 32,
      newPasswordMinChars: 6,
      show1: false,
      show2: false,
      valid: false,
      phoneRules: [
        (v) =>
          v.length <= this.phoneMaxChars ||
          this.$t("uMax") + ' ' + this.phoneMaxChars + ' ' + this.$t("uCharacters"),
        (v) =>
          v.length >= this.phoneMinChars ||
          this.$t("uMin") + ' ' + this.phoneMinChars + ' ' + this.$t("uCharacters"),
      ],
      newPasswordRules: [
        (v) =>
          v.length <= this.newPasswordMaxChars ||
          this.$t("uMax") + ' ' + this.newPasswordMaxChars + ' ' + this.$t("uCharacters"),
        (v) =>
          v.length >= this.newPasswordMinChars ||
          this.$t("uMin") + ' ' + this.newPasswordMinChars + ' ' + this.$t("uCharacters"),
        (v) => {
          this.valid = this.repeatedPassword == this.password ? true : false;
        },
      ],
      repeatPasswordRules: [
        (v) => {
          if (this.repeatedPassword == this.password) {
            this.valid = true;
            return true;
          } else {
            this.valid = false;
            return this.$t("uNotMatchMsg");
          }
        },
      ],
    };
  },
  methods: {
    updateUser() {
      const getUserInfo = () => {
        axios
          .post("https://localhost:9001/api/v1/users/update", {
            phoneNumber: this.user.phoneNumber,
            password: this.repeatedPassword,
            photoUrl: this.user.photoUrl,
            language: this.user.language,
          })
          .then((responce) => {
            this.data = responce.data;
          });
      };
      this.getToken(getUserInfo);
    },
  },
};
</script>

<style scoped>
</style>
