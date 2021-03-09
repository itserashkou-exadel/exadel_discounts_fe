<template>
    <v-container
            :key="componentKey"
            class="mb-6 ml-10 mb-15 pr-10 font-weight-regular"
    >
        <router-view/>
        <v-form v-model="valid" ref="form"
                @keydown.enter="nothing">
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
                            <v-text-field v-if="i === 0"
                                          @keydown.enter="nothing"
                                          :placeholder='item.placeholderRu'
                                          v-model='titleRu'
                                          :label='item.labelRu'
                                          :rules='nameRules'
                                          outlined>
                            </v-text-field>
<!--                            <v-text-field v-if="i === 0 && $i18n.locale === 'en'"-->
<!--                                          @keydown.enter="nothing"-->
<!--                                          :placeholder='item.placeholderEn'-->
<!--                                          v-model='titleEn'-->
<!--                                          :label='item.labelEn'-->
<!--                                          :rules='nameRules'-->
<!--                                          outlined>-->
<!--                            </v-text-field>-->
                            <v-text-field v-if="i === 1"
                                          @keydown.enter="nothing"
                                          :placeholder='item.placeholderRu'
                                          v-model='vendorRu'
                                          :label='item.labelRu'
                                          :rules='nameRules'
                                          outlined>
                            </v-text-field>
<!--                            <v-text-field v-if="i === 1 && $i18n.locale === 'en'"-->
<!--                                          @keydown.enter="nothing"-->
<!--                                          :placeholder='item.placeholderEn'-->
<!--                                          v-model='vendorEn'-->
<!--                                          :label='item.labelEn'-->
<!--                                          :rules='nameRules'-->
<!--                                          outlined>-->
<!--                            </v-text-field>-->
                            <v-text-field v-if="i === 2"
                                          @keydown.enter="nothing"
                                          :placeholder='item.placeholderRu'
                                          v-model='vendorDescrRu'
                                          :label='item.labelRu'
                                          :rules='nameRules'
                                          outlined>
                            </v-text-field>
<!--                            <v-text-field v-if="i === 2 && $i18n.locale === 'en'"-->
<!--                                          @keydown.enter="nothing"-->
<!--                                          :placeholder='item.placeholderEn'-->
<!--                                          v-model='vendorDescrEn'-->
<!--                                          :label='item.labelEn'-->
<!--                                          :rules='nameRules'-->
<!--                                          outlined>-->
<!--                            </v-text-field>-->
                            <v-textarea v-if="i === 3"
                                        @keydown.enter="nothing"
                                        :placeholder='item.placeholderRu'
                                        v-model='descriptionRu'
                                        :label='item.labelRu'
                                        :rules='nameRules'
                                        outlined>
                            </v-textarea>
<!--                            <v-textarea v-if="i === 3 && $i18n.locale === 'en'"-->
<!--                                        @keydown.enter="nothing"-->
<!--                                        :placeholder='($i18n.locale === "ru") ? item.placeholderRu : item.placeholderEn'-->
<!--                                        v-model='descriptionEn'-->
<!--                                        :label='($i18n.locale === "ru") ? item.labelRu : item.labelEn'-->
<!--                                        :rules='nameRules'-->
<!--                                        outlined>-->
<!--                            </v-textarea>-->
                            <v-icon
                                    large
                                    color="orange darken-2"
                                    @click="changeExpand(item, i)"
                            >
                                mdi-arrow-down-bold-box-outline
                            </v-icon>
                        </div>
                        <v-expand-transition>
                            <v-text-field v-if="i === 0"
                                          @keydown.enter="nothing"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='item.placeholderEn'
                                          v-model="titleEn"
                                          :label='item.labelEn'
                                          outlined
                                          :rules='nameRules'
                            ></v-text-field>
