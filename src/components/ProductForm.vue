<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent width="1024">
                <v-card>
                    <v-card-title>
                        <span class="text-h5"><span v-if="!product.id">Adding</span><span
                                v-if="product.id > 0">Editing</span> Product</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-alert v-for="error in errorMessages" v-if="errorMessages.length > 0" class="mb-12"
                                type="error">
                                {{ error }}
                            </v-alert>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="255" v-model="product.sku" label="SKU *"
                                        hint="Enter the stock keeping unit number (must be unique). Must not exceed 255 characters in length"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="255" v-model="product.description" label="Description *"
                                        hint="Enter the product description. Must not exceed 255 characters in length"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="product.price" label="Price *"
                                        hint="Enter the products price in GBP (£)" type="number" required />
                                </v-col>
                            </v-row>
                        </v-container>
                        <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="saveProduct()">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>

    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue'
import client from '../axios.js'

export default defineComponent({
    data() {
        return {
            errorMessages: [] as String[]
        }
    },
    components: {

    },
    inheritAttrs: false,
    props: {
        dialog: {
            type: Boolean,
            default: false
        },
        product: {
            type: Object,
            default: {
                sku: "",
                description: "",
                price: 0
            }
        }
    },
    watch: {
        dialog(newValue, oldValue) {
            this.errorMessages = [];
        }
    },
    methods: {
        async saveProduct() {

            this.errorMessages = [];

            if (!this.product.sku || this.product.sku.trim().length === 0) {
                this.errorMessages.push("SKU field is required. Please enter a valid SKU.");
            }

            if (!this.product.description || this.product.description.trim().length === 0) {
                this.errorMessages.push("Description field is required. Please enter a valid description.");
            }

            if (this.errorMessages.length > 0) {
                return;
            }

            try {
                const response = await client.post('/product', this.product);
                this.$emit('product-saved', this.product);
            } catch (error) {
                // TODO: toast error would be displayed here. 
            }
        },
        closeDialog() {
            this.$emit('close-dialog');
        }
    },
})
</script>
  
<style lang="scss" scoped></style>
  