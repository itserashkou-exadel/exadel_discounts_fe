 <template>
        <v-text-field :label='рррр'
                      @keydown.enter="nothing"

        ></v-text-field>

</template>

<script>
    export default {
        name: "Promocodes",
        data: () => ({

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

</style>