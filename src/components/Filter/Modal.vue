<template>
    <v-row justify="end" class="pr-15">
        <v-dialog
                content-class="zero"
                v-model="dialog"
                persistent
                max-width="600px"

        >
            <template v-slot:activator="{ on, attrs }">

                <v-img max-height="15"
                       max-width="25"
                       src="../../assets/filter.png"
                       v-bind="attrs"
                       v-on="on"
                       class="pointer"

                ></v-img>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Filter</span>
                </v-card-title>
                <v-card-text>
                    <v-container>

                        <v-row>
                            <v-col cols="6" lg="6" md="6" sm="6" class="pa-0 pl-3">
                                <v-subheader>From</v-subheader>
                                <DataPicker/>

                            </v-col>
                            <v-col cols="6" lg="6" md="6" sm="6" class="pa-0 pl-3">
                                <v-subheader>To</v-subheader>
                                <DataPicker/>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                    lg="12"
                            >
                                <h3 class="mb-2">Vendor</h3>
                                <v-text-field
                                        class="pt-0"
                                >
                                    <v-icon
                                            slot="append"
                                            color="blue"
                                    >
                                        mdi-domain
                                    </v-icon>
                                </v-text-field>
                            </v-col>

                        </v-row>
                        <h3 class="mb-4">Discount</h3>
                        <v-row>
                            <v-col cols="12">
                                <RangeSlider/>
                            </v-col>
                        </v-row>
                        <h3 class="pb-4">Rating</h3>
                        <v-row class="ml-2">
                            <v-col cols="12" md="12" sm="12">
                                    <StarSlider/>
                            </v-col>
                        </v-row>
                    </v-container>

                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

    import DataPicker from "@/components/Filter/DataPicker";
    import RangeSlider from "@/components/Filter/RangeSlider";
    import StarSlider from "@/components/Filter/StarSlider";

    export default {
        name: "Modal.vue",
        components: {StarSlider, RangeSlider, DataPicker},
        data: () => ({
            dialog: false,
            from: null,
            title: 'From'
        }),
    }
</script>

<style scoped>
    .pointer {
        cursor: pointer;
    }


</style>
