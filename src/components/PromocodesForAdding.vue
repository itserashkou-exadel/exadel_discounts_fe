<template>
    <v-list>
        <v-list-group
                color="red"
                prepend-icon="mdi-format-list-numbers"
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
        methods: {

            handler() {
                this.$emit('selectedPromos', this.countActivePromocodePerUser,
                    this.daysDurationPromocode, this.countSymbolsPromocode, this.timeLimitAddingInSeconds);
            },
            nothing(event) {
                event.preventDefault();
            },
        },

    }
</script>

<style scoped>

</style>