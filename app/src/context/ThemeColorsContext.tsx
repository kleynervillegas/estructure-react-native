import React, { createContext, ReactNode, useContext, useState } from 'react';
type ThemeType = 'light' | 'dark';

// Crear el contexto con valores por defecto
const ThemeColorsContext = createContext<any | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useThemeColors = () => {
  const context = useContext(ThemeColorsContext);

  if (!context) {
    throw new Error('useThemeColors debe usarse dentro de un ThemeColorsProvider');
  }
  return context;
};

interface ThemeColorsProviderProps {
  children: ReactNode;
}

const ThemeColorsProvider: React.FC<ThemeColorsProviderProps> = ({ children }) => {

  const [theme, setTheme] = useState<ThemeType>('light');


  const changeTheme = async (theme: ThemeType) => {
    try {  
      setTheme(prev => prev === 'light' ? 'dark' : 'light');
    } catch (error) {
      console.error('Error al cambiar tema:', error);
      throw error;
    } finally {
      // Aquí podrías manejar cualquier estado de carga si es necesario
    }
  }; 


  return (
    <ThemeColorsContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeColorsContext.Provider>
  );
};

export default ThemeColorsProvider;