<!--                            <v-text-field v-if="i === 0 && ($i18n.locale === 'en')"-->
<!--                                          @keydown.enter="nothing"-->
<!--                                          v-show='trueOrFalseArr[i]'-->
<!--                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'-->
<!--                                          v-model="titleRu"-->
<!--                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'-->
<!--                                          outlined-->
<!--                            ></v-text-field>-->
                            <v-text-field v-if="i === 1"
                                          @keydown.enter="nothing"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='item.placeholderEn'
                                          v-model='vendorEn'
                                          :label='item.labelEn'
                                          outlined
                                          :rules='nameRules'
                            ></v-text-field>
<!--                            <v-text-field v-if="i === 1 && ($i18n.locale === 'en')"-->
<!--                                          @keydown.enter="nothing"-->
<!--                                          v-show='trueOrFalseArr[i]'-->
<!--                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'-->
<!--                                          v-model='vendorRu'-->
<!--                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'-->
<!--                                          outlined-->
<!--                            ></v-text-field>-->
                            <v-text-field v-if="i === 2"
                                          @keydown.enter="nothing"
                                          v-show='trueOrFalseArr[i]'
                                          :placeholder='item.placeholderEn'
                                          v-model='vendorDescrEn'
                                          :label='item.labelEn'
                                          outlined
                                          :rules='nameRules'
                            ></v-text-field>
<!--                            <v-text-field v-if="i === 2 && ($i18n.locale === 'en')"-->
<!--                                          @keydown.enter="nothing"-->
<!--                                          v-show='trueOrFalseArr[i]'-->
<!--                                          :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'-->
<!--                                          v-model='vendorDescrRu'-->
<!--                                          :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'-->
<!--                                          outlined-->
<!--                            ></v-text-field>-->
                            <v-textarea v-if="i === 3"
                                        @keydown.enter="nothing"
                                        v-show='trueOrFalseArr[i]'
                                        :placeholder='item.placeholderEn'
                                        v-model='descriptionEn'
                                        :label='item.labelEn'
                                        outlined
                                        :rules='nameRules'
                            ></v-textarea>
<!--                            <v-textarea v-if="i === 3 && ($i18n.locale === 'en')"-->
<!--                                        @keydown.enter="nothing"-->
<!--                                        v-show='trueOrFalseArr[i]'-->
<!--                                        :placeholder='($i18n.locale === "ru") ? item.placeholderEn : item.placeholderRu'-->
<!--                                        v-model='descriptionRu'-->
<!--                                        :label='($i18n.locale === "ru") ? item.labelEn : item.labelRu'-->
<!--                                        outlined-->
<!--                            ></v-textarea>-->
                        </v-expand-transition>
                    </div>
<!--                    <TableAndMap/>-->
                    <chips-for-tags
                                    v-bind:icon-show="true"
                                    v-bind:tags="tagsRu"
                                    v-on:tagShow="changeTagShow"
                                    v-on:sendTags="setTagsRu"
                                    :rules='nameRules'
                    />
<!--                    <chips-for-tags v-if="$i18n.locale === 'en'"-->
<!--                                    v-bind:icon-show="true"-->
<!--                                    v-bind:tags="tagsEn"-->
<!--                                    v-on:tagShow="changeTagShow"-->
<!--                                    v-on:sendTags="setTagsEn"-->
<!--                    />-->
                    <chips-for-tags
                                    v-show="tagShowAd"
                                    v-bind:tags="tagsEn"
                                    v-bind:icon-show="false"
                                    v-on:sendTags="setTagsEn"
                                    :rules='nameRules'
                    />
