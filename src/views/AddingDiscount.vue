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
                                    :placeholder='switchInAd ? item.placeholderRu : item.placeholderEn'
                                    v-model="switchInAd ? item.modelRu : item.modelEn"
                                    :label='switchInAd ? item.labelRu : item.labelEn'
                                    outlined>
                            </v-text-field>
                            <v-textarea v-if="i === 4"
                                        :placeholder='switchInAd ? item.placeholderRu : item.placeholderEn'
                                        v-model="switchInAd ? item.modelRu : item.modelEn"
                                        :label='switchInAd ? item.labelRu : item.labelEn'
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
                                    :placeholder='switchInAd ? item.placeholderEn : item.placeholderRu'
                                    v-model="switchInAd ? item.modelEn : item.modelRu"
                                    :label='switchInAd ? item.labelEn : item.labelRu'
                                    outlined
                            ></v-text-field>
                            <v-textarea v-if="i === 4"
                                        v-show='trueOrFalseArr[i]'
                                        :placeholder='switchInAd ? item.placeholderEn : item.placeholderRu'
                                        v-model="switchInAd ? item.modelEn : item.modelRu"
                                        :label='switchInAd ? item.labelEn : item.labelRu'
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
                    <v-text-field
                            label="координаты"
                            outlined
                    ></v-text-field>
                    <v-text-field
                            label="координаты"
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
                    <div class="mr-10">
                    <Map class="mr-10"/>
                    </div>
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
            <p v-for="(disc, i) in allDiscounts" :key="i">
                {{disc.name}}
            </p>
        </v-form>
    </v-container>
</template>

<script>
    import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'
    import ChooseOfTown from "../components/ChooseOfTown.vue";
    import CountryFlag from 'vue-country-flag'
    import Map from "@/components/Map/Map";


    export default {
        name: "AddingDiscount",
        components: {ChooseOfTown, CountryFlag, Map},
        data() {
            return {
                ...mapState(['discounts']),
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
                        placeholderRu: this.$t('adLabelOfDiscountTitleRu'),
                        placeholderEn: this.$t('adLabelOfDiscountTitleEn'),
                        modelRu: this.titleRu,
                        modelEn: this.titleEn,
                        labelRu: this.$t('adLabelOfDiscountTitleRu'),
                        labelEn: this.$t('adLabelOfDiscountTitleEn'),
                        expand: this.expandT
                    },
                    {
                        placeholderRu: this.$t('adLabelOfDiscountDiscountRu'),
                        placeholderEn: this.$t('adLabelOfDiscountDiscountEn'),
                        modelRu: this.valueOfDiscountRu,
                        modelEn: this.valueOfDiscountEn,
                        labelRu: this.$t('adLabelOfDiscountDiscountRu'),
                        labelEn: this.$t('adLabelOfDiscountDiscountEn'),
                    },
                    {
                        placeholderRu: this.$t('adLabelOfDiscountVendorRu'),
                        placeholderEn: this.$t('adLabelOfDiscountVendorEn'),
                        modelRu: this.vendorRu,
                        modelEn: this.vendorEn,
                        labelRu: this.$t('adLabelOfDiscountVendorRu'),
                        labelEn: this.$t('adLabelOfDiscountVendorEn'),
                    },
                    {
                        placeholderRu: this.$t('adLabelOfDiscountTagsRu'),
                        placeholderEn: this.$t('adLabelOfDiscountTagsEn'),
                        modelRu: this.tagsRu,
                        modelEn: this.tagsEn,
                        labelRu: this.$t('adLabelOfDiscountTagsRu'),
                        labelEn: this.$t('adLabelOfDiscountTagsEn'),

                    },
                    {
                        placeholderRu: this.$t('adLabelOfDiscountDescriptionRu'),
                        placeholderEn: this.$t('adLabelOfDiscountDescriptionEn'),
                        modelRu: this.descriptionRu,
                        modelEn: this.descriptionEn,
                        labelRu: this.$t('adLabelOfDiscountDescriptionRu'),
                        labelEn: this.$t('adLabelOfDiscountDescriptionEn'),
                    },

                ]
            },
            ...mapActions(['goFetch', 'addDiscount', 'updateDiscount']),
            submit() {
                if (this.$refs.form.validate()) {
                    if (this.$route.params.placeOfCall === 'newDiscount') {
                        console.log(55);
                        this.addDiscount({
                            name: 'jjjj',
                            _id: Date.now()
                        })
                    } else {
                        this.updateDiscount(item)
                    }
                    this.$refs.form.reset()
                };
                console.log(this.$store.state.discounts)
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
            this.goFetch('http://localhost:3000/discounts');
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
