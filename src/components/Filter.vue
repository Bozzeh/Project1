<template>
    <div>
        <v-card>
            <v-row>
                <v-col cols="6" style="padding-bottom: 0;">
                    <v-card-title style="padding-bottom: 0;">
                        <strong>Filters</strong>
                    </v-card-title>
                </v-col>
                <v-col cols="6">
                    <v-card-title style="padding-bottom: 0; font-size: 14px; float: right;">Clear All</v-card-title>
                </v-col>
            </v-row>
            <v-row style="padding-left: 1%;">
                <v-col cols="2">
                    <v-select label="Type"></v-select>
                </v-col>
                <v-col cols="2">
                    <v-select label="Postcode"></v-select>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "FilterComponent",
    props: [ "enquiries" ],
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