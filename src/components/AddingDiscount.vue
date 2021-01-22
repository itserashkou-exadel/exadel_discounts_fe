<template>
    <v-contasiner style="height: 100vh"
            class="grey lighten-5 mb-6"
    >
        <v-row
                :align="start"
                no-gutters
                style="height: 100px;"
        >
            <v-col style="display: flex; align-items: center"
            class="ml-10">
                <h1>Добавление услуги</h1>
            </v-col>
        </v-row>
        <v-row
                :align="start"
                no-gutters
                style="height: 100%;"
        >
            <v-col class="ml-10">
                <v-text-field
                        style="width: 80%"
                        label="Название услуги"
                        outlined
                ></v-text-field>
                <v-text-field
                        style="width: 80%"
                        label="Скидка"
                        outlined
                ></v-text-field>
                <div style="display: flex; width: 80%"
                >
                    <v-text-field
                            prepend-icon="С"
                            append-outer-icon="mdi-calendar"
                            label=""
                            outlined
                    ></v-text-field>
                    <v-text-field class="ml-5"
                            prepend-icon="По"
                            append-outer-icon="mdi-calendar"
                            label=""
                            outlined
                    ></v-text-field>
                </div>
                <v-text-field
                        style="width: 80%"
                        label="Вендор"
                        outlined
                ></v-text-field>
                <v-text-field
                        style="width: 80%"
                        label="Список тегов"
                        outlined
                ></v-text-field>
                <v-text-field
                        height="150px"
                        style="width: 80%"
                        label="Описание услуги"
                        outlined
                ></v-text-field>
                <v-btn class="mb-8"
                        color="info"
                        block
                        elevation="2"
                        large
                >Добавить</v-btn>
                <v-btn
                        color="info"
                        block
                        elevation="2"
                        large
                >Отменить</v-btn>
            </v-col>
            <v-col>
                <v-text-field
                        style="width: 80%"
                        label="Страна"
                        outlined
                ></v-text-field>
                <v-text-field
                        style="width: 80%"
                        label="Город"
                        outlined
                ></v-text-field>
                <v-text-field
                        style="width: 80%"
                        label="Улица"
                        outlined
                ></v-text-field>
                <v-text-field
                        accept="image/*"
                        style="width: 80%"
                        append-icon="mdi-flip-v-attachment"
                        label="Изображение"
                        outlined
                ></v-text-field>

            </v-col>

        </v-row>

    </v-contasiner>

</template>

<script>
    export default {
        name: "AddingDiscount"
    }
</script>


<style scoped>

</style>