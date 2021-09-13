<template>
    <v-app>
        <v-app-bar>
        </v-app-bar>
        <v-main></v-main>
    </v-app>
</template>

<script>
import data from "./plugins/data";

export default {
    name: 'App',
    components: { },
    data: () => ({
        enquiries: []
    }),
    mounted () {
        this.enquiries = data.enquiries[0]["enquiries"];
        console.log(this.enquiries);
    }
};
</script>

<style>

</style>