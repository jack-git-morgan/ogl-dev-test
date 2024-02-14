<template>
  <ProductForm :product="targetedProduct" @close-dialog="showProductForm = !showProductForm" @product-saved="productAdded"
    :dialog="showProductForm">
  </ProductForm>
  <div class="pa-6">
    <div class="d-flex mt-6 pb-2 justify-end">
      <v-btn color="blue" class="mb-4" @click="addProduct()" prepend-icon="$plus">
        Add Product
      </v-btn>
    </div>
    <v-card color="blue-grey-lighten-5" class="pa-4" title="Products">
      <v-table class="mt-3" fixed-header max-height="800px">
        <thead>
          <tr>
            <th class="text-left">
              ID
            </th>
            <th class="text-left">
              SKU
            </th>
            <th class="text-left">
              Price
            </th>
            <th class="text-left">
              Description
            </th>
            <th class="text-left">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.sku }}</td>
            <td>£{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>
              <v-btn color="blue" @click="editProduct(product)" prepend-icon="$edit">
                Edit
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import client from '../axios.js'

interface Product {
  id: number,
  sku: string,
  description: string,
  price: number,
}

export default defineComponent({
  data() {
    return {
      products: [] as Product[],
      showProductForm: false,
      targetedProduct: {
        id: 0,
        sku: "",
        description: "",
        price: 0,
      } as Product
    }
  },
  components: {

  },
  inheritAttrs: false,
  props: {

  },
  methods: {
    async fetchProducts() {
      try {
        const response = await client.get('/product');
        this.products = response.data as Product[];
      } catch (error) {
        // TODO: toast error would be displayed here. 
      }
    },
    productAdded() {
      this.fetchProducts();
      this.showProductForm = false;
    },
    addProduct() {
      this.showProductForm = !this.showProductForm;
      this.targetedProduct = {
        id: 0,
        sku: "",
        description: "",
        price: 0,
      } as Product
    },
    editProduct(product: Product) {
      this.showProductForm = !this.showProductForm
      this.targetedProduct = JSON.parse(JSON.stringify(product));
    }
  },
  mounted() {
    this.fetchProducts();
  }
})
</script>

<style lang="scss" scoped></style>
