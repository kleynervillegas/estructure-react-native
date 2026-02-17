import CartScreen from "../src/screens/private/CartScreen";
import HomeScreen from "../src/screens/private/HomeScreen";
import OrdersScreen from "../src/screens/private/OrdersScreen";
import ProfileScreen from "../src/screens/private/ProfileScreen";
import QuotationScreen from "../src/screens/private/QuotationScreen";
import ServicesScreen from "../src/screens/private/ServicesScreen";
import LoginScreen from "../src/screens/public/LoginScreen";
import RegisterScreen from "../src/screens/public/RegisterScreen";
import { Routes } from "../src/types/navigation";

const routes: Routes[] = [
    //rutas públicas
    {
        "path": "login",
        "name": "login",
        "icon": "house.fill",
        "private": false,
        "component": LoginScreen,
        "options": { title: 'login' }
    },
    {
        "path": "register",
        "name": "register",
        "icon": "paperplane.fill",
        "private": false,
        "component": RegisterScreen,
        "options": { title: 'register' }
    },
    //rutas privadas QUE VAN EN TABS
    {
        "path": "Tienda",
        "name": "Tienda",
        "icon": "house.fill",
        "private": true,
        "tabs": true,
        "component": HomeScreen,
        "options": { title: 'Tienda' }
    },
    {
        "path": "Orders",
        "name": "Orders",
        "icon": "paperplane.fill",
        "private": true,
        "tabs": true,
        "component": OrdersScreen,
        "options": { title: 'Orders' }
    },
    {
        "path": "Quotation",
        "name": "Quotation",
        "icon": "Quotation",
        "private": true,
        "tabs": true,
        "component": QuotationScreen,
        "options": { title: 'Quotation' }
    },
    {
        "path": "Cart",
        "name": "Cart",
        "icon": "shopping-cart",
        "private": true,
        "tabs": true,
        "component": CartScreen,
        "options": { title: 'Cart' }
    },
    // rutas privadas QUE NO VAN EN TABS
    {
        "path": "profile",
        "name": "profile",
        "icon": "person",
        "private": true,
        "tabs": false,
        "component": ProfileScreen,
        "options": { title: 'profile' }
    },
    {
        "path": "services",
        "name": "services",
        "icon": "build",
        "private": true,
        "tabs": false,
        "component": ServicesScreen,
        "options": { title: 'services' }
    },
       {
        "path": "notifications",
        "name": "notifications",
        "icon": "build",
        "private": true,
        "tabs": false,
        "component": ServicesScreen,
        "options": { title: 'notifications' }
    },
];

export default routes;