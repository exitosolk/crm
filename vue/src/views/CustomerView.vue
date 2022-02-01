<template>
    <page-component>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ model.id ? model.title: "Create a Customer"  }}
                </h1>
            </div>
        </template>
        
        <form @submit.prevent="saveCustomer">
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
                        />   
                    </div>
                    <!-- phone number -->

                    <!-- email address -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="text"
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
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "../components/PageComponent.vue";

const router = useRouter();

const route = useRoute();

let model = ref ({
    first_name: "",
    last_name:null,
    phone_number:null,
    email_address: null,
});

if (route.params.id) {
    model.value = store.state.customers.find(
        (c) => c.id === parseInt(route.params.id)
    );
}

function saveCustomer() {
    store.dispatch("saveCustomer", model.value).then(({ data })=>{
        router.push({
            name:"CustomerView",
            params: {id:data.data.id},
        });
    });
}
</script>

<style>

</style>