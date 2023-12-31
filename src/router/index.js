import {createRouter, createWebHashHistory} from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import ProductPage from "@/pages/ProductPage.vue";

const routes = [
    {name: 'MainPage', component: MainPage, path: '/' },
    {name: 'product', component: ProductPage, path:'/product/:id'},
    // {name: 'basket', component: BasketPage, path:'/basket'},
    // {name: 'order', component: OrderPage, path:'/order'},
    // {name: 'orderInfo', component: OrderInfoPage, path:'/order/:id'},
    {name: 'notFound', component: NotFoundPage, path:'/(.*)*'},

];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});


export default router