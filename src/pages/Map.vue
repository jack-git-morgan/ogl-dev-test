<template>
    <div>
        <div class="pa-6" hide-details="true">
            <v-text-field v-model="postcodeSearchTerm" maxlength="32" label="Postcode"></v-text-field>
            <v-btn color="blue" @click="filterPostcodes()" prepend-icon="$edit">
                Filter Map Markers
            </v-btn>
            <v-btn class="ml-4" color="red" @click="clearFilter()" prepend-icon="$delete">
                Clear Filter
            </v-btn>
        </div>
        <CustomerMap :postcodes="filteredPostcodes"></CustomerMap>
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import client from '../axios.js'
import CustomerMap from '../components/CustomerMap.vue'

interface Customer {
    id: number,
    name: string,
    street: string,
    city: string,
    county: string,
    postcode: string
}

export default defineComponent({
    data() {
        return {
            postcodes: [] as String[],
            filteredPostcodes: [] as String[],
            customers: [] as Customer[],
            postcodeSearchTerm: ""
        }
    },
    components: {
        CustomerMap
    },
    inheritAttrs: false,
    props: {

    },
    methods: {
        async fetchCustomers() {
            try {
                const response = await client.get('/customer');
                this.customers = response.data as Customer[];
                this.postcodes = this.customers
                    .filter(customer => customer.postcode !== "" && customer.postcode !== null)
                    .map(customer => customer.postcode);

                this.filteredPostcodes = [...this.postcodes];
            } catch (error) {
                // TODO: toast error would be displayed here. 
            }
        },
        filterPostcodes() {
            this.filteredPostcodes = [...this.postcodes.filter(postcode => postcode.includes(this.postcodeSearchTerm))];
        },
        clearFilter() {
            this.filteredPostcodes = [...this.postcodes];
            this.postcodeSearchTerm = "";
        }
    },
    mounted() {
        this.fetchCustomers();
    }
})
</script>
  
<style lang="scss" scoped></style>
  