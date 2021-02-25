<template>
    <div>
        <div class="d-flex">
            <v-combobox
                    v-model="items"
                    chips
                    multiple
                    clearable
                    :label="chooseOrder()"
                    :data="watchTags"

                    @change="sendTags"
            >
                <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                            v-bind="attrs"
                            :input-value="selected"
                            close
                            @click="select"
                            @click:close="deleteItem(item)"
                            color="teal accent-3"
                    >
                        <strong>{{ item }}</strong>

                    </v-chip>
                </template>
            </v-combobox>
            <v-icon
                    v-show="iconShow"
                    large
                    color="orange darken-2"
                    @click="changeTagShow"
            >
                mdi-arrow-down-bold-box-outline
            </v-icon>
        </div>
    </div>
</template>

<script>

    export default {
        name: "ChipsForTags",
        data: () => ({
                tagShow: false,
                items: []
            }
        ),
        props: ['iconShow', 'tags'],

        methods: {
            sendTags () {
                this.$emit('sendTags', this.items);
            },
            chooseOrder() {
                if (this.$i18n.locale === "ru" && this.iconShow) {
                    return this.$t("adLabelOfDiscountTagsRu")
                }
                if (this.$i18n.locale === "en" && this.iconShow) {
                    return this.$t("adLabelOfDiscountTagsEn")
                }
                if (this.$i18n.locale === "ru" && !this.iconShow) {
                    return this.$t("adLabelOfDiscountTagsEn")
                }
                if (this.$i18n.locale === "en" && !this.iconShow) {
                    return this.$t("adLabelOfDiscountTagsRu")
                }
            },
            changeTagShow() {
                this.tagShow = !this.tagShow
                this.$emit('tagShow', this.tagShow);
            },
            nothing(event) {
              //  console.log(this.items)
               // event.preventDefault();
              //  this.items.push(event.target.value);
              //  this.$emit('selectedTags', event.target.value);
              //  event.target.value = '';
            },
            deleteItem(i) {
                this.items.splice(this.items.indexOf(i), 1)
                this.items = [...this.items]
            }
        },
        computed: {
            watchTags: function  () {
                if (this.tags.length > this.items.length){
               this.items = this.tags}
              // this.tags = this.items
                console.log(this.items)
            }
        }
    }
</script>

<style scoped>
    .my {
        break-inside: auto;
    }
</style>