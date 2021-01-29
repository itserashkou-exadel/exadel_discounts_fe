<template>
    <v-container
            class="mb-6 ml-10 pr-10 font-weight-regular"
    >
        <v-form v-model="valid" ref="form">
            <v-row
                    align-content="center"
                    no-gutters
            >
                <v-col cols="12" class="pb-5 pt-5"
                >
                    <h1>Добавление услуги</h1>
                </v-col>
            </v-row>
            <v-row
                    no-gutters
                    class="d-flex justify-space-between"
            >
                <v-col cols="12" md="5">
                    <v-text-field
                            placeholder="title"
                            v-model="title"
                            label="Название услуги"
                            outlined
                            :counter="10"
                            :rules="nameRules"
                    ></v-text-field>
                    <v-text-field
                            label="Скидка"
                            outlined
                    ></v-text-field>
                    <div
                            class="d-flex align-content-center"
                    >
                        <span
                                class="pt-4 pr-2"
                        >C</span>
                        <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="dateStart"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                        >
                            <template v-slot:activator="{on}">
                                <v-text-field
                                        v-model="dateStart"
                                        append-outer-icon="mdi-calendar"
                                        outlined
                                        readonly
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="dateStart"
                                    no-title
                                    scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(dateStart)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <span
                                class="pt-4 pr-2"
                        >По</span>
                        <v-menu
                                ref="menuFinish"
                                v-model="menuFinish"
                                :close-on-content-click="false"
                                :return-value.sync="dateFinish"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                        v-model="dateFinish"
                                        append-outer-icon="mdi-calendar"
                                        outlined
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                    v-model="dateFinish"
                                    no-title
                                    scrollable
                            >
                                <v-spacer></v-spacer>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="menuFinish = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menuFinish.save(dateFinish)"
                                >
                                    OK
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <!--                       -->
                    </div>
                    <v-text-field
                            placeholder="vendor"
                            v-model="vendor"
                            label="Вендор"
                            outlined
                    ></v-text-field>
                    <v-text-field
                            label="Список тегов"
                            outlined
                    ></v-text-field>
                    <v-text-field
                            height="150px"
                            label="Описание услуги"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                    <ChooseOfTown
                            v-bind:countriesAndTowns="countriesAndTowns"/>
                    <!--                            @select="select"-->

                    <v-text-field
                            readonly
                            label="Страна"
                            outlined>
                        <!--                            v-model="selected.country"-->

                    </v-text-field>
                    <v-text-field
                            readonly
                            label="Город"
                            outlined>
                        <!--                            v-model="selected.town"-->

                    </v-text-field>
                    <v-text-field
                            label="Улица"
                            outlined
                    ></v-text-field>
                    <v-text-field
                            label="Ссылка на изображение"
                            outlined
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row align-content="start">
                <v-col cols="12" md="6">
                    <v-btn class="mb-8"
                           color="info"
                           block
                           elevation="2"
                           large>
                        <!--                           @click="submit"-->
                        Добавить
                    </v-btn>
                    <v-btn
                            color="info"
                            block
                            elevation="2"
                            large
                            @click="resetForm"
                    >Отменить
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import ChooseOfTown from "../components/ChooseOfTown.vue";

    export default {
        name: "AddingDiscount",
        components: {ChooseOfTown},
        data() {
            return {
                title: '',
                vendor: '',
                dialog: false,
                valid: true,
                nameRules: [],
                picker: new Date().toISOString().substr(0, 10),
                dateStart: new Date().toISOString().substr(0, 10),
                dateFinish: new Date().toISOString().substr(0, 10),
                menu: false,
                menuFinish: false,
                countriesAndTowns: [
                    {id: 1, town: 'Grodno', country: 'Belarus'},
                    {id: 2, town: 'Minsk', country: 'Belarus'},
                    {id: 3, town: 'Kiev', country: 'Ukraine'}],
                // selected: {},
            }
        },

        methods: {
            // ...mapActions(['goFetch']),
            // ...mapMutations(['createDiscount']),
            // submit() {
            //     if (this.$refs.form.validate()) {
            //         this.createDiscount({
            //             title: this.title,
            //             id: Date.now()
            //         });
            //         this.$refs.form.reset()
            //     }
            // },
            resetForm() {
                this.$refs.form.reset()
            }
            // redirectToIS4() {
            //     console.log('You was redirected')
            //     this.$router.push('/identity')
            // },
            //     select (town) {
            //         this.selected = town
            //         this.listmodel = false
            //     }
            // },

            // computed: mapGetters(['allDiscounts']),
            // async mounted() {
            //     this.goFetch('https://jsonplaceholder.typicode.com/posts')
            // }
        }
    }
</script>


<style scoped>

</style>