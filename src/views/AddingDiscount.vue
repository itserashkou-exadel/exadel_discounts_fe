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
                    <h1>{{titleOfPage()}}</h1>
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
                            <v-text-field v-if="i === 0 && $i18n.locale === 'ru'"
                                          :key="componentKey"
                                          :placeholder='$i18n.locale === "ru" ? item.placeholderRu : item.placeholderEn'
                                          v-model='titleRu'
                                          :label='$i18n.locale === "ru" ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 0 && $i18n.locale === 'en'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='titleEn'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 1 && $i18n.locale === 'ru'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='vendorRu'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 1 && $i18n.locale === 'en'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='vendorEn'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 2 && $i18n.locale === 'ru'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='vendorDescrRu'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 2 && $i18n.locale === 'en'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='vendorDescrEn'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 3 && $i18n.locale === 'ru'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='tagsRu'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-text-field v-if="i === 3 && $i18n.locale === 'en'"
                                          :key="componentKey"
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                          v-model='tagsEn'
                                          :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                          outlined>
                            </v-text-field>
                            <v-textarea v-if="i === 4 && $i18n.locale === 'ru'"
                                        :key="componentKey"
                                        :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                        v-model='descriptionRu'
                                        :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
                                        outlined>
                            </v-textarea>
                            <v-textarea v-if="i === 4 && $i18n.locale === 'en'"
                                        :key="componentKey"
                                        :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'
                                        v-model='descriptionEn'
                                        :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'
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
                            <v-text-field v-if="i === 0 && ($i18n.locale === 'ru')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model="titleEn"
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 0 && ($i18n.locale === 'en')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model="titleRu"
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 1 && ($i18n.locale === 'ru')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model='vendorEn'
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 1 && ($i18n.locale === 'en')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model='vendorRu'
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 2 && ($i18n.locale === 'ru')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model='vendorDescrEn'
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 2 && ($i18n.locale === 'en')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model='vendorDescrRu'
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 3 && ($i18n.locale === 'ru')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model='tagsEn'
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-text-field v-if="i === 3 && ($i18n.locale === 'en')"
                                          :key="componentKey"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                          v-model='tagsRu'
                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                          outlined
                            ></v-text-field>
                            <v-textarea v-if="i === 4 && ($i18n.locale === 'ru')"
                                        :key="componentKey"
                                        v-show='trueOrFalseArr[i]'
                                        :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                        v-model='descriptionEn'
                                        :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                        outlined
                            ></v-textarea>
                            <v-textarea v-if="i === 4 && ($i18n.locale === 'en')"
                                        :key="componentKey"
                                        v-show='trueOrFalseArr[i]'
                                        :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'
                                        v-model='descriptionRu'
                                        :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'
                                        outlined
                            ></v-textarea>
                        </v-expand-transition>
                    </div>
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountVendorPhone')"
                            :placeholder="this.$t('adLabelOfDiscountVendorPhone')"
                            outlined
                            v-model="vendorPhone"
                    ></v-text-field>
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountVendorEmail')"
                            :placeholder="this.$t('adLabelOfDiscountVendorEmail')"
                            outlined
                            v-model="vendorEmail"
                    ></v-text-field>
                    <v-combobox
                            v-model="vendorSelectedDays"
                            :items="daysOfWeek"
                            :label="this.$t('adLabelOfDiscountVendorWorkHours')"
                            :placeholder="this.$t('adLabelOfDiscountVendorWorkHours')"
                            multiple
                            outlined
                    ></v-combobox>
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountDiscount')"
                            :placeholder="this.$t('adLabelOfDiscountDiscount')"
                            outlined
                            v-model="valueOfDiscount"
                    ></v-text-field>
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
                            v-bind:countries="countries"
                            v-bind:cities="cities"
                            v-bind:selectCity="selectCity"
                            v-bind:selectCountry="selectCountry"
                            v-on:selectedCountryForObj='selCountry'
                            v-on:selectedCityForObj='selCity'
                    />
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountStreet')"
                            outlined
                            v-model="street"
                            @input="selectLine"
                    ></v-text-field>
                    <div class="mr-10">
                        <AddDiscountMap v-bind:address="address"/>
                    </div>
                    <v-text-field
                            class="mt-10"
                            :label="this.$t('adLabelOfDiscountCoordinatesLatitude')"
                            :placeholder="this.$t('adLabelOfDiscountCoordinatesLatitude')"
                            outlined
                            v-model="coordinate1"
                    ></v-text-field>
                    <v-text-field
                            :label="this.$t('adLabelOfDiscountCoordinatesLongitude')"
                            :placeholder="this.$t('adLabelOfDiscountCoordinatesLongitude')"
                            outlined
                            v-model="coordinate2"
                    ></v-text-field>
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
<!--        <p>{{allCountries}}</p>-->
    </v-container>
