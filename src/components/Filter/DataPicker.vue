<template>

    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            min-width="auto"

    >
        <template v-slot:activator="{ on, attrs }">

            <v-text-field
                    v-model="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                v-model="date"
                range
                no-title
        ></v-date-picker>
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
                @click="[$refs.menu.save(date), saveData()]"
        >
            Save
        </v-btn>

    </v-menu>

</template>

<script>
    import {mapActions} from "vuex";

    export default {

        name: "DataPicker",
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }),
        methods: {
            ...mapActions(['changeFilter']),
            saveData(){
                this.changeFilter({
                    ...this.$store.getters.getFilterData,
                    rangeDate: this.date
                });
                console.log(this.$store.getters.getFilterData)
            },
        },
        computed: {
            dateRangeText () {
                console.log(this.$store.getters.allDiscounts);
            },
        },

    }
</script>

<style scoped>



    @media screen and (width: 320px) {
        .v-menu__content{
            left: 18px !important;
            max-width: 89% !important;
        }

    }

    @media screen and (width: 360px) {
        .v-menu__content{
            left: 36px !important;
            max-width: 89% !important;
        }

    }

    @media screen and (width: 375px) {
        .v-menu__content{
            left: 42px !important;
            max-width: 89% !important;
        }

    }
</style>
