import {defineStore} from "pinia";
// import axios from "axios";
// import {API_BASE_URL} from "@/config";



export const useProducts = defineStore( 'products',{
    state:() => ({
        products: null

    }),
    // actions:()=>({
    //     axios
    //     .get(API_BASE_URL+ "/api/products")
    //         .then(response=>(this.products = response))
    // })
})