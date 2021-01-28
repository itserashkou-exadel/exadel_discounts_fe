<template>
    <div>
        <v-list
                ref="list"

        >
            <v-list-group>
                <template v-slot:activator="{on, attrs}"
                >
                    <v-list-item-title
                            v-model="listmodel"
                            v-on="on"
                            v-bind="attrs"
                    >Choose your location</v-list-item-title>
                </template>

                <!--            Первая группа            -->
                <v-list-group no-action sub-group>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title

                            >Belarus
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item-group v-model="fictionalSelected">
                        <v-list-item v-for="town in belarus" :key="town.town">
                            <v-list-item-title
                                    @click="select(town)"
                            >{{ town.town }}
                            </v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
                <!--            Вторая группа            -->
                <v-list-group sub-group no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>Ukraine</v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item-group v-model="fictionalSelected">
                        <v-list-item v-for="town in ukraine" :key="town.id"
                        >
                            <v-list-item-title>{{ town.town }}</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
            </v-list-group>
        </v-list>
    </div>
</template>

<script>
    export default {
        name: "ChooseOfTown",
        data() {
            return {

                fictionalSelected: null,
                realSelected: null
            }

        },
        props: ['belarus', 'ukraine', 'listmodel'],
        methods: {
            select(town) {
                console.log(town);
                this.$emit('select', town)
            }
        }
    }
</script>

<style scoped>

</style>