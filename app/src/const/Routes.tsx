import HomeScreen from "../screens/private/HomeScreen";
import ProfileScreen from "../screens/private/ProfileScreen";
import LoginScreen from "../screens/public/LoginScreen";
import RegisterScreen from "../screens/public/RegisterScreen";
import { Routes } from "../types/navigation";

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
        "path": "Resgister",
        "name": "Resgister",
        "icon": "paperplane.fill",
        "private": false,
        "component": RegisterScreen,
        "options": { title: 'Resgister' }
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
];