</template>

<script>
    import AuthService from "@/services/auth.service";
    const moment = require('moment')
    import {mapGetters, mapMutations, mapActions, mapState} from 'vuex'
    import ChooseOfTown from "../components/ChooseOfTown.vue";
    import CountryFlag from 'vue-country-flag'
    import AddDiscountMap from "@/components/Map/AddDiscountMap";
    import { v4 as uuidv4 } from 'uuid'
    import axios from 'axios'
    const auth = new AuthService();
    import Vue from 'vue'
    import paginationMixin from '@/mixins/pagination.mixin'


    export default {
        name: "AddingDiscount",
        mixins: [paginationMixin],
        components: {ChooseOfTown, CountryFlag, AddDiscountMap},
        data() {
            return {
                componentKey: 0,
                countries: [],
                cities: [],
                switchAd: true,
                daysOfWeek: [`${this.$t('Monday')}`, `${this.$t('Tuesday')}`, `${this.$t('Wednesday')}`, `${this.$t('Thursday')}`, `${this.$t('Friday')}`, `${this.$t('Saturday')}`, `${this.$t('Sunday')}`],
                street: null,
                coordinate1: null,
                coordinate2: null,
                selectedCountry: null,
                selectedCity: null,
                ...mapState(['discounts']),
                titleRu: '',
                titleEn: '',
                expandT: false,
                valueOfDiscount: '',
                vendorRu: '',
                vendorEn: '',
                vendorDescrRu: '',
                vendorDescrEn: '',
                tagsRu: '',
                tagsEn: '',
                descriptionRu: '',
                descriptionEn: '',
                vendorPhone: '',
                vendorEmail: '',
                vendorSelectedDays: [],
                trueOrFalseArr: [false, false, false, false, false],
                dialog: false,
                valid: true,
                nameRules: [],
                picker: new Date().toISOString().substr(0, 10),
                dateStart: new Date().toISOString().substr(0, 10),
                dateFinish: new Date().toISOString().substr(0, 10),
                menu: false,
                menuFinish: false,
                address: {
                    country: null,
                    city: null,
                    line: null
                }
            }
        },
        methods: {
            selCountry: function (country) {
                this.selectedCountry = country
                axios.get(`https://localhost:9001/api/v1/addresses/all/Ru/cities/${this.selectedCountry}`)
                    .then((response) => {
                        this.cities = response.data
                    })
            },
            selCity: function (city) {
                this.selectedCity = city
            },
            changeExpand(item, i) {
                this.trueOrFalseArr[i] = !this.trueOrFalseArr[i];
                this.expandT = !this.expandT;
               // this.componentKey += 1;
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
                        expandT: this.expandT
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
                        placeholderRu: this.$t('adLabelOfDiscountVendorDescrRu'),
                        placeholderEn: this.$t('adLabelOfDiscountVendorDescrEn'),
                        modelRu: this.vendorDescrRu,
                        modelEn: this.vendorDescrEn,
                        labelRu: this.$t('adLabelOfDiscountVendorDescrRu'),
                        labelEn: this.$t('adLabelOfDiscountVendorDescrEn'),
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

            objectWithoutId() {
                return {
                    //id: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                    name: this.titleRu,
                    description: "string",
                    amountOfDiscount: 0,
                    startDate: "2021-02-17T08:26:34.109Z",
                    endDate: "2022-02-17T08:26:34.109Z",
                    address: {
                        country: "Беларусь",
                        city: "Белгород",
                        street: "string",
                        location: {
                            latitude: 85,
                            longitude: 33
                        }
                    },
                    company: {
                        name: "string",
                        description: "string",
                        phoneNumber: "string",
                        mail: "string"
                    },
                    workingDaysOfTheWeek: "0011001",
                    tags: [
                        "Меха"
                    ],
                    language: "Ru",
                    translations: [
                        {
                            name: "string",
                            description: "string",
                            address: {
                                country: "Belarus",
                                city: "Belgorod",
                                street: "string",
                                location: {
                                    latitude: 0,
                                    longitude: 0
                                }
                            },
                            company: {
                                name: "string",
                                description: "string",
                                phoneNumber: "string",
                                mail: "string"
                            },
                            tags: [
                                "String"
                            ],
                            language: "Ru"
                        }
                    ]
                    // id: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                    // name: "string",//this.titleRu,
                    // description: "string", //this.descriptionRu,
                    // amountOfDiscount: 20, //this.valueOfDiscount,
                    // startDate: "2021-02-17T08:26:34.109Z",//{$date: this.dateStart},
                    // endDate: "2022-02-17T08:26:34.109Z",//{$date: this.dateFinish},
                    // address: {
                    //     country: "Беларусь", //this.selectedCountry,
                    //     city: "Белгород",//this.selectedCity,
                    //     street: "string", //this.street,
                    //     location: {
                    //         latitude: 85,//this.coordinate1,
                    //         longitude: 33, //this.coordinate2
                    //     }
                    // },
                    // company: {
                    //     name: "string", //this.vendorRu,
                    //     description: "string", //this.vendorDescrRu,
                    //     phoneNumber: "string", //this.vendorPhone,
                    //     mail: "string", //this.vendorEmail
                    // },
                    // workingHours: '0110111',//this.transformateDays(),
                    // tags: [
                    //     'Меха', //this.tagsRu
                    // ],
                    // language: "Ru",
                    // translations: [
                    //     {
                    //         name: "string", //this.titleEn,
                    //         description: "string", //this.descriptionEn,
                    //         address: {
                    //             country: 'Belarus', //this.selectedCountry,
                    //             city: 'Belgorod', //this.selectedCity,
                    //             street: "string", //this.street,
                    //             location: {
                    //                   latitude: 0,
                    //                   longitude: 0
                    //                             }
                    //         },
                    //         company: {
                    //             name: "string", //this.titleEn,
                    //             description: "string", //this.descriptionEn
                    //         },
                    //         tags: [
                    //             'Hhhh', //this.tagsEn
                    //         ],
                    //         language: "Ru"
                    //     }
                    // ]
                }

            },
            submit() {
                const postDiscount = () => {
                    const obj = {
                        id: "3fa85f64-5717-4562-b3fc-2c963f67afa6",
                        name: "string",
                        description: "string",
                        amountOfDiscount: 0,
                        startDate: "2021-02-17T08:26:34.109Z",
                        endDate: "2022-02-17T08:26:34.109Z",
                        address: {
                            country: "Беларусь",
                            city: "Белгород",
                            street: "string",
                            location: {
                                latitude: 85,
                                longitude: 33
                            }
                        },
                        company: {
                            name: "string",
                            description: "string",
                            phoneNumber: "string",
                            mail: "string"
                        },
                        workingDaysOfTheWeek: "0011001",
                        tags: [
                            "Меха"
                        ],
                        language: "Ru",
                        translations: [
                            {
                                name: "string",
                                description: "string",
                                address: {
                                    country: "Belarus",
                                    city: "Belgorod",
                                    street: "string",
                                    location: {
                                        latitude: 0,
                                        longitude: 0
                                    }
                                },
                                company: {
                                    name: "string",
                                    description: "string",
                                    phoneNumber: "string",
                                    mail: "string"
                                },
                                tags: [
                                    "String"
                                ],
                                language: "Ru"
                            }
                        ]
                    };
                    this.addDiscount(
                      //  {...{id: uuidv4()}, ...(this.objectWithoutId())}
                       {...{id: "3fa85f64-5717-4562-b3fc-2c963f67afa6"}, ...(this.objectWithoutId())}
                       // this.objectWithoutId()
                    )

                }
                if (this.$refs.form.validate()) {
                    if (this.$route.params.placeOfCall === 'newDiscount') {

                        //     //     {...{id: uuidv4()}, ...(this.objectWithoutId())}

                        this.getToken(postDiscount);
                    } else {
                        this.updateDiscount({...{_id: this.$route.params.idOfDiscount}, ...(this.objectWithoutId())})
                    }
                    this.$refs.form.reset()
                }
                           },
            resetForm() {
                this.$refs.form.reset();
                this.fillingFields();
                this.componentKey += 1;
            },
            selectLine(value) {
                this.address.line = value;
            },
            selectCountry(value) {
                this.address.country = value;
            },
            selectCity(value) {
                this.address.city = value;
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
            },
            fillingFields() {
                if (this.$route.params.placeOfCall == 'editingOfDiscount') {
                    const id = this.$route.params.idOfDiscount;
                    const discount = this.allDiscounts.find(element => element._id = id);
                    this.titleRu = discount.name;
                    this.titleEn = discount.translations[0].name;
                    this.vendorRu = discount.company.name;
                    this.vendorEn = discount.translations[0].company.name;
                    this.vendorDescrRu = discount.company.description;
                    this.vendorDescrEn = discount.translations[0].company.description;
                    this.tagsRu = discount.tags;
                    this.tagsEn = discount.translations[0].tags;
                    this.descriptionRu = discount.description;
                    this.descriptionEn = discount.translations[0].description;
                    this.vendorPhone = discount.company.phoneNumber;
                    this.vendorEmail = discount.company.mail;
                    this.transformateToDays(discount.workingHours);
                    this.valueOfDiscount = discount.amountOfDiscount;
                    this.dateStart = discount.startDate.$date.substr(0, 10),
                    this.dateFinish =discount.endDate.$date.substr(0, 10),
                    this.selectedCountry = discount.address.country;
                }
            },
            transformateToDays(str) {

                if (str[0] === '1') {
                    this.vendorSelectedDays.push(this.$t('Monday'))
                }
                if (str[1] === '1') {
                    this.vendorSelectedDays.push(this.$t('Tuesday'))
                }
                if (str[2] === '1') {
                    this.vendorSelectedDays.push(this.$t('Wednesday'))
                }
                if (str[3] === '1') {
                    this.vendorSelectedDays.push(this.$t('Thursday'))
                }
                if (str[4] === '1') {
                    this.vendorSelectedDays.push(this.$t('Friday'))
                }
                if (str[5] === '1') {
                    this.vendorSelectedDays.push(this.$t('Saturday'))
                }
                if (str[6] === '1') {
                    this.vendorSelectedDays.push(this.$t('Sunday'))
                }
            },
            transformateDays() {
                let str = '';
                if (this.vendorSelectedDays.indexOf(this.$t('Monday')) != -1) {
                    str = '1'
                } else {
                    str = '0'
                }
                if (this.vendorSelectedDays.indexOf(this.$t('Tuesday')) != -1) {
                    str = `${str}1`
                } else {
                    str = `${str}0`
                }
                if (this.vendorSelectedDays.indexOf(this.$t('Wednesday')) != -1) {
                    str = `${str}1`
                } else {
                    str = `${str}0`
                }
                if (this.vendorSelectedDays.indexOf(this.$t('Thursday')) != -1) {
                    str = `${str}1`
                } else {
                    str = `${str}0`
                }
                if (this.vendorSelectedDays.indexOf(this.$t('Friday')) != -1) {
                    str = `${str}1`
                } else {
                    str = `${str}0`
                }
                if (this.vendorSelectedDays.indexOf(this.$t('Saturday')) != -1) {
                    str = `${str}1`
                } else {
                    str = `${str}0`
                }
                if (this.vendorSelectedDays.indexOf(this.$t('Sunday')) != -1) {
                    str = `${str}1`
                } else {
                    str = `${str}0`
                }
                return str
            },
            ...mapActions(['goFetch', 'addDiscount', 'updateDiscount', 'goFetchForCountries'])
        },
        computed: mapGetters(['allDiscounts', 'language', 'allCountries']),
        mounted() {
            const getCountries = () => {
                axios.get('https://localhost:9001/api/v1/addresses/all/Ru/countries')
                .then((response) => {
                    this.countries = response.data;
                })
                .catch((error) => {
                    alert(error);
                });
            };
            this.getToken(getCountries);
            this.fillingFields();

        }
    }
</script>
<style scoped>
    #addDiscountMap {
        width: 32vw;
        height: 49vh;
    }
</style>