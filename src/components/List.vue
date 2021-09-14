<template>
    <div>
        <v-card flat>
            <table class="content-size enquiries-table">
                <tr>
                    <th class="table-headers" v-for="(headers, i) in headings" :key="i" align="left" @click="EmitIndex(i)">
                        {{ headers }} &nbsp; <i v-if="i == 0 || i == 2" :class="DisplaySortIcon(i)" style="padding: 0;"></i>
                    </th>
                </tr>
                <tr class="table-rows" v-for="(enquiry, i) in enquiries[activePage - 1]" :key="i">
                    <td width="12%">{{ enquiry.id }}</td>
                    <td width="18%">{{ enquiry.postcode }}</td>
                    <td width="15%">{{ enquiry.type }}</td>
                    <td width="55%">{{ enquiry.comments }}</td>
                </tr>
            </table>

            <!-- Pagination -->
            <v-card class="content-size" flat>
                <v-card-actions style="padding: 0;">
                    <ul class="pagination">
                        <li v-for="i in enquiries.length" :key="i">
                            <v-btn :class="ActivePage(i)" @click="SetActivePage(i)">{{ i }}</v-btn>
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
    props: [ 'enquiries', 'colSorted' ],
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
        ActivePage: function (i) {
            return {
                "active": this.activePage == i
            };
        },
        // Get the correct icon on the current sort val, otherwise default icon
        DisplaySortIcon: function (i) {
            if (this.colSorted != null && this.colSorted["column"] == i) {
                if (this.colSorted["dir"] == "asc") {
                    return "fas fa-sort-up";
                } else return "fas fa-sort-down";
            }

            return "fas fa-sort";
        },
        // Emit to the parent component the column to sort. This way we can sort the original dataset and once again return the dataset paginated
        EmitIndex: function (i) {
            this.$emit("sortIndex", i);
        },
        SetActivePage: function (i) {
            this.activePage = i;
        }
    },
    mounted () { }
}
</script>

<style>
    table * {
        padding-top: 10px;
        padding-bottom: 10px;
    }

    table *:nth-child(1) {
        padding-left: 10px;
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
        border-spacing: 0;
        border-radius: 5px;
        border-collapse: collapse; /* Allows setting of the table border colour */
    }

    .enquiries-table th:nth-child(1) {
        border-top-left-radius: 5px !important;
    }

    .enquiries-table th:last-child {
        border-top-right-radius: 5px !important;
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