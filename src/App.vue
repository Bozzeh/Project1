<template>
    <v-app>
        <List :enquiries="enquiries"></List>
    </v-app>
</template>

<script>
import List from "./components/List.vue";
import data from "./plugins/data";

export default {
    name: 'App',
    components: { 
        List
    },
    data () {
        return {
            enquiries: [],
            results: 5 // Number of records per page
        }
    },
    methods: {
        // This will reduce the given array to lengths given in the result param
        PaginateData (arr, result) { 
            return arr.reduce((acc, val, i) => {
                let idx = Math.floor(i / result);
                let page = acc[idx] || (acc[idx] = []);
                page.push(val);

                return acc;
            }, [])
        }
    },
    mounted () {
        this.enquiries = this.PaginateData(data.enquiries[0]["enquiries"], this.results); // Our initial data, just get the array part then split it up for pagination
        console.log(this.enquiries);
    }
};
</script>

<style>

</style>