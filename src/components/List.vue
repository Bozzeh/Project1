<template>
    <div>
        <v-card flat>
            <table class="content-size enquiries-table">
                <tr>
                    <th class="table-headers" v-for="(headers, i) in headings" :key="i" align="left">{{ headers }}</th>
                </tr>
                <tr class="table-rows" v-for="(enquiry, i) in enquiries[activePage - 1]" :key="i">
                    <td width="12%">{{ enquiry.id }}</td>
                    <td width="12%">{{ enquiry.postcode }}</td>
                    <td width="12%">{{ enquiry.type }}</td>
                    <td width="64%">{{ enquiry.comments }}</td>
                </tr>
            </table>

            <!-- Pagination -->
            <v-card class="content-size" flat>
                <v-card-actions style="padding: 0;">
                    <ul class="pagination">
                        <li v-for="index in enquiries.length" :key="index">
                            <v-btn :class="ActivePage(index)" @click="SetActivePage(index)">{{ index }}</v-btn>
                        </li>
                    </ul>
                </v-card-actions>
            </v-card>
        </v-card>
        <!--<v-pagination v-model="activePage" :length="enquiries.length" prev-icon="" next-icon=""></v-pagination>-->
        <!-- An immediate pagination, list display and sorting solution in 1 line below and the headings computed function :) 
        <v-data-table :headers="headings" :items="enquiries"></v-data-table>
        -->
    </div>
</template>

<script>
export default {
    name: 'List',
    props: [ 'enquiries' ],
    data () {
        return {
            activePage: 1, // Will be the page active by the user
            headings: [ "ID", "POSTCODE", "TYPE", "COMMENTS" ]
        }
    },
    computed: {
        /*EnquiryItems: function () {
            return this.enquiries.map(enquiry => {
                return Object.assign({}, enquiry); // Deep copy
            });
        },*/
        /*headings () {
            return [
                { text: "ID", value: 'id', align: 'start', sortable: true },
                { text: 'POSTCODE', value: 'postcode', sortable: false },
                { text: "TYPE", value: "type", sortable: true }, 
                { text: "COMMENTS", value: "comments", sortable: false }
            ]
        },*/
    },
    methods: {
        // When a new page is clicked, then add the active class to it
        ActivePage: function (index) {
            return {
                "active": this.activePage == index
            };
        },
        SetActivePage: function (index) {
            this.activePage = index;
        },
    },
    mounted () { }
}
</script>

<style>
    table * {
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 10px;
        padding-bottom: 10px;
    }

    th {
        border-bottom: 1px solid rgb(0, 0, 0, 0.4);
    }

    /* ul and li are for the custom made pagination - don't show bullet point and align it horizontally */
    .pagination {
        padding: 0;
        list-style: none;
    }

    li {
        float: left;
    }

    /* Applied to maintain same html sizes across alligned elements */
    .content-size {
        width: 80%;
        margin: 0 auto;
    }

    .enquiries-table {
        border: 1px solid black;
        border-spacing: 0;
        border-radius: 5px;
        border-collapse: collapse; /* Allows setting of the table border colour */
    }

    .table-headers {
        background-color: rgba(192, 192, 192, 0.8);
    }

    .table-rows:nth-child(odd) {
        background-color: rgba(192, 192, 192, 0.25);
    }

    .table-rows {
        border-top: 1px solid rgb(0, 0, 0, 0.15);
    }

    .active {
        background-color: rgba(135, 206, 235, 0.5) !important;
        border: 1px solid rgba(135, 206, 235, 1);
    }
</style>