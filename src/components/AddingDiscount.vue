<template>
    <v-container
            class="mb-6"
    >
        <v-row
                align-content="center"
                no-gutters
                style="height: 100px;"
        >
            <v-col style="display: flex; align-items: center"
            class="ml-10">
                <h1>Добавление услуги</h1>
            </v-col>
        </v-row>
        <v-row
                no-gutters
        >
            <v-col class="ml-10">
                <v-text-field class="cutwidth"
                        label="Название услуги"
                        outlined
                ></v-text-field>
                <v-text-field
                        class="cutwidth"
                        label="Скидка"
                        outlined
                ></v-text-field>
                <div style="display: flex" class="cutwidth"
                >
                    <v-text-field
                            prepend-icon="С"
                            append-outer-icon="mdi-calendar"

                            outlined
                    ></v-text-field>
                    <v-text-field class="ml-5"
                            prepend-icon="По"
                            append-outer-icon="mdi-calendar"

                            outlined
                    ></v-text-field>
                </div>
                <v-text-field
                        class="cutwidth"
                        label="Вендор"
                        outlined
                ></v-text-field>
                <v-text-field
                        class="cutwidth"
                        label="Список тегов"
                        outlined
                ></v-text-field>
                <v-text-field
                        height="150px"
                        class="cutwidth"
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
                        style="width: 80%"
                        append-icon="mdi-clippy"
                        label="Изображение"
                        outlined
                ></v-text-field>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "AddingDiscount"
    }
</script>


<style scoped>
    .container {
        margin-left: 0;
    }
    .cutwidth {
        width: 80%;
    }
</style>