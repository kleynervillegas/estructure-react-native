import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AuthContextType, User } from '../types/contexttypes';

// Crear el contexto con valores por defecto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Función para iniciar sesión
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Aquí iría tu lógica de autenticación real
      console.log('Iniciando sesión con:', email, password);
      
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuario de ejemplo
      const mockUser: User = {
        id: '1',
        name: 'Usuario Demo',
        email: email,
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para registrar usuario
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Aquí iría tu lógica de registro real
      console.log('Registrando usuario:', name, email, password);
      
      // Simulación de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Usuario de ejemplo
      const mockUser: User = {
        id: '2',
        name: name,
        email: email,
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
