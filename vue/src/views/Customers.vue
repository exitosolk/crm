<template>
<PageComponent>
  <template v-slot:header>
    <div class="flex  justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Customers</h1>
      <router-link
        :to="{ name: CustomerCreate}"
        class="
        py-2
        px-3
        text-white
        bg-emerald-500
        rounded-md
        hover:bg-emerald-600
        "
      >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 -mt-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
</svg>
      Add New Customer
      </router-link>  
    </div>
    </template> 
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md-grid-cols-3">
      <div
        v-for="customer in customers"
        :key="customer.id"
        class="
          flex flex-col
          py-4
          px-6
          shadow-md
          bg-white
          hove:bg-gray-50
          h-[470px]
        "
      >
        <img :src="customer.image" alt="" class="w-full h-48 object-cover" />
        <h4 class="mt-4 text-lg font-bold">{{ customer.first_name }} {{ customer.last_name }}</h4>
        <div v-html="customer.phone_number" class="overflow-hidden flex-1"></div>
        <div class="flex justify-between items-center mt-3">
          <router-link
            :to="{ name: 'CustomerView', params:{ id:customer.id }}"
            class="
              flex
              py-2
              px-4
              border border-transparent
              text-sm
              rounded-md
              text-white
              bg-indigo-600
              hover:bg-indigo-700
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            "
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
</svg>
          Edit
          </router-link>
          <button
            v-if="customer.id"
            type="button"
            @click="deleteCustomer(customer)"
            class="
              h-8
              w-8
              flex
              items-center
              justify-center
              rounded-full
              border border-transparent
              text-sm text-red-500
              focus:ring-2 focus:ring-offset-2 focus:ring-red-500
            "
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>
          </button>
            
            
      </div>
    </div>
    </div>
  </PageComponent>
</template>

<script setup>
import store from "../store";
import {computed} from "vue";
import PageComponent from "../components/PageComponent.vue";

const customers = computed(() =>  store.state.customers);

function deleteCustomer(customer) {
  if (confirm(`Are you sure want to delete this customer? Operation cannot be undone!!`)) {
    
  }
}

</script>

<style>

</style>