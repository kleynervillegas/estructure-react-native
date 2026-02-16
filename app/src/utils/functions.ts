import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const getFormStateErrors = (values: any, validators: any = {}) => {
    let isderty: boolean = false;
    Object.entries(validators).some(([name, fieldValidator]) => {
        Object.entries(fieldValidator).some(([key, validator]) => {
            isderty = !validator.validate(values[name], values);
            return isderty;
        })
        return isderty;
    })
    return isderty;
};

export const checkDoneForm = (inputs: any[]) => {
    return inputs.filter((item: any) => !item.hide).every(item => item.done)
}

export const checkDoneFormGrup = (inputs: any[]) => {
    return inputs.filter((item: any) => !item.hide).every(item => item.done)
}

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const decoded = jwtDecode(token);
        return { token, decoded };
    } catch (error) {
        console.error('Error obteniendo token:', error);
        return null;
    }
}
 export const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
export default getFormStateErrors


