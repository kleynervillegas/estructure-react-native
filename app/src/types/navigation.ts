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
  component: React.ComponentType<any>;
  options: object;
};