import endpoints from '@/app/const/endpoints';
import Form from '@/app/src/components/Form/Form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import ic from '../../../../assets/images/imgback.png';
import { useAuth } from '../../context/AuthContext';
import useForm from '../../hooks/useForm';
import useRequest from '../../hooks/useRequest';
import { useSqlite } from '../../hooks/useSqlite';
import { PublicStackParamList } from '../../types/navigation';
import { getToken } from '../../utils/functions';

type Props = NativeStackScreenProps<PublicStackParamList, 'Login'>;

const validators: any = {
  'username': {
    require: {
      validate: (value: any) => {
        return (value != "")
      },
      message: "Campo requerido"
    }
  },
  'password': {
    require: {
      validate: (value: any) => {
        return (value != "")
      },
      message: "Campo requerido"
    }
  }
}

const inputLogin = [
  {
    inputType: "INPUT_STANDARD",
    labelText: "Usuario",
    hide: false,
    id: "username",
    name: "username",
    className: "ion-text-uppercase",
  },
  {
    inputType: "INPUT_STANDARD",
    labelText: "Contraseña",
    hide: false,
    id: "password",
    name: "password",
    type: "password",
    showIcon: true
  }
];

const LoginScreen: React.FC<Props> = ({ navigation }) => {

  const { login, isLoading } = useAuth();

  const { handleRequest } = useRequest();

  const { createUser } = useSqlite()

  let initn = {
    "username": "kleynervillegas.atiempo@gmail.com",
    "password": "123456",
  };

  const {
    updatedInputs,
    values,
    errors,
    onChange,
    patchValues,
    modifyInputs,
    validateInputs
  } = useForm(inputLogin, initn, validators);

  const handleChange = (e) => {
    onChange(e);
  };


  const handleLogin = async () => {
    const response = await handleRequest({
      url: endpoints.login,
      method: 'POST',
      data: {
        "username": values.username,
        "password": values.password,
        "typeLogin": "email"
      }
    });

    if (response.statusError || !response.data) {
      Toast.show({
        type: 'error',
        text1: 'Error de inicio de sesión',
        text2: response.error || 'Por favor, inténtalo de nuevo',
      });
      return;
    } else {
      const user: any = ((await getToken()).decoded);
      await createUser({ name: `${user.name} ${user.lastName}`, email: user.email });
      await login(values.username, values.password);
    }

  };

  return (
    <ImageBackground
      source={ic}
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <Toast />
        <View style={styles.content}>

          <Form
            inputs={updatedInputs}
            onChange={handleChange}
            values={values}
            errors={errors}
          />


          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
            </Text>
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Crear cuenta nueva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { /* Lógica para recuperar contraseña */ }}>
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    marginTop: 120, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#0D2626', 
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#00F2FF', // Borde Cian Neón
    // Efecto Glow para iOS
    shadowColor: '#00F2FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    // Efecto Glow para Android
    elevation: 10,
  },
  buttonDisabled: {
    backgroundColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
  },
  demoButton: {
    backgroundColor: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  linksContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  link: {
    color: '#00F2FF',
    marginVertical: 8,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'none',
  },
  icStyle: {
    width: 250,
    height: 250,
  },
  contentIcStyle: {
    alignSelf: "center",
  }
});
export default LoginScreen;

