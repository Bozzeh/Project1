<template>
    <div>
        <v-card>
            <v-card-title>
                <strong>Filters</strong>
            </v-card-title>
            <v-card-actions>
                <v-select></v-select>
                <v-select></v-select>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'FilterComponent',
    props: [ ],
    data () {
        return { }
    },
    computed: { },
    methods: { },
    mounted () { }
}
</script>

<style scoped>
    /* @import "../assets/styles.css"; */
</style>