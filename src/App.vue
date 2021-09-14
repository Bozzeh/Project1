<template>
    <v-app style="background-color: silver;">
        <v-card class="content-size" flat style="background-color: silver;">
            <v-card-title>
                <strong>Enquiries</strong>
            </v-card-title>
            <br/>
            <v-card flat style="background-color: silver;"> <!-- Additional padding -->
                <v-card-actions class="dont-flex">
                    <v-layout class="position-search">
                        <v-text-field class="search-input" v-model="searchVal" prepend-inner-icon="fas fa-search" placeholder="Search"></v-text-field>
                    </v-layout>
                </v-card-actions>
            </v-card>
            <v-card flat> <!-- Additional padding -->
                <v-card-actions class="dont-flex">
                    <FilterComponent></FilterComponent>
                </v-card-actions>
            </v-card>
            <v-card flat style="margin-top: 4%; border-top-right-radius: 5px; border-top-left-radius: 5px;">
                <v-card-actions class="dont-flex">
                    <ListComponent :enquiries="enquiries" :colSorted="colSorted" @sortIndex="(event) => SortTable(event)"></ListComponent>
                </v-card-actions>
            </v-card>
        </v-card>
    </v-app>
</template>

<script>
import ListComponent from "./components/List.vue";
import FilterComponent from "./components/Filter.vue";
import data from "./plugins/data";
import $ from "jquery";

export default {
    name: "App",
    components: { 
        ListComponent, 
        FilterComponent 
    },
    data () {
        return {
            colSorted: null,
            curVal: null,
            dir: null,
            enquiries: [],
            results: 5, // Number of records per page
            searchVal: ""
        }
    },
    methods: {
        // Perform sort on a given column
        DynamicSort: function (value) {
            let dir = this.dir; // To fix scoping issue inside the function below
            return function (a, b) { // Compare current and next values from the given column value
                var retVal = 0;
                if (dir == "asc") { // Sort by descending order
                    if (a[value] == "") {
                        retVal = 1;
                    } else if (b[value] == "") {
                        retVal = -1;
                    } else retVal = a[value].toString().localeCompare(b[value]); // To allow for consistent sorting behaviour, convert numbers to string
                } else { // Sort by ascending order
                    if (a[value] == "") {
                        retVal = -1;
                    } else if (b[value] == "") {
                        retVal = 1;
                    } else retVal = a[value].toString().localeCompare(b[value]);
                }

                // Bonus - If we sort the type column, then sort the id also as the secondary sort in ascending order
                if (retVal == 0) {
                    if (dir == "asc") {
                        retVal = -a["id"].toString().localeCompare(b["id"]);
                    } else retVal = a["id"].toString().localeCompare(b["id"]);
                }

                return retVal;
            }
        },
        // This will reduce the given array to lengths given in the result param
        PaginateData: function (arr, result) { 
            return arr.reduce((acc, val, i) => {
                let idx = Math.floor(i / result);
                let page = acc[idx] || (acc[idx] = []);
                page.push(val);

                return acc;
            }, [])
        },
        // column corresponds to the header in the table position. column var will be the column sorted on. Then get the data value respective to column
        SortTable: function (column) { // Removes the sortorder class before adding the new one
            $(".sortorder").remove();
            
            console.log("Sorting column: " + column);
            // Only ID and postcode are sortable headers
            switch (column) {
                case 0: // ID
                    this.curVal = "id";
                    break;
                case 2: // Type
                    this.curVal= "type";
                    break;
                default:
                    this.curVal = null;
                    break;
            }

            this.enquiries = data.enquiries[0]["enquiries"].sort(this.DynamicSort(this.curVal));
            if (this.dir == null || this.dir == "desc") {
                this.dir = "asc";
            } else if (this.dir == "asc") {
                this.dir = "desc";
                this.enquiries = this.enquiries.reverse(); // .reverse() just flips the current order of data, so sort it then reverse it
            }

            this.colSorted = { "column": column, "dir": this.dir };
            // Finally paginate the dataset after the sort
            this.enquiries = this.PaginateData(this.enquiries, this.results);
        }
    },
    mounted () {
        this.enquiries = this.PaginateData(data.enquiries[0]["enquiries"], this.results); // Our initial data, just get the array part then split it up for pagination
        console.log(this.enquiries);
    },
    watch: {
        // Use the binded search var to filter the enquiries array whenever it changes
        searchVal () {
            // Don't bother executing if our search val is empty or not defined
            if (this.searchVal == "" || this.searchVal == undefined) {
                return;
            }

            console.log(this.searchVal);
            // Always convert the search value to lowercase and the existing data, always returns a match if true
            let search = this.searchVal.toLowerCase();
            this.enquiries = this.PaginateData(data.enquiries[0]["enquiries"].filter(value => {
                // Numbers converted to string as input takes in a string and includes doesn't apply to numbers
                let idSearch = value.id.toString().includes(search);
                let typeSearch = value.type.toLowerCase().includes(search);
                let postcodeSearch = value.postcode.toString().includes(search);
                let commentsSearch = value.comments.toLowerCase().includes(search);

                return idSearch || typeSearch || postcodeSearch || commentsSearch; // Return the matches
            }), this.results);
        }
    }
};
</script>

<style>
    /* @import "../assets/styles.css"; */

    /* Applied to maintain same html sizes across alligned elements */
    .content-size {
        width: 95%;
        margin: 0 auto;
    }

    /* Default for v-card-actions is display: flex */
    .dont-flex {
        display: block; 
        padding: 0;
    }

    .position-search {
        width: 20%; 
        /* Below 2 allow align to the right of the page */
        margin-left: auto; 
        margin-right: 0;
    }

    /* Styling for the search input */
    .search-input .v-input__slot {
        border-radius: 5px !important;
        background-color: white !important;
        border: 1px solid teal;
    }

    /* Remove the border for the text field */
    .search-input > .v-input__control > .v-input__slot:before {
        border-style: none;
    }

    /* Turn the prepended icon to a better size and look, default is very large */
    .fa-search {
        font-size: 15px !important;
        color: gray !important;
        margin-bottom: 1px !important;
    }
</style>