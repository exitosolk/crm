import {createStore} from "vuex";
import axiosClient from '../axios'  


const store = createStore({
    state: {
        user:{
            data:{},
            token:sessionStorage.getItem('TOKEN'),
        },
        currentCustomer: {
            loading: false,
            data: {},
        },
        customers:  {
            loading: false,
            links: [],
            data:[]
        },
    },
    getters: {},
    actions: {
        getCustomer({commit}, id){
            commit ("setCurrentCustomerLoading", true);
            return axiosClient
                .get(`/customer/${id}`)
                .then((res) => {
                    commit("setCurrentCustomer", res.data);
                    commit ("setCurrentCustomerLoading", false);
                    return res;
                })
                .catch((err)=>{
                    commit("setCurrentCustomerLoading", false);
                    throw err;
                });
        },
        saveCustomer({commit}, customer){
            let response;
            if (customer.id) {
                response = axiosClient
                .put(`/customer/${customer.id}`, customer)
                .then((res)=>{
                    commit ("updateCustomer", res.data);
                    return res;
                });
            }else{
                response = axiosClient.post("/customer", customer).then((res) => {
                    commit ("saveCustomer", res.data);
                    return res;
                });
            }
        },
        deleteCustomer({}, id){
            return axiosClient.delete(`/customer/${id}`);
        },
        getCustomers({ commit }, {url = null} = {}) {
            commit('setCustomersLoading', true)
            url = url || "/customer";
            return axiosClient.get(url).then((res) => {
              commit('setCustomersLoading', false)
              commit("setCustomers", res.data);
              return res;
            });
          },
        register({commit}, user){
            return axiosClient.post('/register', user)
           .then(({data})=>{
               commit('setUser', data);
               return data;
           }) 
        },

        login({commit}, user){
           return axiosClient.post('/login', user)
           .then(({data})=>{
               commit('setUser', data);
               return data;
           }) 
        },

        logout({commit}){
            return axiosClient.post('/logout')
            .then(response => {
                commit ('logout')
                return response;
            })
        }
    },
    mutations:{
        setCurrentCustomerLoading: (state, loading) => {
            state.currentCustomer.loading = loading;
        },
        setCustomersLoading: (state, loading) => {
            state.customers.loading = loading;
        },
        setCurrentCustomer: (state, customer) =>{
            state.currentCustomer.data = customer.data;
        },
        setCustomers: (state, customers) => {
            state.customers.data = customers.data;
        },
        saveCustomer: (state, customer) => {
            state.customers = [...state.customers, customer.data];
        },
        updateCustomer:(state, customer) => {
            state.customers = state.customers.map((c) => {
                if (c.id == customer.data.id) {
                    return customer.data;
                }
                return c;
            });
        },
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.token = userData.token;
            state.user.data = userData.user;
            sessionStorage.setItem('TOKEN', userData.token);
        }
    },
    modules: {}
} )

export default store;