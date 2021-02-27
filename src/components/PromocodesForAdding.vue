<template>
    <v-list>
        <v-list-group
                color="teal accent-3"
                prepend-icon="mdi-format-list-numbers"
                :value="true"
        >
            <template v-slot:activator>
                <v-list-item-title>{{$t('promocodes')}}</v-list-item-title>
            </template>
            <v-text-field :label="this.$t('countActivePromocodePerUser')"
                          @keydown.enter="nothing"
                          v-model="countActivePromocodePerUser"
                          @change="handler"
                          :rules="numberOnly"

            ></v-text-field>
            <v-text-field :label="this.$t('daysDurationPromocode')"
                          @keydown.enter="nothing"
                          v-model="daysDurationPromocode"
                          @change="handler"
                          :rules="numberOnly"
            ></v-text-field>
            <v-text-field :label="this.$t('countSymbolsPromocode')"
                          @keydown.enter="nothing"
                          v-model="countSymbolsPromocode"
                          @change="handler"
                          :rules="numberOnly"
            ></v-text-field>
            <v-text-field :label="this.$t('timeLimitAddingInSeconds')"
                          @keydown.enter="nothing"
                          v-model="timeLimitAddingInSeconds"
                          @change="handler"
                          :rules="numberOnly"
            ></v-text-field>
        </v-list-group>
    </v-list>
</template>

<script>
    import axios from "axios";

    export default {
        name: "PromocodesForAdding",
        data: () => ({
                countActivePromocodePerUser: null,
                daysDurationPromocode: null,
                countSymbolsPromocode: null,
                timeLimitAddingInSeconds: null,
                numberOnly: [v => /^-?\d*(\.\d+)?/.test(v) || 'The fiesld must contain only numbers'],
            }
        ),
        props: ['item1'],
        methods: {
            handler() {
                this.$emit('selectedPromos', this.countActivePromocodePerUser,
                    this.daysDurationPromocode, this.countSymbolsPromocode, this.timeLimitAddingInSeconds);
            },
            nothing(event) {
                event.preventDefault();
            },
        },
        async mounted() {
            if (this.$route.params.placeOfCall === 'editingOfDiscount') {
                const id = this.$route.params.idOfDiscount;
                const response = await axios.get(`https://localhost:9001/api/v1/discounts/upsert/get/${id}`);
                const discount = response.data;
                this.countActivePromocodePerUser = discount.promocodeOptions.countActivePromocodePerUser
                this.daysDurationPromocode = discount.promocodeOptions.daysDurationPromocode
                this.countSymbolsPromocode = discount.promocodeOptions.countSymbolsPromocode
                this.timeLimitAddingInSeconds = discount.promocodeOptions.timeLimitAddingInSeconds
            }
        }

    }
</script>

<style scoped>

</style>