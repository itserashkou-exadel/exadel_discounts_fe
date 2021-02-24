 <template>
         <div>
        <v-text-field label='ррр'
                      @keydown.enter="nothing"
                      v-model="item11"
                      @change="handler1"
        ></v-text-field>
         <v-text-field label='рррр'
                       @keydown.enter="nothing"
                       v-model="item2"
         ></v-text-field>
         </div>
</template>

<script>
    export default {
        name: "Promocodes",
        data: () => ({
              item11: ''
            }
        ),
        props: ['item1', 'item2'],

        methods: {
                handler1(value) {
                        this.item1(value);
                },
            // chooseOrder () {
            //     if (this.$i18n.locale === "ru" && this.iconShow) {return this.$t("adLabelOfDiscountTagsRu")};
            //     if (this.$i18n.locale === "en" && this.iconShow) {return this.$t("adLabelOfDiscountTagsEn")};
            //     if (this.$i18n.locale === "ru" && !this.iconShow) {return this.$t("adLabelOfDiscountTagsEn")};
            //     if (this.$i18n.locale === "en" && !this.iconShow) {return this.$t("adLabelOfDiscountTagsRu")};
            // },
            nothing(event) {
                event.preventDefault();
            },
        },
    }
</script>

<style scoped>

</style>