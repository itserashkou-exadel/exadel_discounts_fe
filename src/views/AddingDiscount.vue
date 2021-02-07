<template>
    <v-container
            class="mb-6 ml-10 mb-15 pr-10 font-weight-regular"
    >
        <router-view/>
        <v-form v-model="valid" ref="form">
            <v-row
                    align-content="center"
                    no-gutters
            >
                <v-col cols="12" class="pb-5 pt-5"
                >
                    <div class="d-flex">
                        <h1>{{titleOfPage()}}</h1>

                        <v-switch
                                class="ml-10"
                                v-model="switchInAd"
                                :label="`${switchInAd ? 'RU' : 'EN'}`"
                        ></v-switch>
                    </div>
                </v-col>
            </v-row>
            <v-row
                    no-gutsters
                    class="d-flex justify-space-between"
            >
                <v-col cols="12" md="5">
                    <div
                            v-for="(item, i) in fieldsForDiscount()"
                            :key="i">
                        <div class="d-flex align-content-center">
                            <v-text-field v-if="i === 0 || i === 1 || i === 2 || i === 3"
                                    :placeholder=item.placeholderAd
                                    v-model="item.modelRu"
                                    :label=item.labelAd
                                    outlined>
                            </v-text-field>
                            <v-textarea v-if="i === 4"
                                          :placeholder=item.placeholderAd
                                          v-model="item.modelRu"
                                          :label=item.labelAd
                                          outlined>
                            </v-textarea>
                            <v-icon
                                    large
                                    color="orange darken-2"
                                    @click="changeExpand(item, i)"
                            >
                                mdi-arrow-down-bold-box-outline
                            </v-icon>
                        </div>
                        <v-expand-transition>
                            <v-text-field v-if="i === 0 || i === 1 || i === 2 || i === 3"
                                    v-show='trueOrFalseArr[i]'
                                    :placeholder=item.placeholderAd
                                    v-model=item.modelEn
                                    :label=item.labelAd
                                    outlined
                            ></v-text-field>
                            <v-textarea v-if="i === 4"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder=item.placeholderAd
                                          v-model=item.modelEn
                                          :label=item.labelAd
                                          outlined
                            ></v-textarea>
                        </v-expand-transition>
                    </div>
                    <div
                            class="d-flex align-content-center"
                    >
                        <span
                                class="pt-4 pr-2"
                        >{{$t('adFrom')}}</span>
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
                                    {{$t('dtCancel')}}
                                </v-btn>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(dateStart)"
                                >
                                    {{$t('dtOk')}}
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <span
                                class="pt-4 pr-2"
                        >{{$t('adTo')}}</span>
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
                                    {{$t('dtCancel')}}
                                </v-btn>
                                <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menuFinish.save(dateFinish)"
                                >
                                    {{$t('dtOk')}}
                                </v-btn>
                            </v-date-picker>
                        </v-menu>
                    </div>
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountPicture')"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                    <ChooseOfTown
                            v-bind:countriesAndTowns="countriesAndTowns"/>
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountStreet')"
                            outlined
                    ></v-text-field>
                    <Map/>
                </v-col>
            </v-row>
            <v-row
                    class="d-flex">
                <v-col cols="12" md="4">
                    <v-btn class="mb-8"
                           color="info"
                           block
                           elevation="2"
                           large
                           @click="submit"
                    >
                        {{titleOfButton()}}
                    </v-btn>
                </v-col>
                <v-col cols="12" md="2"></v-col>
                <v-col cols="12" md="4">
                    <v-btn
                            color="info"
                            block
                            elevation="2"
                            large
                            @click="resetForm"
                    >{{$t('adCancel')}}
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
    import {mapGetters, mapMutations, mapActions} from 'vuex'
    import ChooseOfTown from "../components/ChooseOfTown.vue";
    import CountryFlag from 'vue-country-flag'
    import Map from "@/components/Map/Map";


    export default {
        name: "AddingDiscount",
        components: {ChooseOfTown, CountryFlag, Map},
        data() {
            return {
                switchInAd: true,
                titleRu: '',
                titleEn: '',
                expandT: false,
                valueOfDiscountRu: '',
                valueOfDiscountEn: '',
                vendorRu: '',
                vendorEn: '',
                tagsRu: '',
                tagsEn: '',
                descriptionRu: '',
                descriptionEn: '',
                trueOrFalseArr: [false, false, false, false, false],
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
                    {id: 3, town: 'Kiev', country: 'Ukraine'}]
            }
        },
        methods: {
            changeExpand(item, i) {
                this.trueOrFalseArr[i] = !this.trueOrFalseArr[i]
                this.expandT = !this.expandT;
            },
            fieldsForDiscount() {
                return [
                    {
                        placeholderAd: this.$t('adLabelOfDiscountTitle'),
                        modelRu: this.titleRu,
                        modelEn: this.titleEn,
                        labelAd: this.$t('adLabelOfDiscountTitle'),
                        expand: this.expandT
                    },
                    {
                        placeholder: this.$t('adLabelOfDiscountDiscount'),
                        modelRu: this.valueOfDiscountRu,
                        modelEn: this.valueOfDiscountEn,
                        labelAd: this.$t('adLabelOfDiscountDiscount')
                    },
                    {
                        placeholder: this.$t('adLabelOfDiscountVendor'),
                        modelRu: this.vendorRu,
                        modelEn: this.vendorEn,
                        labelAd: this.$t('adLabelOfDiscountVendor')
                    },
                    {
                        placeholder: this.$t('adLabelOfDiscountTags'),
                        modelRu: this.tagsRu,
                        modelEn: this.tagsEn,
                        labelAd: this.$t('adLabelOfDiscountTags')

                    },
                    {
                        placeholder: this.$t('adLabelOfDiscountDescription'),
                        modelRu: this.descriptionRu,
                        modelEn: this.descriptionEn,
                        labelAd: this.$t('adLabelOfDiscountDescription')
                    },

                ]
            },
            moduleEn(item) {
                if (this.switchInAd) {
                    return item.modelEn
                } else {
                    return item.modelRu
                }
            },
            ...mapActions(['goFetch', 'addDiscount', 'updateDiscount']),
            languageInAd() {
                if (this.$route.params.lang == "Ru") {
                    return "русском языке"
                } else {
                    return "English"
                }
            },
            submit(item) {
                if (this.$refs.form.validate()) {
                    if (this.$route.params.placeOfCall == 'newDiscount') {
                        this.addDiscount({
                            titleRu: this.titleRu,
                            id: Date.now()
                        })
                    } else {
                        this.updateDiscount(item)
                    }
                    this.$refs.form.reset()
                }
            },
            resetForm() {
                this.$refs.form.reset()
            },
            titleOfPage() {
                if (this.$route.params.placeOfCall == 'newDiscount') {
                    return this.$tc('adEditingNewDiscount', 2)
                } else {
                    return this.$tc('adEditingNewDiscount', 1)
                }
            },
            titleOfButton() {
                if (this.$route.params.placeOfCall == 'newDiscount') {
                    return this.$tc('adAddSave', 1)
                } else {
                    return this.$tc('adAddSave', 2);
                }
            }
        },

        computed: mapGetters(['allDiscounts', 'discountById', 'language']),
        mounted() {

            this.goFetch('');
        },
        created() {
            if (this.$route.params.placeOfCall == 'editingOfDiscount') {
                const id = this.$router.params.idOfDiscount;
                const discount = this.discountById(id);
                this.title = discount.title;
            }
        }
    }
</script>
<style scoped>

</style>
