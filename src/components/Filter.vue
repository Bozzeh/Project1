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
                    <v-card-title @click="ClearFilter()" style="padding-bottom: 0; font-size: 14px; float: right; cursor: pointer;">Clear All</v-card-title>
                </v-col>
            </v-row>
            <v-row style="padding-left: 1%;">
                <v-col cols="2">
                    <v-select label="Type" v-model="type" :items="types" @change="(event) => EmitFilter(event)"></v-select>
                </v-col>
                <v-col cols="2">
                    <v-select label="Postcode" v-model="postcode" :items="postcodes" @change="(event) => EmitFilter(event)"></v-select>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "FilterComponent",
    props: [ "postcodes", "types" ],
    data () {
        return { 
            postcode: "All",
            type: "All",
            value: []
        }
    },
    computed: { },
    methods: { 
        ClearFilter: function () {
            this.postcode = "All";
            this.type = "All";
            this.EmitFilter(); // Emit the default filters so default data can be populated again
        },
        EmitFilter: function () {
            this.value = []; // Reset if contains data already
            this.value.push(this.postcode);
            this.value.push(this.type);
            this.$emit("filter", this.value); // Send back to the parent component the new active filters
        }
    },
    mounted () { }
}
</script>

<style>
</style>