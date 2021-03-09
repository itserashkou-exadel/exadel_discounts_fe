<template>
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
                        @click="saveDateStart"
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
                        @change="giveDateFinish"
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
                        @click="saveDateFinish"
                >
                    {{$t('dtOk')}}
                </v-btn>
            </v-date-picker>
        </v-menu>
    </div>
</template>

<script>
    import token from '@/mixins/token.mixin'
    import axios from "axios";
    export default {
        name: "DatePiker",
        data() {
            return {
                menu: false,
                menuFinish: false,
                picker: new Date().toISOString().substr(0, 10),
                dateStart: '',
                dateFinish: '',
            }
        },
        mixins: [token],
        methods: {
            saveDateStart() {
                this.$refs.menu.save(this.dateStart);
                this.giveDateStart()
            },
            saveDateFinish() {
                this.$refs.menuFinish.save(this.dateFinish);
                this.giveDateFinish()
            },
            giveDateStart() {
                this.$emit('selectedDateStart', this.dateStart);
            },
            giveDateFinish() {
                this.$emit('selectedDateFinish', this.dateFinish);
            },
        },
        async mounted() {
            if (this.$route.params.placeOfCall == 'editingOfDiscount') {
                const id = this.$route.params.idOfDiscount;
                const funcForDate = () => {
                    axios.get(`https://localhost:9001/api/v1/discounts/upsert/get/${id}`).then((response) => {
                            const discount = response.data;
                            this.dateStart = discount.startDate.substr(0, 10),
                                this.dateFinish = discount.endDate.substr(0, 10)
                    }
                    )
                }
                this.getToken(funcForDate)
            }
        }
    }
</script>

<style scoped>

</style>