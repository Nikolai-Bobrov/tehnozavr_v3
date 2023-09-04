import {createRouter} from "vue-router";
import MainPage from "@/pages/MainPage.vue";





const routes = [
    {name: 'main', component: MainPage, path: '/' },
    // {name: 'product', component: ProductPage, path:'/product/:id'},
    // {name: 'basket', component: BasketPage, path:'/basket'},
    // {name: 'order', component: OrderPage, path:'/order'},
    // {name: 'orderInfo', component: OrderInfoPage, path:'/order/:id'},
    // {name: 'notFound', component: NotFoundPage, path:'*'},

];

const router = createRouter({
    routes
});


export default router