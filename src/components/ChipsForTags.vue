<template>
    <div>
        <div class="d-flex wrap overflow-y-auto">
        <div
                v-for="(selection, i) in items"
                :key="i"
        >
            <v-chip
                    color="green"
                    close
                    @click:close="deleteItem"
            >
                {{ selection}}
            </v-chip>
        </div>
        </div>
        <v-text-field label="Another input"
                      @keydown.enter="nothing"
        ></v-text-field>
    </div>
</template>

<script>

    export default {
        name: "ChipsForTags",
        props: ['items'],
        methods: {
            nothing(event) {
                event.preventDefault();
                this.items.push(event.target.value);
               this.$emit('selectedTags', event.target.value);
            },
            deleteItem (i) {
                this.items.splice(i, 1)
               this.$emit('deleteTag', i);
            }
        },
    }
</script>

<style scoped>
    .my {
        word-break: break-all}
</style>