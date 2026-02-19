// tests/screens/LoginScreen.test.tsx
import LoginScreen from '@/app/src/screens/public/LoginScreen';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';

// Mocks
const mockNavigate = jest.fn();
const mockLogin = jest.fn();
const mockHandleRequest = jest.fn();
const mockCreateUser = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
  goBack: jest.fn(),
};

// Mock de endpoints
jest.mock('@/app/const/endpoints', () => ({
  login: '/api/login',
  register: '/api/register'
}));

// Mock de AuthContext
jest.mock('@/app/src/context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
    isLoading: false,
  })
}));

// Mock de useRequest
jest.mock('@/app/src/hooks/useRequest', () => ({
  __esModule: true,
  default: () => ({
    handleRequest: mockHandleRequest
  })
}));

// Mock de useSqlite
jest.mock('@/app/src/hooks/useSqlite', () => ({
  useSqlite: () => ({
    createUser: mockCreateUser
  })
}));

// Mock de useForm
jest.mock('@/app/src/hooks/useForm', () => ({
  __esModule: true,
  default: () => ({
    updatedInputs: [
      { id: 'username', name: 'username', labelText: 'Usuario' },
      { id: 'password', name: 'password', labelText: 'Contraseña', type: 'password' }
    ],
    values: { username: 'test@test.com', password: '123456' },
    errors: {},
    onChange: jest.fn(),
  })
}));

// Mock de funciones - ¡CORREGIDO!
jest.mock('@/app/src/utils/functions', () => ({
  getToken: jest.fn().mockResolvedValue({ 
    token: 'fake-token',
    decoded: { name: 'Test', lastName: 'User', email: 'test@test.com' } 
  })
}));

// Mock del componente Form
jest.mock('@/app/src/components/Form/Form', () => {
  return function MockForm(props: any) {
    return null; // Simplificamos el mock
  };
});

describe('LoginScreen - Funcionalidades Básicas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // TEST 1: ¿La pantalla se renderiza?
  test('debe renderizar sin errores', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
    
    // Verificamos elementos que SÍ están como texto directo
    expect(getByText('Iniciar Sesión')).toBeTruthy();
    expect(getByText('Crear cuenta nueva')).toBeTruthy();
    expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
  });

  // TEST 2: ¿El link a registro funciona?
  test('debe navegar a Register al hacer click en "Crear cuenta nueva"', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
    
    const registerLink = getByText('Crear cuenta nueva');
    fireEvent.press(registerLink);
    
    expect(mockNavigate).toHaveBeenCalledWith('Register');
  });

  // TEST 3: ¿El botón de login funciona?
  test('debe llamar a handleRequest al presionar Iniciar Sesión', async () => {
    mockHandleRequest.mockResolvedValueOnce({
      data: { token: '123' },
      statusError: false
    });

    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
    
    const loginButton = getByText('Iniciar Sesión');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockHandleRequest).toHaveBeenCalled();
    });
  });

  // TEST 4: ¿El link de olvidé contraseña existe?
  test('debe mostrar link de "¿Olvidaste tu contraseña?"', () => {
    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);
    
    expect(getByText('¿Olvidaste tu contraseña?')).toBeTruthy();
  });
});