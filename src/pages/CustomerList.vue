<template>
  <CustomerForm :customer="targetedCustomer" @close-dialog="showCustomerForm = !showCustomerForm"
    @customer-saved="customerAdded" :dialog="showCustomerForm">
  </CustomerForm>
  <div class="pa-6">
    <div class="d-flex mt-6 pb-2 justify-end">
      <v-btn color="blue" class="mb-4" @click="addCustomer()" prepend-icon="$plus">
        Add Customer
      </v-btn>
    </div>
    <v-card color="blue-grey-lighten-5" class="pa-4 pt-4" title="Customers">
      <v-table class="mt-3" fixed-header max-height="800px">
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Street
            </th>
            <th class="text-left">
              City
            </th>
            <th class="text-left">
              County
            </th>
            <th class="text-left">
              Postcode
            </th>
            <th class="text-left">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers" :key="customer.id">
            <td>{{ customer.id }}</td>
            <td>{{ customer.name }}</td>
            <td>{{ customer.street }}</td>
            <td>{{ customer.city }}</td>
            <td>{{ customer.county }}</td>
            <td>{{ customer.postcode }}</td>
            <td>
              <v-btn color="blue" @click="editCustomer(customer)" prepend-icon="$edit">
                Edit
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
    <v-card color="blue-grey-lighten-5" class="pa-4 pt-4 mt-6" title="Customer Count By City">
      <v-table class="mt-3" fixed-header max-height="800px">
        <thead>
          <tr>
            <th class="text-left">
              City Name
            </th>
            <th class="text-left">
              Total Customers
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(count, city) in cityGroupings">
            <td>{{ city }}</td>
            <td>{{ count }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import client from '../axios.js'

interface Customer {
  id: number,
  name: string,
  street: string,
  city: string,
  county: string,
  postcode: string
}

interface CityGrouping {
  name: string,
  count: number
}

export default defineComponent({
  data() {
    return {
      customers: [] as Customer[],
      cityGroupings: [] as CityGrouping[],
      showCustomerForm: false,
      targetedCustomer: {
        id: -1,
        name: "",
        street: "",
        city: "",
        county: "",
        postcode: ""
      } as Customer
    }
  },
  components: {

  },
  inheritAttrs: false,
  props: {

  },
  methods: {
    async fetchCustomers() {
      try {
        const response = await client.get('/customer');
        this.customers = response.data as Customer[];
      } catch (error) {
        // TODO: toast error would be displayed here. 
      }
    },
    async fetchCustomerCityCount() {
      const response = await client.get('/customer/citygrouping');
      this.cityGroupings = response.data as CityGrouping[];
    },
    customerAdded() {
      this.fetchCustomers();
      this.fetchCustomerCityCount();
      this.showCustomerForm = false;
    },
    editCustomer(customer: Customer) {
      this.showCustomerForm = !this.showCustomerForm
      this.targetedCustomer = JSON.parse(JSON.stringify(customer));
    },
    addCustomer() {
      this.showCustomerForm = !this.showCustomerForm;
      this.targetedCustomer = {
        id: -1,
        name: "",
        street: "",
        city: "",
        county: "",
        postcode: ""
      } as Customer
    }
  },
  mounted() {
    this.fetchCustomers();
    this.fetchCustomerCityCount();
  }
})
</script>

<style lang="scss" scoped></style>
