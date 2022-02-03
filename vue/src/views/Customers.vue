<template>
<PageComponent>
  <template v-slot:header>
    <div class="flex  justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Customers</h1>
      <router-link
        :to="{ name:'CustomerCreate' }"
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
    <div v-if="customers.loading" class="flex justify-center">Loading...</div>
    <div v-else-if="customers.data.length">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <CustomerListItem
          v-for="(customer, ind) in customers.data"
          :key="customer.id"
          :customer="customer"
          class="opacity-0 animate-fade-in-down"
          :style="{ animationDelay: `${ind * 0.1}s` }"
          @delete="deleteCustomer(customer)"
        />
      </div>
      <div class="flex justify-center mt-5">
        <nav
          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
          
        </nav>
      </div>
    </div>
    <div v-else class="text-gray-600 text-center py-16">
      Your don't have customers yet
    </div>
  </PageComponent>
</template>


<script setup>
import store from "../store";
import {computed} from "vue";
import PageComponent from "../components/PageComponent.vue";
import CustomerListItem from "../components/CustomerListItem.vue";

const customers = computed(() =>  store.state.customers);

store.dispatch("getCustomers");

function deleteCustomer(customer) {
  if (
    confirm(
      `Are you sure want to delete this customer? Operation cannot be undone!!`
      )
      ) {

        store.dispatch('deleteCustomer', customer.id)
        .then(()=>{
          store.dispatch('getCustomers')
        });
  } 
}
function getForPage(ev, link) {
  ev.preventDefault();
  if (!link.url || link.active) {
    return;
  }
  store.dispatch("getCustomers", { url: link.url });
}

</script>

<style>

</style>