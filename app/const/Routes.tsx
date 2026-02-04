import CategoriesScreen from "../src/screens/private/CategoriesScreen";
import HomeScreen from "../src/screens/private/HomeScreen";
import ProfileScreen from "../src/screens/private/ProfileScreen";
import ServicesScreen from "../src/screens/private/ServicesScreen";
import LoginScreen from "../src/screens/public/LoginScreen";
import RegisterScreen from "../src/screens/public/RegisterScreen";
import { Routes } from "../src/types/navigation";

export const routes: Routes[] = [
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
    //rutas privadas
    {
        "path": "home",
        "name": "home",
        "icon": "house.fill",
        "private": true,
        "component": HomeScreen,
        "options": { title: 'home' }
    },
    {
        "path": "profile",
        "name": "profile",
        "icon": "paperplane.fill",
        "iconTab":"home",
        "private": true,
        "component": ProfileScreen,
        "options": { title: 'profile' }
    },
    {
        "path": "cart",
        "name": "cart",
        "icon": "paperplane.fill",
        "iconTab":"home",
        "private": true,
        "component": CategoriesScreen,
        "options": { title: 'cart' }
    },
    {
        "path": "services",
        "name": "services",
        "icon": "paperplane.fill",
        "iconTab":"home",
        "private": true,
        "component": ServicesScreen,
        "options": { title: 'services' }
    },
];