<!--                    <chips-for-tags v-if="$i18n.locale === 'en'"-->
<!--                                    v-show="tagShowAd"-->
<!--                                    v-bind:tags="tagsRu"-->
<!--                                    v-bind:icon-show="false"-->
<!--                                    v-on:sendTags="setTagsRu"-->
<!--                    />-->
                    <v-text-field
                            @keydown.enter="nothing"
                            :label="this.$t('adLabelOfDiscountVendorPhone')"
                            :placeholder="this.$t('adLabelOfDiscountVendorPhone')"
                            outlined
                            v-model="vendorPhone"
                            :rules='nameRules'
                    ></v-text-field>
                    <v-text-field
                            @keydown.enter="nothing"
                            :label="this.$t('adLabelOfDiscountVendorEmail')"
                            :placeholder="this.$t('adLabelOfDiscountVendorEmail')"
                            outlined
                            v-model="vendorEmail"
                            :rules='emailRules'
                    ></v-text-field>
                    <v-combobox
                            v-model="vendorSelectedDays"
                            :items="daysOfWeek"
                            :label="this.$t('adLabelOfDiscountVendorWorkHours')"
                            :placeholder="this.$t('adLabelOfDiscountVendorWorkHours')"
                            multiple
                            outlined
                            :rules='nameRules'
                    ></v-combobox>
                    <v-text-field
                            @keydown.enter="nothing"
                            :label="this.$t('adLabelOfDiscountDiscount')"
                            :placeholder="this.$t('adLabelOfDiscountDiscount')"
                            outlined
                            v-model="valueOfDiscount"
                            :rules='onlyNumberRules'
                    ></v-text-field>
                    <date-piker
                            v-on:selectedDateStart="selectedDateStart"
                            v-on:selectedDateFinish="selectedDateFinish"
                    />
                    <v-text-field
                            v-model="picture"
                            @keydown.enter="nothing"
                            :label="this.$t('adLabelOfDiscountPicture')"
                            outlined
                    ></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                    <ChooseOfTown
                            v-on:selectedCountryForObj='selCountry'
                            v-on:selectedCityForObj='selCity'
                    />
                    <v-text-field
                            @keydown.enter="nothing"
                            :label="this.$t('adLabelOfDiscountStreet')"
                            outlined
                            v-model="street"
                            @input="selectLine"
                            :rules='nameRules'
                    ></v-text-field>

                    <AddDiscountMap v-bind:address="address"

                                    :updateCoordinates="updateCoordinates"/>

                    <v-text-field
                            @keydown.enter="nothing"
                            class="mt-10"
                            :label="this.$t('adLabelOfDiscountCoordinatesLatitude')"
                            :placeholder="this.$t('adLabelOfDiscountCoordinatesLatitude')"
                            outlined
                            v-model="coordinate1"
                            :rules='onlyNumberRules'
                    ></v-text-field>
                    <v-text-field
                            @keydown.enter="nothing"
                            :label="this.$t('adLabelOfDiscountCoordinatesLongitude')"
                            :placeholder="this.$t('adLabelOfDiscountCoordinatesLongitude')"
                            outlined
                            v-model="coordinate2"
                            :rules='onlyNumberRules'
                    ></v-text-field>
                  <v-checkbox
                      v-model="enabledPromocodes"
                  ></v-checkbox>
                    <PromocodesForAdding
                            v-bind:item1="promo1"
                            v-on:selectedPromos="getPromo"
                            v-if="enabledPromocodes"
                    />
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
                    <v-dialog
                            v-model="dialog"
                            persistent
                            max-width="290"
                    >
                        <v-card>
                            <v-card-title class="headline" v-if="val">
                                {{$t('adServeAreAdded')}}
                            </v-card-title>
                            <v-card-text>
                                {{titleOfField()}}
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="green darken-1"
                                        text
                                        @click="dialog = false"
                                >
                                    {{titleOfButtonOfCard()}}
                                </v-btn>
                                <v-btn
                                        color="green darken-1"
                                        text
                                        @click="agree"
                                        v-if="val"
                                >
                                    {{$t('adAgree')}}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
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
    import {mapActions, mapGetters} from 'vuex'
    import ChooseOfTown from "../components/ChooseOfTown.vue";
    import AddDiscountMap from "@/components/Map/AddDiscountMap";
    import {v4 as uuidv4} from 'uuid';
    import token from '@/mixins/token.mixin'
    import DatePiker from "@/components/DatePiker";
    import axios from "axios";
    import ChipsForTags from "@/components/ChipsForTags";
    import PromocodesForAdding from "@/components/PromocodesForAdding";

    export default {
        name: "AddingDiscount",
        data() {
            return {
                promo1: 0,
                promo2: 0,
                promo3: 0,
                promo4: 0,
                tagShowAd: false,
                val: true,
                dialog: false,
                componentKey: 0,
                countries: [],
                cities: [],
                switchAd: true,
                daysOfWeek: [`${this.$t('Monday')}`, `${this.$t('Tuesday')}`, `${this.$t('Wednesday')}`, `${this.$t('Thursday')}`, `${this.$t('Friday')}`, `${this.$t('Saturday')}`, `${this.$t('Sunday')}`],
                street: '',
                coordinate1: null,
                coordinate2: null,
                selectedCountry: '',
                selectedCity: '',
                titleRu: '',
                titleEn: '',
                expandT: false,
                valueOfDiscount: '',
                vendorRu: '',
                vendorEn: '',
                vendorDescrRu: '',
                vendorDescrEn: '',
                tagsRu: [],
                tagsEn: [],
                descriptionRu: '',
                descriptionEn: '',
                vendorPhone: '',
                vendorEmail: '',
                vendorSelectedDays: [],
                picture: '',
                trueOrFalseArr: [false, false, false, false],
                dialog: false,
                valid: true,
                nameRules: [v => (v && v.length > 0) || this.$t('theFieldCantBeEmpty')],
                onlyNumberRules: [v => /^-?\d*(\.\d+)?$/.test(v) || this.$t('onlyNumbers')],
                emailRules: [v => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i.test(v) || this.$t('emailIsNotCorrectly')],
                dateStart: '',
                dateFinish: '',
                address: {
                    country: null,
                    city: null,
                    line: null
                },
                discount: null,
              enabledPromocodes: true
            }
        },
        mixins: [token],
        components: {DatePiker, ChooseOfTown, AddDiscountMap, ChipsForTags, PromocodesForAdding},
        methods: {
            getPromo (promo1, promo2, promo3, promo4) {
                this.promo1 = promo1;
                this.promo2 = promo2;
                this.promo3 = promo3;
                this.promo4 = promo4;
            },
            setTagsRu(tags) {

                this.tagsRu = tags
            },
            setTagsEn(tags) {
                this.tagsEn = tags
            },
            changeTagShow(show) {
                this.tagShowAd = show
            },
            updateCoordinates(lng, lat) {
                this.coordinate2 = lng;
                this.coordinate1 = lat;
            },
            titleOfField() {
                if (this.val) {
                    return this.$tc('adClearOrEdit', 1)
                } else {
                    return this.$tc('adClearOrEdit', 2);
                }
            },
            titleOfButtonOfCard() {
                if (this.val) {
                    return this.$tc('adTitleOfButtonOfCard', 1)
                } else {
                    return this.$tc('adTitleOfButtonOfCard', 2);
                }
            },
            nothing(event) {
                event.preventDefault()
            },
            agree() {
                this.dialog = false;
                this.$refs.form.reset();
            },
            selCountry: function (country) {
                this.selectedCountry = country
                this.address.country = country
            },
            selCity: function (city) {
                this.selectedCity = city
                this.address.city = city
            },
            selectedDateStart: function (dateStart) {
                this.dateStart = dateStart
            },
            selectedDateFinish: function (dateFinish) {
                this.dateFinish = dateFinish
            },
            changeExpand(item, i) {
                this.trueOrFalseArr[i] = !this.trueOrFalseArr[i];
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
                        name: this.titleRu,
                        description: this.descriptionRu,
                        amountOfDiscount: this.valueOfDiscount,
                        startDate: this.dateStart,
                        endDate: this.dateFinish,
                        address: {
                            country: this.$i18n.locale === 'ru' ? this.selectedCountry : this.selectedCountry,
                            city: this.$i18n.locale === 'ru' ? this.selectedCity : this.selectedCity,
                            street: this.street,
                            location: {
                                latitude: this.coordinate1,
                                longitude: this.coordinate2
                            }
                        },
                        company: {
                            name: this.vendorRu,
                            description: this.vendorDescrRu,
                            phoneNumber: this.vendorPhone,
                            mail: this.vendorEmail
                        },
                        workingDaysOfTheWeek: this.transformateDays(),
                        pictureUrl: this.picture,
                        tags: this.tagsRu,
                        promocodeOptions: {
                        enabledPromocodes: this.enabledPromocodes,
                        countActivePromocodePerUser: this.promo1,
                        daysDurationPromocode: this.promo2,
                        countSymbolsPromocode: this.promo3,
                        timeLimitAddingInSeconds: this.promo4},
                        language: "Ru",
                        translations: [
                            {
                                name: this.titleEn,
                                description: this.descriptionEn,
                                address: {
                                    country: this.$i18n.locale === 'en' ? this.selectedCountry : this.selectedCity,
                                    city: this.$i18n.locale === 'en' ? this.selectedCountry : this.selectedCity,
                                    street: this.street,
                                    location: {
                                        latitude: this.coordinate1,
                                        longitude: this.coordinate2
                                    }
                                },
                                company: {
                                    name: this.vendorEn,
                                    description: this.vendorDescrEn,
                                    phoneNumber: this.vendorPhone,
                                    mail: this.vendorEmail
                                },
                                tags: this.tagsEn
                                ,
                                language: "En"
                            }
                        ]
                    }
                // if (this.$i18n.locale === 'en') {
                //     return {
                //         name: this.titleEn,
                //         description: this.descriptionEn,
                //         amountOfDiscount: this.valueOfDiscount,
                //         startDate: this.dateStart,
                //         endDate: this.dateFinish,
                //         address: {
                //             country: this.selectedCountry,
                //             city: this.selectedCity,
                //             street: this.street,
                //             location: {
                //                 latitude: this.coordinate1,
                //                 longitude: this.coordinate2
                //             }
                //         },
                //         company: {
                //             name: this.vendorEn,
                //             description: this.vendorDescrEn,
                //             phoneNumber: this.vendorPhone,
                //             mail: this.vendorEmail
                //         },
                //         workingDaysOfTheWeek: this.transformateDays(),
                //         tags: this.tagsEn,
                //         promocodeOptions: {
                //             countActivePromocodePerUser: this.promo1,
                //             daysDurationPromocode: this.promo2,
                //             countSymbolsPromocode: this.promo3,
                //             timeLimitAddingInSeconds: this.promo4},
                //         language: "En",
                //         translations: [
                //             {
                //                 name: this.titleRu,
                //                 description: this.descriptionRu,
                //                 address: {
                //                     country: this.selectedCountry,
                //                     city: this.selectedCity,
                //                     street: this.street,
                //                     location: {
                //                         latitude: this.coordinate1,
                //                         longitude: this.coordinate2
                //                     }
                //                 },
                //                 company: {
                //                     name: this.vendorRu,
                //                     description: this.vendorDescrRu,
                //                     phoneNumber: this.vendorPhone,
                //                     mail: this.vendorEmail
                //                 },
                //                 tags: this.tagsRu,
                //                 language: "Ru"
                //             }
                //         ]
                //     }

            },
            async submit() {
                if (this.$refs.form.validate()) {
                    const postDiscount = () => {
                        if (this.$route.params.placeOfCall === 'newDiscount') {
                            this.addDiscount(
                                {...{id: uuidv4()}, ...(this.objectWithoutId())}
                            ).catch((e) => this.val = false)
                            console.log({...{id: uuidv4()}, ...(this.objectWithoutId())})
                            this.dialog = true
                            this.val = true
                        } else {
                            console.log({...{id: this.$route.params.idOfDiscount}, ...(this.objectWithoutId())});
                            this.updateDiscount(
                                {...{id: this.$route.params.idOfDiscount}, ...(this.objectWithoutId())}
                            ).catch((e) => {this.val = false; this.dialog = true})
                            .then(() => {
                                if (this.val === true)
                                {this.$router.push({name:'home'})}
                            })
                            this.val = true
                        }
                    }
                    await this.getToken(postDiscount)
                } else {
                    this.val = false;
                    this.dialog = true
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
            async fillingFields() {
                if (this.$route.params.placeOfCall == 'editingOfDiscount') {
                    const id = this.$route.params.idOfDiscount;
                    const funcForDisc = () => {
                    axios.get(`https://localhost:9001/api/v1/discounts/upsert/get/${id}`).then((response) => {
                    this.discount = response.data
                    if (this.discount.language === 'Ru') {
                        this.titleRu = this.discount.name;
                        this.titleEn = this.discount.translations[0].name;
                        this.vendorRu = this.discount.company.name;
                        this.vendorEn = this.discount.translations[0].company.name;
                        this.vendorDescrRu = this.discount.company.description;
                        this.vendorDescrEn = this.discount.translations[0].company.description;
                        this.tagsRu = this.discount.tags;
                        this.tagsEn = this.discount.translations[0].tags;
                        this.descriptionRu = this.discount.description;
                        this.descriptionEn = this.discount.translations[0].description
                    }
                    if (this.discount.language === 'En') {
                        this.titleEn = this.discount.name;
                        this.titleRu = this.discount.translations[0].name;
                        this.vendorEn = this.discount.company.name;
                        this.vendorRu = this.discount.translations[0].company.name;
                        this.vendorDescrEn = this.discount.company.description;
                        this.vendorDescrRu = this.discount.translations[0].company.description;
                        this.tagsEn = this.discount.tags;
                        this.tagsRu = this.discount.translations[0].tags;
                        this.descriptionEn = this.discount.description;
                        this.descriptionRu = this.discount.translations[0].description
                    }
                    if (this.$i18n.locale === 'ru') {
                    this.selectedCountry = this.discount.address.country || this.discount.translations[0].address.country;
                    this.selectedCity = this.discount.address.city || this.discount.translations[0].address.city;}
                    if (this.$i18n.locale === 'en') {
                        this.selectedCountry = this.discount.translations[0].address.country || this.discount.address.country;
                        this.selectedCity = this.discount.translations[0].address.city || this.discount.address.city}
                    this.enabledPromocodes = this.discount.promocodeOptions.enabledPromocodes;
                    if (this.discount.promocodeOptions !== undefined) {
                    this.promo1 = this.discount.promocodeOptions.countActivePromocodePerUser,
                    this.promo2 = this.discount.promocodeOptions.daysDurationPromocode,
                    this.promo3 = this.discount.promocodeOptions.countSymbolsPromocode,
                    this.promo4 = this.discount.promocodeOptions.timeLimitAddingInSeconds}
                    this.vendorPhone = this.discount.company.phoneNumber;
                    this.vendorEmail = this.discount.company.mail;
                    this.transformateToDays(this.discount.workingDaysOfTheWeek);
                    this.valueOfDiscount = this.discount.amountOfDiscount;
                    this.dateStart = this.discount.startDate.substr(0, 10);
                    this.dateFinish = this.discount.endDate.substr(0, 10);
                    this.street = this.discount.address.street;
                    this.coordinate1 = this.discount.address.location.latitude;
                    this.coordinate2 = this.discount.address.location.longitude;
                    this.picture = this.discount.pictureUrl || '';
                    })}
                    this.getToken(funcForDisc)
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
            ...mapActions(['goFetch', 'addDiscount', 'updateDiscount', 'goFetchForCountries', 'nextDiscount'])
        },
        computed: {
            ...mapGetters(['allDiscounts', 'language', 'allCountries']),
        created(){
          const auth = this.$store.getters.getAuth
          this.setSecondAuth(auth);
        }
        },
        mounted() {
            this.getCountries();
            this.fillingFields();
        },
    }
</script>
<style scoped>

    #addDiscountMap {

        height: 49vh;
    }
</style>
