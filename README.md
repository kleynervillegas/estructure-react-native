# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools

source $HOME/.zshrc
source $HOME/.bashrc

yarn jest tests/screens/LoginScreen.test.tsx
npx jest --clearCache   

# Modo watch - ideal para TDD (se actualiza al guardar)
yarn jest tests/screens/LoginScreen.test.tsx --watch

# Ver cobertura de código
yarn jest tests/screens/LoginScreen.test.tsx --coverage

# Ejecutar un test específico
yarn jest tests/screens/LoginScreen.test.tsx -t "renderizar"

# Tests de todos los screens
yarn jest tests/screens



Negro Profundo	#0D1117	Fondos de pantalla, barras de navegación.
Cian Eléctrico	#00F2FF	Botones de acción (Call to Action), estados activos.
Azul Medianoche	#1A232E	Tarjetas (cards), campos de texto.
Rojo Acento	#FF3B30	Detalles en el logo, errores o alertas críticas.
Blanco Puro	#FFFFFF	Textos principales sobre fondos oscuros.
Gris Técnico	#8E8E93	Textos secundarios o iconos desactivados.

Elemento,Color,Código Hex,Uso sugerido
Primario (Cian),Cian Neón, #00F2FF,"Bordes de botones, iconos activos y textos de enlaces."
Fondo Botón,Verde Oscuro,#0D2626,Fondo del botón principal (con el borde cian).
Texto/Iconos,Blanco Puro,#FFFFFF,Texto dentro de botones y títulos principales.
Campos de Texto,Blanco Azulado,#F0F8FF,Fondo de los inputs (Usuario/Contraseña) para que resalten.
Acento/Check,Turquesa,#20E8D5,Checks de validación o detalles pequeños.