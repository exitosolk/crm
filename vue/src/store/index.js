import {createStore} from "vuex";
import axiosClient from '../axios'  

const tmpCustomers = [{
    id:300,
    first_name:"Robert",
    last_name:"Downey",
    email_address:"robert@actor.com",
    phone_number:"0775677890",
    created_at:"",
    updated_at:""
}
];

const store = createStore({
    state: {
        user:{
            data:{},
            token:sessionStorage.getItem('TOKEN'),
        },
        customers:  [...tmpCustomers],
    },
    getters: {},
    actions: {
        saveCustomer({commit}, customer){
            let response;
            if (customer.id) {
                response = axiosClient
                .put(`/customer/$(customer.id)`, customer)
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