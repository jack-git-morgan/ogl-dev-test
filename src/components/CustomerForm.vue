<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent width="1024">
                <v-card>
                    <v-card-title>
                        <span class="text-h5"><span v-if="!customer.id">Adding</span><span
                                v-if="customer.id > 0">Editing</span> Customer</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-alert v-for="error in errorMessages" v-if="errorMessages.length > 0" class="mb-12"
                                type="error">
                                {{ error }}
                            </v-alert>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="255" v-model="customer.name" label="Customer Name *"
                                        hint="Enter the customer's name. Must not exceed 255 characters in length"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="255" v-model="customer.street" label="Street"
                                        hint="Enter customer's street name. Must not exceed 255 characters in length"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="255" v-model="customer.city" label="City"
                                        hint="Enter the customer's city name. Must not exceed 255 characters in length"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="255" v-model="customer.county" label="County"
                                        hint="Enter the customer's county. Must not exceed 255 characters in length"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field maxlength="32" v-model="customer.postcode" label="Postcode"
                                        hint="Enter the customer's postcode. Must not exceed 32 characters in length"></v-text-field>
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
                        <v-btn color="blue-darken-1" variant="text" @click="saveCustomer()">
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
            countyList: [

            ],
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
        customer: {
            type: Object,
            default: {
                id: -1,
                name: "",
                street: "",
                city: "",
                postcode: "",
                county: ""
            },
        }
    },
    watch: {
        dialog(newValue, oldValue) {
            this.errorMessages = [];
        }
    },
    methods: {
        async saveCustomer() {
            this.errorMessages = [];

            if (!this.customer.name || this.customer.name.trim().length === 0) {
                this.errorMessages.push("Customer name field is required. Please enter a valid customer name.");
            }

            if (this.customer.postcode && this.customer.postcode.trim().length > 0) {
                const isValidPostcode = this.validatePostcode(this.customer.postcode);
                if (!isValidPostcode) {
                    this.errorMessages.push("Provided postcode is not valid. Please enter a valid UK postcode.");
                }
            }

            if (this.errorMessages.length > 0) {
                return;
            }

            try {
                const response = await client.post('/customer', this.customer);
                this.$emit('customer-saved', this.customer);
            } catch (error) {
                // TODO: toast error would be displayed here. 
            }
        },
        closeDialog() {
            this.$emit('close-dialog');
        },
        validatePostcode(postcode: string) {
            postcode = postcode.replace(/\s/g, "");
            var regex = /^(([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2}))$/;
;
            return regex.test(postcode);
        }
    },
})
</script>
  
<style lang="scss" scoped></style>