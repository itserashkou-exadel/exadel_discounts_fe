 <template>
    <div class="my">
        <div class="d-flex overflow-y-auto">
            <div class="my wrap"
                    v-for="(selection, i) in items"
                    :key="i"
            >
                <v-chip class="mr-2"
                        color="green"
                        close
                        @click:close="deleteItem"
                >
                    {{ selection}}
                </v-chip>
            </div>
        </div>
        <div class="d-flex">
        <v-text-field :label='chooseOrder()'
                      @keydown.enter="nothing"
        ></v-text-field>
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
                tagShow: false
            }
        ),
        props: ['items', 'iconShow'],

        methods: {
            chooseOrder () {
                if (this.$i18n.locale === "ru" && this.iconShow) {return this.$t("adLabelOfDiscountTagsRu")};
                if (this.$i18n.locale === "en" && this.iconShow) {return this.$t("adLabelOfDiscountTagsEn")};
                if (this.$i18n.locale === "ru" && !this.iconShow) {return this.$t("adLabelOfDiscountTagsEn")};
                if (this.$i18n.locale === "en" && !this.iconShow) {return this.$t("adLabelOfDiscountTagsRu")};
            },
            changeTagShow () {
                this.tagShow = !this.tagShow
               this.$emit('tagShow', this.tagShow);
            },
            nothing(event) {
                event.preventDefault();
                this.items.push(event.target.value);
                this.$emit('selectedTags', event.target.value);
                event.target.value = '';
            },
            deleteItem(i) {
                this.items.splice(i, 1)
                this.$emit('deleteTag', i);
            }
        },
    }
</script>

<style scoped>
    .my {
        break-inside: auto;
    }
</style>