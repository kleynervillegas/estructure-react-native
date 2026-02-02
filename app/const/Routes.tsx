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
        "path": "Login",
        "name": "Login",
        "icon": "house.fill",
        "private": false,
        "component": LoginScreen,
        "options": { title: 'Login' }
    },
    {
        "path": "Register",
        "name": "Register",
        "icon": "paperplane.fill",
        "private": false,
        "component": RegisterScreen,
        "options": { title: 'Register' }
    },
    //rutas privadas
    {
        "path": "Home",
        "name": "Home",
        "icon": "house.fill",
        "private": true,
        "component": HomeScreen,
        "options": { title: 'Inicio' }
    },
    {
        "path": "Profile",
        "name": "Profile",
        "icon": "paperplane.fill",
        "private": true,
        "component": ProfileScreen,
        "options": { title: 'Profile' }
    },
    {
        "path": "categories",
        "name": "categories",
        "icon": "paperplane.fill",
        "private": true,
        "component": CategoriesScreen,
        "options": { title: 'categories' }
    },
    {
        "path": "services",
        "name": "services",
        "icon": "paperplane.fill",
        "private": true,
        "component": ServicesScreen,
        "options": { title: 'services' }
    },
];





