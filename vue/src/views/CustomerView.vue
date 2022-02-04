<template>
    <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? model.first_name: "Create a Customer"  }}
                </h1>

                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deleteCustomer()"
                    class="py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-300"
                >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
                Delete Customer
                </button>    
            </div>
        </template>
        <div v-if="customerLoading" class="flex justify-center">Loading....</div>
        <form v-else @submit.prevent="saveCustomer">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <!-- first name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            v-model="model.first_name"
                            autocomplete="first_name"
                            class="
                                mt-1
                                focus:ring-indigo-500 focus:border-indigo-500
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                            "
                            required=""
                        />   
                    </div>
                    <!-- first name -->

                    <!-- last name -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            v-model="model.last_name"
                            autocomplete="last_name"
                            class="
                                mt-1
                                focus:ring-indigo-500 focus:border-indigo-500
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                            "
                            required=""
                        />   
                    </div>
                    <!-- last name -->

                    <!-- phone number -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone_number"
                            id="phone_number"
                            v-model="model.phone_number"
                            autocomplete="phone_number"
                            class="
                                mt-1
                                focus:ring-indigo-500 focus:border-indigo-500
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                            "
                            required=""
                        />   
                    </div>
                    <!-- phone number -->

                    <!-- email address -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email_address"
                            id="email_address"
                            v-model="model.email_address"
                            autocomplete="email_address"
                            class="
                                mt-1
                                focus:ring-indigo-500 focus:border-indigo-500
                                w-full
                                shadow-sm
                                sm:text-sm
                                border-gray-300
                                rounded-md
                            "
                            required=""
                        />   
                    </div>
                    <!-- email address -->
                </div>
                <!-- customer fields -->
                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                        type="submi"
                        class="
                            inline-flex
                            justify-center
                            py-2
                            px-4
                            border boder-transparent
                            shadow-sm
                            text-sm
                            font-medium
                            rounded-md
                            text-white
                            bg-indigo-600
                            hover:bg-indigo-700
                            focus:outline-none
                            focus:ring-2
                            focus:ring-offset-2
                            focus:ring-indigo-500
                        "
                    >
                        Save
                    </button>       
                </div>
            </div>
        </form>
        </page-component>    
</template>

<script setup>
import store from "../store";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";

const router = useRouter();

const route = useRoute();

const customerLoading = computed (() => store.state.currentCustomer.loading)

let model = ref ({
    first_name: "",
    last_name:null,
    phone_number:null,
    email_address: null,
});

watch(
    () =>store.state.currentCustomer.data,
    (newVal, oldVal)=>{
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== "draft",
        };
    }
);

if (route.params.id) {
    store.dispatch('getCustomer', route.params.id);
}

let errorMsg = ref('');

function saveCustomer() {
    store.dispatch("saveCustomer", model.value).then(({ data })=>{
        router.push({
            name:"CustomerView",
            params: {id:data.data.id},
        });
    });
}

function deleteCustomer() {
    if (
        confirm(`Are you really want to delete this customer?`)
    ) {
        store.dispatch("deleteCustomer", model.value.id).then(()=>{
            router.push({
                name: "Customers",
            })
        });
    }
}

</script>

<style>

</style>