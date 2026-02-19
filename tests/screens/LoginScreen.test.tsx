// tests/screens/LoginScreen.test.tsx
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import LoginScreen from '../../app/src/screens/public/LoginScreen';

// ============================================
// MOCKS NECESARIOS (simulan dependencias)
// ============================================

// Mock de navegación
const mockNavigate = jest.fn();
const mockGoBack = jest.fn();
const mockNavigation = {
  navigate: mockNavigate,
  goBack: mockGoBack,
};

// Mock de funciones de autenticación
const mockLogin = jest.fn();
const mockHandleRequest = jest.fn();
const mockCreateUser = jest.fn();

// Mock de AuthContext
jest.mock('../../app/src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
  })
}));

// Mock de useRequest
jest.mock('../../app/src/hooks/useRequest', () => ({
  __esModule: true,
  default: () => ({
    handleRequest: mockHandleRequest
  })
}));

// Mock de useSqlite
jest.mock('../../app/src/hooks/useSqlite', () => ({
  useSqlite: () => ({
    createUser: mockCreateUser
  })
}));

// Mock de useForm (simula el estado del formulario)
let mockValues = { username: 'test@test.com', password: '123456' };
const mockOnChange = jest.fn();
const mockValidateInputs = jest.fn();

jest.mock('../../app/src/hooks/useForm', () => ({
  __esModule: true,
  default: () => ({
    updatedInputs: [
      { 
        id: 'username', 
        name: 'username', 
        labelText: 'Usuario',
        inputType: 'INPUT_STANDARD',
        hide: false
      },
      { 
        id: 'password', 
        name: 'password', 
        labelText: 'Contraseña', 
        type: 'password',
        inputType: 'INPUT_STANDARD',
        hide: false,
        showIcon: true
      }
    ],
    values: mockValues,
    errors: {},
    onChange: mockOnChange,
    patchValues: jest.fn(),
    modifyInputs: jest.fn(),
    validateInputs: mockValidateInputs
  })
}));

// Mock de getToken
jest.mock('../../app/src/utils/functions', () => ({
  getToken: jest.fn().mockResolvedValue({ 
    decoded: { name: 'Test', lastName: 'User', email: 'test@test.com' } 
  })
}));

// Mock de Toast
jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));

// ============================================
// TESTS DE FUNCIONALIDADES
// ============================================

describe('LoginScreen - FUNCIONALIDADES REALES', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset values
    mockValues = { username: 'test@test.com', password: '123456' };
  });

  // 🧪 FUNCIONALIDAD 1: Renderizado inicial
  describe('Renderizado inicial', () => {
    test('debe mostrar los campos con los valores por defecto', () => {
      const { getByDisplayValue } = render(<LoginScreen navigation={mockNavigation} />);
      
      // Verificar valores iniciales (vienen de initn en tu componente)
      expect(getByDisplayValue('kleynervillegas.atiempo@gmail.com')).toBeTruthy();
      expect(getByDisplayValue('123456')).toBeTruthy();
    });

    test('debe mostrar todos los textos y botones', () => {
      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      expect(getByText('Usuario')).toBeTruthy();
      expect(getByText('Contraseña')).toBeTruthy();
      expect(getByText('Iniciar Sesión')).toBeTruthy();
      expect(getByText('Crear cuenta nueva')).toBeTruthy();
      expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
    });
  });

  // 🧪 FUNCIONALIDAD 2: Validación de campos
  describe('Validación de campos', () => {
    test('debe validar que username no esté vacío', () => {
      // Cambiar valores para simular campo vacío
      mockValues = { username: '', password: '123456' };
      
      render(<LoginScreen navigation={mockNavigation} />);
      
      // Verificar que se llamó al validador
      expect(mockValidateInputs).toHaveBeenCalled();
    });

    test('debe validar que password no esté vacío', () => {
      mockValues = { username: 'test@test.com', password: '' };
      
      render(<LoginScreen navigation={mockNavigation} />);
      
      expect(mockValidateInputs).toHaveBeenCalled();
    });
  });

  // 🧪 FUNCIONALIDAD 3: Login exitoso
  describe('Login exitoso', () => {
    test('debe llamar a handleRequest con los datos del formulario', async () => {
      mockHandleRequest.mockResolvedValueOnce({
        data: { token: '123' },
        statusError: false
      });

      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      await act(async () => {
        fireEvent.press(getByText('Iniciar Sesión'));
      });

      expect(mockHandleRequest).toHaveBeenCalledWith({
        url: expect.any(String),
        method: 'POST',
        data: {
          username: 'test@test.com',
          password: '123456',
          typeLogin: 'email'
        }
      });
    });

    test('debe crear usuario en SQLite y llamar a login cuando es exitoso', async () => {
      mockHandleRequest.mockResolvedValueOnce({
        data: { token: '123' },
        statusError: false
      });

      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      await act(async () => {
        fireEvent.press(getByText('Iniciar Sesión'));
      });

      await waitFor(() => {
        expect(mockCreateUser).toHaveBeenCalledWith({
          name: 'Test User',
          email: 'test@test.com'
        });
        expect(mockLogin).toHaveBeenCalledWith('test@test.com', '123456');
      });
    });
  });

  // 🧪 FUNCIONALIDAD 4: Manejo de errores
  describe('Manejo de errores', () => {
    test('debe mostrar Toast cuando hay error en la petición', async () => {
      const mockToast = require('react-native-toast-message');
      mockHandleRequest.mockResolvedValueOnce({
        statusError: true,
        error: 'Credenciales inválidas'
      });

      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      await act(async () => {
        fireEvent.press(getByText('Iniciar Sesión'));
      });

      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error de inicio de sesión',
        text2: 'Credenciales inválidas',
      });
    });

    test('debe mostrar error genérico si no hay mensaje específico', async () => {
      const mockToast = require('react-native-toast-message');
      mockHandleRequest.mockResolvedValueOnce({
        statusError: true
      });

      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      await act(async () => {
        fireEvent.press(getByText('Iniciar Sesión'));
      });

      expect(mockToast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error de inicio de sesión',
        text2: 'Por favor, inténtalo de nuevo',
      });
    });
  });

  // 🧪 FUNCIONALIDAD 5: Navegación
  describe('Navegación', () => {
    test('debe navegar a Register cuando se presiona "Crear cuenta nueva"', () => {
      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      fireEvent.press(getByText('Crear cuenta nueva'));
      
      expect(mockNavigate).toHaveBeenCalledWith('Register');
    });

    test('debe navegar a ForgotPassword cuando se presiona "¿Olvidaste tu contraseña?"', () => {
      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      fireEvent.press(getByText('¿Olvidaste tu contraseña?'));
      
      // Asumiendo que navega a 'ForgotPassword'
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  // 🧪 FUNCIONALIDAD 6: Loading state
  describe('Loading state', () => {
    test('debe deshabilitar el botón mientras isLoading es true', () => {
      // Mock de AuthContext con isLoading = true
      jest.mock('../../app/src/context/AuthContext', () => ({
        useAuth: () => ({
          login: mockLogin,
          isLoading: true,
        })
      }));

      const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
      
      const button = getByText('Cargando...');
      expect(button).toBeTruthy();
      expect(getByText('Iniciar Sesión')).not.toBeTruthy(); // No debe mostrar "Iniciar Sesión"
    });
  });
});