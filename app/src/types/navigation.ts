import { NavigatorScreenParams } from '@react-navigation/native';

// Tipos para las rutas públicas
export type PublicStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Tipos para las rutas privadas
export type PrivateTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Tipo para el navegador raíz
export type RootStackParamList = {
  Public: NavigatorScreenParams<PublicStackParamList>;
  Private: NavigatorScreenParams<PrivateTabParamList>;
};

export type Routes = {
  path: string;
  name: string;
  icon: string;
  iconTab?: string;
  private: boolean;
  tabs?:boolean;
  component: React.ComponentType<any>;
  options: object;
};


export type PrivateStackParamList = {
    back: undefined;
    profile: undefined;
    settings: undefined;
    help: undefined;
    // Agrega aquí otras rutas privadas que no están en tabs
}

const DummyComponent = () => null;
export default DummyComponent;