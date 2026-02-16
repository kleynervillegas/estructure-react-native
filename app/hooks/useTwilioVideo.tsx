// app/hooks/useTwilioVideo.ts
import { useCallback, useEffect, useRef, useState } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

export interface RoomState {
  status: 'disconnected' | 'connecting' | 'connected' | 'reconnecting';
  roomName?: string;
  participants: any[];
  error?: string;
}

export interface TwilioConfig {
  accessToken: string;
  roomName: string;
}

const useTwilioVideo = () => {
  const [roomState, setRoomState] = useState<RoomState>({
    status: 'disconnected',
    participants: [],
  });

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [isReady, setIsReady] = useState(false);

  const twilioVideoRef = useRef<any>(null);
  const listenersSetup = useRef(false);

  // Función para marcar como listo - EXPORTADA
  const setVideoRefReady = useCallback((ready: boolean) => {
    console.log('🔄 Marcando como ready:', ready);
    setIsReady(ready);
  }, []);

  // Configurar listeners automáticamente cuando el ref esté disponible
  useEffect(() => {
    if (twilioVideoRef.current && !listenersSetup.current) {
      console.log('🎬 Ref disponible, configurando listeners...');
      setupEventListeners();
      listenersSetup.current = true;
      setVideoRefReady(true);
    }
  }, [twilioVideoRef.current]);

  const setupEventListeners = useCallback(() => {
    if (!twilioVideoRef.current) {
      console.warn('⚠️ No hay ref para configurar listeners');
      return false;
    }

    console.log('🎧 Configurando listeners...');

    // Listener BÁSICOS para debug
    twilioVideoRef.current.on('cameraDidStart', () => {
      console.log('📷 Cámara iniciada');
      setVideoRefReady(true);
    });

    twilioVideoRef.current.on('roomDidConnect', (data: any) => {
      console.log('✅ Conectado a sala:', data);
      setRoomState(prev => ({
        ...prev,
        status: 'connected',
        roomName: data.roomName,
      }));
    });

    twilioVideoRef.current.on('roomDidDisconnect', () => {
      console.log('🔌 Desconectado');
      setRoomState({
        status: 'disconnected',
        participants: [],
      });
    });

    twilioVideoRef.current.on('roomDidFailToConnect', (error: any) => {
      console.error('❌ Error conectando:', error);
      setRoomState(prev => ({
        ...prev,
        status: 'disconnected',
        error: error.message,
      }));
    });

    return true;
  }, [setVideoRefReady]);

  const requestPermissions = useCallback(async (): Promise<boolean> => {
    try {
      if (Platform.OS === 'android') {
        const results = await Promise.all([
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA),
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO),
        ]);
        
        const granted = results.every(
          result => result === PermissionsAndroid.RESULTS.GRANTED
        );
        
        console.log('📋 Permisos:', granted ? '✅' : '❌');
        return granted;
      }
      return true; // iOS
    } catch (error) {
      console.error('❌ Error permisos:', error);
      return false;
    }
  }, []);

const connectToRoom = useCallback(async (config: TwilioConfig): Promise<boolean> => {
  try {
    console.log('🚀 Conectando...', {
      hasToken: !!config.accessToken,
      isReady,
      hasRef: !!twilioVideoRef.current,
    });

    // 1. Verificar permisos
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) {
      Alert.alert('Error', 'Permisos de cámara/micrófono requeridos');
      return false;
    }

    // 2. Verificar token
    if (!config.accessToken) {
      Alert.alert('Error', 'Token requerido');
      return false;
    }

    // 3. Verificar que el componente esté listo
    if (!twilioVideoRef.current) {
      Alert.alert('Error', 'Componente de video no listo');
      return false;
    }

    // 4. Actualizar estado
    setRoomState({
      status: 'connecting',
      participants: [],
      roomName: config.roomName,
    });

    console.log('📡 Llamando a connect()...');

    // 5. CONECTAR con booleanos EXPLÍCITOS
    const connectOptions = {
      roomName: config.roomName,
      accessToken: config.accessToken,
      enableAudio: true, // BOOLEANO explícito
      enableVideo: true, // BOOLEANO explícito
      audioOnly: false,  // BOOLEANO explícito
    };

    console.log('🔧 Opciones de conexión:', connectOptions);

    // Llamar al método connect
    twilioVideoRef.current.connect(connectOptions);

    console.log('🔄 Connect() llamado exitosamente');
    return true;

  } catch (error) {
    console.error('❌ Error en connectToRoom:', error);
    
    // Error específico para iOS
    if (error.message.includes('Objective C type BOOL') || error.message.includes('TWVideoModule.connect')) {
      Alert.alert(
        'Error iOS',
        'Problema con tipos de datos. Revisa que todos los booleanos sean true/false explícitos.'
      );
    }
    
    setRoomState(prev => ({
      ...prev,
      status: 'disconnected',
      error: error.message,
    }));
    return false;
  }
}, [isReady, requestPermissions]);

  const disconnectFromRoom = useCallback(() => {
    console.log('🔌 Desconectando...');
    if (twilioVideoRef.current) {
      twilioVideoRef.current.disconnect();
    }
    setRoomState({
      status: 'disconnected',
      participants: [],
    });
  }, []);

  const toggleAudio = useCallback(() => {
    if (twilioVideoRef.current) {
      const newState = !audioEnabled;
      twilioVideoRef.current.setLocalAudioEnabled(newState);
      setAudioEnabled(newState);
    }
  }, [audioEnabled]);

  const toggleVideo = useCallback(() => {
    if (twilioVideoRef.current) {
      const newState = !videoEnabled;
      twilioVideoRef.current.setLocalVideoEnabled(newState);
      setVideoEnabled(newState);
    }
  }, [videoEnabled]);

  // Debug: log cuando cambie el ref
  useEffect(() => {
    console.log('🔍 Ref cambió:', {
      hasRef: !!twilioVideoRef.current,
      isReady,
      refType: typeof twilioVideoRef.current
    });
  }, [twilioVideoRef.current, isReady]);

  return {
    // Estado
    roomState,
    audioEnabled,
    videoEnabled,
    isReady,
    
    // Ref - PELIGRO: esto no funciona bien pasar refs entre componentes
    twilioVideoRef,
    setVideoRefReady,
    
    // Métodos
    connectToRoom,
    disconnectFromRoom,
    toggleAudio,
    toggleVideo,
    requestPermissions,
  };
};

export default useTwilioVideo;